package emit.lab.service;

import emit.lab.models.Author;
import emit.lab.models.Book;
import emit.lab.models.BookPrint;
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

    public Book findBook(Long id) throws NotFound {
        return this.bookRepository.findById(id)
                .orElseThrow(() -> new NotFound(String.format("Book with id: %d not found!", id)));

    }

    public List<BookPrint> listBookPrintsByBook(Book book) {
        return this.bookPrintRepository.findByBook(book);
    }

    public List<Book> searchBooksByName(String name) {
        name = "%" + name + "%";
        return this.bookRepository.findAllByNameLike(name);
    }

    public List<Book> searchBooks(String name, Author author, CategoryType categoryType) {
        name = "%" + name + "%";
        return this.bookRepository.findAllByNameLikeAndAuthorAndCategory(name, author, categoryType);
    }

//- Да додава нови книги кои може да се изнајмат
//- Да брише книги кои повеќе не се во добра состојба и нема да се изнајмуваат
//- Да изменува одреден запис за книга
//- Да обележи одредена книга како изнајмена

    @Transactional
    public Book save(String name, Long author_id, CategoryType categoryType, Integer availableCopies)
            throws IllegalArgumentException, NotFound {

        this.checkParameter(name, author_id, availableCopies);
        Author author = this.authorService.findAuthorById(author_id);
        this.checkBookExistence(name, author, categoryType);

        Book book = new Book(name, categoryType, author, availableCopies);
        book = this.bookRepository.save(book);

        this.addBookPrintForBook(book, availableCopies);
        return book;
    }

    @Transactional
    public Book addNewCopiesForBook(Long book_id, Integer n)
            throws IllegalArgumentException, NotFound, CanNotCompleteActionException {

        Book book = this.findBook(book_id);
        this.addBookPrintForBook(book, n);
        this.setAvailableCopies(book, n);

        return this.bookRepository.save(book);
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
