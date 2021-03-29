package emit.lab.repository;

import emit.lab.models.Author;
import emit.lab.models.Book;
import emit.lab.models.enumerations.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByName(String name);

    List<Book> findAllByNameLikeOrderById(String text);

    List<Book> findAllByNameLikeAndAuthorAndCategoryOrderById(String name, Author author, CategoryType categoryType);

}
