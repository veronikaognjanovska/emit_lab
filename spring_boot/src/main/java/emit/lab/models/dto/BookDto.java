package emit.lab.models.dto;

import emit.lab.models.enumerations.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    private String name;

    @Enumerated(EnumType.STRING)
    private CategoryType category;

    private Long author;

    private Integer availableCopies;

}
