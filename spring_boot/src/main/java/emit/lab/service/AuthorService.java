package emit.lab.service;

import emit.lab.models.Author;
import emit.lab.models.exceptions.NotFound;
import emit.lab.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public List<Author> listAuthors() {
        return this.authorRepository.findAll();
    }

    public Author findAuthorById(Long id) throws NotFound {
        return this.authorRepository.findById(id)
                .orElseThrow(() -> new NotFound(String.format("Author with id: %d not found!",id)));
    }

    public List<Author> searchAuthorsByNameAndSurname(String name, String surname) {
        name = "%" + name + "%";
        surname = "%" + surname + "%";
        return this.authorRepository.findAllByNameLikeAndSurnameLike(name, surname);
    }

    public List<Author> searchAuthors(String searchText) {
        searchText = "%" + searchText + "%";
        return this.authorRepository.findAllByNameLikeOrSurnameLike(searchText, searchText);
    }
}
