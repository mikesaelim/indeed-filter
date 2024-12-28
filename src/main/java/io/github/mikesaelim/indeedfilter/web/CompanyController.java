package io.github.mikesaelim.indeedfilter.web;

import io.github.mikesaelim.indeedfilter.persistence.Company;
import io.github.mikesaelim.indeedfilter.persistence.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class CompanyController {

    @Autowired
    CompanyRepository companyRepository;

    /**
     * Return all the saved companies, sorted by name
     */
    @GetMapping("/api/companies")
    ResponseEntity<List<Company>> listCompanies() {
        return ResponseEntity.ok(companyRepository.findAll(Sort.by("name")));
    }

    /**
     * Save a record for a company
     */
    @PostMapping("/api/companies")
    ResponseEntity<Company> createCompany(@RequestBody Company company) {
        if (company.getId() != null || company.getName() == null || company.getName().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(companyRepository.save(company));
        } catch (DataIntegrityViolationException e) {
            // This probably means there is already has a record with the same company name
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    /**
     * Update a record for a company
     */
    @PatchMapping("/api/companies/{id}")
    ResponseEntity<Company> updateCompany(@PathVariable Integer id, @RequestBody CompanyPatch companyPatch) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (companyPatch.getNotes() != null) {
            company.setNotes(companyPatch.getNotes());
        }
        if (companyPatch.getHidden() != null) {
            company.setHidden(companyPatch.getHidden());
        }
        return ResponseEntity.ok(companyRepository.save(company));
    }

    /**
     * Delete a record for a company.  Idempotent.
     */
    @DeleteMapping("/api/companies/{id}")
    ResponseEntity<Void> deleteCompany(@PathVariable Integer id) {
        companyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
