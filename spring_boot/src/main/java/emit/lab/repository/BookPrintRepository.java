package emit.lab.repository;

import emit.lab.models.Book;
import emit.lab.models.BookPrint;
import emit.lab.models.enumerations.BookPrintStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookPrintRepository extends JpaRepository<BookPrint, Long> {
    List<BookPrint> findByBookOrderById(Book book);

    List<BookPrint> findBookPrintsByBookAndStatusOrderById(Book book, BookPrintStatus status);
}