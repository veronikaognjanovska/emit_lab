package emit.lab.repository;

import emit.lab.models.Author;
import emit.lab.models.Book;
import emit.lab.models.enumerations.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAllByNameLike(String text);

    List<Book> findAllByNameLikeAndAuthorAndCategory(String name, Author author, CategoryType categoryType);

}
