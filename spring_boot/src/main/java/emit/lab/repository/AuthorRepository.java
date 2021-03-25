package emit.lab.repository;

import emit.lab.models.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AuthorRepository extends JpaRepository<Author, Long> {
    List<Author> findAllByNameLikeAnAndSurnameLike(String name, String surname);
}
