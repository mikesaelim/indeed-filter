package io.github.mikesaelim.indeedfilter.web;

import io.github.mikesaelim.indeedfilter.persistence.HiddenCompany;
import io.github.mikesaelim.indeedfilter.persistence.HiddenCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
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
    ResponseEntity<List<HiddenCompany>> listCompanies() {
        return ResponseEntity.ok(hiddenCompanyRepository.findAll(Sort.by("name")));
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
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(hiddenCompanyRepository.save(company));
        } catch (DataIntegrityViolationException e) {
            // This probably means the company is already hidden
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(hiddenCompanyRepository.findByName(company.getName()));
        }
    }

    /**
     * Delete a record for hiding a company.  Idempotent.
     */
    @DeleteMapping("/api/hidden-companies/{id}")
    ResponseEntity<Void> unhideCompany(@PathVariable Integer id) {
        hiddenCompanyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
