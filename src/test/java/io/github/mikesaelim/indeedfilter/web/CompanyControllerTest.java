package io.github.mikesaelim.indeedfilter.web;

import io.github.mikesaelim.indeedfilter.persistence.Company;
import io.github.mikesaelim.indeedfilter.persistence.CompanyRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CompanyController.class)
class CompanyControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    CompanyRepository companyRepository;

    @Test
    void testListCompanies() throws Exception {
        when(companyRepository.findAll(any(Sort.class))).thenReturn(
                List.of(new Company(5, "Palantir", "disgusting", true),
                        new Company(8, "Jersey Mike's", "good sandwiches", false))
        );

        mockMvc.perform(get("/api/companies")).andExpectAll(
                status().isOk(),
                jsonPath("length($)").value(2),
                jsonPath("$[0].id").value(5),
                jsonPath("$[0].name").value("Palantir"),
                jsonPath("$[0].notes").value("disgusting"),
                jsonPath("$[0].hidden").value(true),
                jsonPath("$[1].id").value(8),
                jsonPath("$[1].name").value("Jersey Mike's"),
                jsonPath("$[1].notes").value("good sandwiches"),
                jsonPath("$[1].hidden").value(false)
        );
    }

    @Test
    void testCreateCompany() throws Exception {
        when(companyRepository.save(eq(new Company(null, "Citadel", "gross", true))))
                .thenReturn(new Company(14, "Citadel", "gross", true));

        mockMvc.perform(
                post("/api/companies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":  \"Citadel\", \"notes\": \"gross\", \"hidden\": true}")
        ).andExpectAll(
                status().isCreated(),
                jsonPath("$.id").value(14),
                jsonPath("$.name").value("Citadel"),
                jsonPath("$.notes").value("gross"),
                jsonPath("$.hidden").value(true)
        );
    }

    @Test
    void testCreateCompanyWithIdReturns400() throws Exception {
        mockMvc.perform(
                post("/api/companies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\": 14, \"name\": \"Citadel\"}")
        ).andExpect(status().isBadRequest());
        verifyNoInteractions(companyRepository);
    }

    @Test
    void testCreateCompanyWithoutNameReturns400() throws Exception {
        mockMvc.perform(
                post("/api/companies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"hidden\": false}")
        ).andExpect(status().isBadRequest());
        mockMvc.perform(
                post("/api/companies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"\", \"hidden,\": false}")
        ).andExpect(status().isBadRequest());
        verifyNoInteractions(companyRepository);
    }

    @Test
    void testCreateCompanyDuplicateReturns409() throws Exception {
        when(companyRepository.save(eq(new Company(null, "Oracle", null, true))))
                .thenThrow(new DataIntegrityViolationException("oh no"));

        mockMvc.perform(
                post("/api/companies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Oracle\", \"hidden\": true}")
        ).andExpect(status().isConflict());
    }

    @Test
    void testUpdateCompany() throws Exception {
        when(companyRepository.findById(6)).thenReturn(Optional.of(new Company(6, "Oracle", null, false)));
        Company updatedCompany = new Company(6, "Oracle", "ew", true);
        when(companyRepository.save(eq(updatedCompany))).thenReturn(updatedCompany);

        mockMvc.perform(
                patch("/api/companies/6")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"notes\": \"ew\", \"hidden\": true}")
        ).andExpectAll(
                status().isOk(),
                jsonPath("$.id").value(6),
                jsonPath("$.name").value("Oracle"),
                jsonPath("$.notes").value("ew"),
                jsonPath("$.hidden").value(true)
        );
    }

    @Test
    void testUpdateCompanyNotFound() throws Exception {
        when(companyRepository.findById(6)).thenReturn(Optional.empty());

        mockMvc.perform(
                patch("/api/companies/6")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"notes\": \"ew\", \"hidden\": true}")
        ).andExpect(status().isNotFound());
    }

    @Test
    void testDeleteCompany() throws Exception {
        mockMvc.perform(delete("/api/companies/7")).andExpect(status().isNoContent());
        verify(companyRepository).deleteById(7);
    }

}
