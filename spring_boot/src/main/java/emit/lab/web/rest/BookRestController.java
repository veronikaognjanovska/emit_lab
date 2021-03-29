package emit.lab.web.rest;

import emit.lab.models.Book;
import emit.lab.models.BookPrint;
import emit.lab.models.dto.BookDto;
import emit.lab.models.enumerations.CategoryType;
import emit.lab.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

//        Book b1 = this.bookService.editBook(2l,new BookDto("ppp", CategoryType.THRILER,2l,6));
//        System.out.println(b1);
//        this.bookService.deleteBookPrint(1l);
//        System.out.println("deleted");
//        BookPrint bp1 = this.bookService.markBookPrintAsTaken(1l);
//        BookPrint bp2 = this.bookService.markBookPrintAsTaken(1l);
//        BookPrint bp3 = this.bookService.markBookPrintAsTaken(1l);
//        System.out.println(bp1);
//        System.out.println(bp2);
//        System.out.println(bp3);

        return this.bookService.listBooks();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Book> findBook(@PathVariable Long id) {
        System.out.println("-----------------------findBook-------------------------");

        return this.bookService.findBook(id)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Book> saveBook(@RequestBody BookDto bookDto) {
        System.out.println("-----------------------saveBook-------------------------");
        return this.bookService.save(bookDto)
                .map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Book> editBook(@PathVariable Long id, @RequestBody BookDto productDto) {
        System.out.println("-----------------------editBook-------------------------");

        return this.bookService.editBook(id, productDto)
                .map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteBookPrint(@PathVariable Long id) {
        System.out.println("-----------------------deleteBookPrint-------------------------");
        this.bookService.deleteBookPrint(id);
        if(this.bookService.findBookPrint(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }


}
