package emit.lab.repository;

import emit.lab.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    List<Country> findAllByNameLikeAndContinentLikeOrderById(String name, String continent);

    List<Country> findAllByNameLikeOrContinentLikeOrderById(String name, String continent);
}
