package emit.lab.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
public class BookRestController {


    @GetMapping
    private List<String> findAllBooks() {
        return new LinkedList<String>(Arrays.asList("proba1","proba2","proba3","proba4"));
    }



}
