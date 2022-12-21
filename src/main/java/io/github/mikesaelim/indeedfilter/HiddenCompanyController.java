package io.github.mikesaelim.indeedfilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HiddenCompanyController {

    @Autowired
    HiddenCompanyRepository hiddenCompanyRepository;

    /**
     * Return all the hidden companies, sorted by name
     */
    @GetMapping("/api/hidden-companies")
    List<HiddenCompany> listCompanies() {
        return hiddenCompanyRepository.findAll(Sort.by("name"));
    }

    /**
     * Create a record for hiding a company.  Idempotent.
     */
    @PostMapping("/api/hidden-companies")
    ResponseEntity<HiddenCompany> hideCompany(@RequestBody HiddenCompany company) {
        if (company.getId() != null) {
            return ResponseEntity.badRequest().build();
        }

        try {
            return ResponseEntity.ok(hiddenCompanyRepository.save(company));
        } catch (DataIntegrityViolationException e) {
            // This probably means the company is already hidden
            return ResponseEntity.ok(hiddenCompanyRepository.findByName(company.getName()));
        }
    }

    /**
     * Delete a record for hiding a company.  Idempotent.
     */
    @DeleteMapping("/api/hidden-companies/{id}")
    void unhideCompany(@PathVariable Integer id) {
        hiddenCompanyRepository.deleteById(id);
    }

}
