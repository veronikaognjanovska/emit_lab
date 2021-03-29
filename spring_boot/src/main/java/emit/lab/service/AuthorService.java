package emit.lab.service;

import emit.lab.models.Author;
import emit.lab.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public List<Author> listAuthors() {
        return this.authorRepository.findAll();
    }

    public Optional<Author> findAuthorById(Long id) {
        return this.authorRepository.findById(id);
    }

    public List<Author> searchAuthorsByNameAndSurname(String name, String surname) {
        name = "%" + name + "%";
        surname = "%" + surname + "%";
        return this.authorRepository.findAllByNameLikeAndSurnameLikeOrderById(name, surname);
    }

    public List<Author> searchAuthors(String searchText) {
        searchText = "%" + searchText + "%";
        return this.authorRepository.findAllByNameLikeOrSurnameLikeOrderById(searchText, searchText);
    }
}
