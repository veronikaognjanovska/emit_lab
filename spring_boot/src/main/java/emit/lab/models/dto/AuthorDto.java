package emit.lab.models.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthorDto {

    private String nameA;

    private String surname;

    private Long country;

    public AuthorDto(String nameA, String surname, Long country) {
        this.nameA = nameA;
        this.surname = surname;
        this.country = country;
    }
}
