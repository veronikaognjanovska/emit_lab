package emit.lab.service;

import emit.lab.models.Author;
import emit.lab.models.Book;
import emit.lab.models.BookPrint;
import emit.lab.models.dto.BookDto;
import emit.lab.models.enumerations.BookPrintStatus;
import emit.lab.models.enumerations.CategoryType;
import emit.lab.models.exceptions.AlreadyExistsException;
import emit.lab.models.exceptions.ArgumentsNotAllowedException;
import emit.lab.models.exceptions.CanNotCompleteActionException;
import emit.lab.models.exceptions.NotFound;
import emit.lab.repository.BookPrintRepository;
import emit.lab.repository.BookRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final BookPrintRepository bookPrintRepository;
    private final AuthorService authorService;

    public BookService(BookRepository bookRepository, BookPrintRepository bookPrintRepository, AuthorService authorService) {
        this.bookRepository = bookRepository;
        this.bookPrintRepository = bookPrintRepository;
        this.authorService = authorService;
    }

    public List<Book> listBooks() {
        return this.bookRepository.findAll();
    }

    public Optional<Book> findBook(Long id) throws NotFound {
        return this.bookRepository.findById(id);

    }

    public Optional<BookPrint> findBookPrint(Long id) throws NotFound {
        return this.bookPrintRepository.findById(id);
    }

    public List<BookPrint> listBookPrintsByBook(Long id) {
        Book book = this.findBook(id).orElseThrow(() -> new NotFound(String.format("Book with id: %d not found!", id)));
        return this.bookPrintRepository.findByBookOrderById(book);
    }

    public List<Book> searchBooksByName(String name) {
        name = "%" + name + "%";
        return this.bookRepository.findAllByNameLikeOrderById(name);
    }

    public List<Book> searchBooks(String name, Author author, CategoryType categoryType) {
        name = "%" + name + "%";
        return this.bookRepository.findAllByNameLikeAndAuthorAndCategoryOrderById(name, author, categoryType);
    }

    public Book searchBooksByName(Long id) {
        return this.bookRepository.findById(id).orElseThrow(() -> new NotFound(String.format("Book with id: %d not found!", id)));
    }


    //- Да додава нови книги кои може да се изнајмат
    @Transactional
    public Optional<Book> save(BookDto bookDto)
            throws IllegalArgumentException, NotFound {

        this.checkParameter(bookDto.getName(), bookDto.getAuthor(), bookDto.getAvailableCopies());
        Author author = this.authorService.findAuthorById(bookDto.getAuthor()).orElseThrow(() -> new NotFound(String.format("Author with id: %d not found!", bookDto.getAuthor())));
        this.checkBookExistence(bookDto.getName(), author, bookDto.getCategory());

        Book book = new Book(bookDto.getName(), bookDto.getCategory(), author, bookDto.getAvailableCopies());
        book = this.bookRepository.save(book);

        this.addBookPrintForBook(book, bookDto.getAvailableCopies());
        return Optional.of(book);
    }

    @Transactional
    public Optional<Book> addNewCopiesForBook(Long book_id, Integer n)
            throws IllegalArgumentException, NotFound, CanNotCompleteActionException {

        Book book = this.findBook(book_id).orElseThrow(() -> new NotFound(String.format("Book with id: %d not found!", book_id)));
        this.addBookPrintForBook(book, n);
        this.setAvailableCopies(book, n);

        return Optional.of(this.bookRepository.save(book));
    }

    //- Да брише книги кои повеќе не се во добра состојба и нема да се изнајмуваат
    @Transactional
    public void deleteBookPrint(Long print_id) throws NotFound {
        BookPrint bookPrint = this.findBookPrint(print_id).orElseThrow(() -> new NotFound(String.format("BookPrint with id: %d not found!", print_id)));
        this.bookPrintRepository.delete(bookPrint);
        Book book = this.findBook(bookPrint.getBook().getId()).orElseThrow(() -> new NotFound(String.format("Book with id: %d not found!", bookPrint.getBook().getId())));
        this.setAvailableCopies(book, -1);
    }

    @Transactional
    public void deleteBook(Long id) throws NotFound {
        Book book = this.findBook(id).orElseThrow(() -> new NotFound(String.format("Book with id: %d not found!", id)));
        List<BookPrint> bookPrintList = this.listBookPrintsByBook(id);
        for (BookPrint bookPrint : bookPrintList) {
            this.deleteBookPrint(bookPrint.getId());
        }
        if (book.getAvailableCopies() > 0) {
            throw new CanNotCompleteActionException("Book can not be deleted!");
        }
        this.bookRepository.delete(book);
    }

    //- Да изменува одреден запис за книга
    public Optional<Book> editBook(Long book_id, BookDto bookDto) throws NotFound {
        Book book = this.findBook(book_id).orElseThrow(() -> new NotFound(String.format("Book with id: %d not found!", book_id)));
        book.setName(bookDto.getName());
        book.setCategory(bookDto.getCategory());
        Author author = this.authorService.findAuthorById(bookDto.getAuthor()).orElseThrow(() -> new NotFound(String.format("Author with id: %d not found!", bookDto.getAuthor())));
        book.setAuthor(author);
        // you can not change/edit availableCopies
        return Optional.of(this.bookRepository.save(book));
    }

    //- Да обележи одредена книга како изнајмена
    @Transactional
    public Optional<BookPrint> markBookPrintAsTaken(Long print_id)
            throws IllegalArgumentException, NotFound, CanNotCompleteActionException {

        BookPrint bookPrint = this.bookPrintRepository.findById(print_id).orElseThrow(() -> new NotFound(String.format("BookPrint with id: %d not found!", print_id)));
        bookPrint.setStatus(BookPrintStatus.TAKEN);
        Book book = bookPrint.getBook();
        this.setAvailableCopies(book, -1);
        this.bookRepository.save(book);
        return Optional.of(this.bookPrintRepository.save(bookPrint));
    }

    @Transactional
    public Optional<BookPrint> markBookPrintAsReturned(Long print_id)
            throws IllegalArgumentException, NotFound, CanNotCompleteActionException {

        BookPrint bookPrint = this.bookPrintRepository.findById(print_id).orElseThrow(() -> new NotFound(String.format("BookPrint with id: %d not found!", print_id)));

        bookPrint.setStatus(BookPrintStatus.AVAILABLE);
        Book book = bookPrint.getBook();
        this.setAvailableCopies(book, +1);
        this.bookRepository.save(book);

        return Optional.of(this.bookPrintRepository.save(bookPrint));
    }


    // helper methods

    private void addBookPrintForBook(Book book, Integer n) {
        for (int i = 0; i < n; i++) {
            this.bookPrintRepository.save(new BookPrint(book));
        }
    }

    private void checkParameter(String name, Long author_id, Integer availableCopies) throws IllegalArgumentException {
        if (name == null || name.isEmpty() || availableCopies == null || availableCopies < 0 ||
                author_id == null || author_id < 0) {
            throw new ArgumentsNotAllowedException();
        }
    }

    private void checkBookExistence(String name, Author author, CategoryType categoryType) throws AlreadyExistsException {
        if (this.searchBooks(name, author, categoryType).size() > 0) {
            throw new AlreadyExistsException("Book already exists!");
        }
    }

    private void setAvailableCopies(Book book, Integer n) throws CanNotCompleteActionException {
        Integer newNumber = book.getAvailableCopies() + n;
        if (newNumber < 0) {
            throw new CanNotCompleteActionException("Book available copies number not allowed");
        }
        book.setAvailableCopies(newNumber);
    }

}
