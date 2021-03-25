package emit.lab.repository;

import emit.lab.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CountryRepository extends JpaRepository<Country, Long> {
    List<Country> findAllByNameLikeAnAndContinentLike(String name, String continent);
}
