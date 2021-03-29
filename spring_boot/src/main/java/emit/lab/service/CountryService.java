package emit.lab.service;

import emit.lab.models.Country;
import emit.lab.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    private final CountryRepository countryRepository;

    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    public List<Country> listCountries() {
        return this.countryRepository.findAll();
    }

    public List<Country> searchCountriesByNameAndContinent(String name, String continent) {
        name = "%" + name + "%";
        continent = "%" + continent + "%";
        return this.countryRepository.findAllByNameLikeAndContinentLikeOrderById(name, continent);
    }

    public List<Country> searchCountries(String searchText) {
        searchText = "%" + searchText + "%";
        return this.countryRepository.findAllByNameLikeOrContinentLikeOrderById(searchText, searchText);
    }

}
