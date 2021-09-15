package emit.lab.web.rest;

import emit.lab.models.Author;
import emit.lab.service.AuthorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/authors")
public class AuthorRestController {

    private final AuthorService authorService;

    public AuthorRestController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping
    private List<Author> findAllAuthors() {
        System.out.println("-----------------------findAllAuthors-------------------------");
        return this.authorService.listAuthors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Author> findBook(@PathVariable Long id) {
        System.out.println("-----------------------findAuthor-------------------------");
        return this.authorService.findAuthorById(id)
                .map(author -> ResponseEntity.ok().body(author))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


}
