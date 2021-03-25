package emit.lab.web.rest;

import emit.lab.models.Book;
import emit.lab.models.enumerations.CategoryType;
import emit.lab.service.BookService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
public class BookRestController {

    private final BookService bookService;

    public BookRestController(BookService bookService) {
        this.bookService = bookService;
    }


    @GetMapping
    private List<Book> findAllBooks() {
//        this.bookService.save("book44", 2l, CategoryType.DRAMA, 5);
        return this.bookService.listBooks();
    }


}
