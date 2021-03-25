package emit.lab.repository;

import emit.lab.models.Author;
import emit.lab.models.Book;
import emit.lab.models.enumerations.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAllByNameLike(String text);

    List<Book> findAllByNameLikeAndAndAuthorAndCategory(String text, Author author, CategoryType categoryType);
}
