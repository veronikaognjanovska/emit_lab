package emit.lab.service;

import emit.lab.models.Author;
import emit.lab.models.Book;
import emit.lab.models.BookPrint;
import emit.lab.models.enumerations.CategoryType;
import emit.lab.models.exceptions.AlreadyExistsException;
import emit.lab.models.exceptions.NotFound;
import emit.lab.repository.BookPrintRepository;
import emit.lab.repository.BookRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

//    public void takeACopy(){
//        if(availableCopies==0){
//            throw
//        }
//        --availableCopies;
//    }

    @Transactional
    public Book save(String name, Long author_id, CategoryType categoryType, Integer availableCopies)
            throws IllegalArgumentException, NotFound {

        this.checkParameter(name, author_id, availableCopies);
        Author author = this.authorService.findAuthorById(author_id);
        this.checkBookExistence(name,author,categoryType);

        Book book = new Book(name, categoryType, author, availableCopies);
        book = this.bookRepository.save(book);

        Set<BookPrint> bookPrintSet = new HashSet<BookPrint>();
        BookPrint bookPrint = null;
        for (int i = 0; i < availableCopies; i++) {
            bookPrint = this.bookPrintRepository.save(new BookPrint(book));
            bookPrintSet.add(bookPrint);
        }
        book.setBookPrintList(bookPrintSet);
        return this.bookRepository.save(book);
    }

    private void checkParameter(String name, Long author_id, Integer availableCopies) throws IllegalArgumentException{
        if (name == null || name.isEmpty() || availableCopies == null || availableCopies < 0 ||
                author_id == null || author_id < 0) {
            throw new IllegalArgumentException();
        }
    }

    private void checkBookExistence(String name,  Author author, CategoryType categoryType) throws AlreadyExistsException{
        if (this.searchBooks(name, author, categoryType).size() > 0) {
            throw new AlreadyExistsException(String.format("Book already exists!"));
        }
    }

}
