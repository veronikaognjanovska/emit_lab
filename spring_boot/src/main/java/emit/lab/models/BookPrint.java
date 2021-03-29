package emit.lab.models;

import emit.lab.models.enumerations.BookPrintStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
public class BookPrint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BookPrintStatus status;

    @ManyToOne
    private Book book;

    public BookPrint(Book book) {
        this.book = book;
        this.status = BookPrintStatus.AVAILABLE;
    }
}
