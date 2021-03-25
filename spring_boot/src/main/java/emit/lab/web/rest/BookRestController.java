package emit.lab.web.rest;

import emit.lab.models.enumerations.CategoryType;
import emit.lab.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.LinkedList;
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
    private List<String> findAllBooks() {
        this.bookService.save("book",2l, CategoryType.DRAMA,5);
        System.out.println("PROBA---------------------------");
        System.out.println("PROBA---------------------------");
        System.out.println("PROBA---------------------------");
        System.out.println("PROBA---------------------------");
        System.out.println("PROBA---------------------------");
        System.out.println("PROBA---------------------------");
        return new LinkedList<String>(Arrays.asList("proba1","proba2","proba3","proba4"));
    }



}
