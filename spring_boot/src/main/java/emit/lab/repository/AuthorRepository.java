package emit.lab.repository;

import emit.lab.models.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    List<Author> findAllByNameLikeAndSurnameLikeOrderById(String name, String surname);

    List<Author> findAllByNameLikeOrSurnameLikeOrderById(String name, String surname);
}
