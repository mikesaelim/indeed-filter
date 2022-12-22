package io.github.mikesaelim.indeedfilter.web;

import io.github.mikesaelim.indeedfilter.persistence.HiddenCompany;
import io.github.mikesaelim.indeedfilter.persistence.HiddenCompanyRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(HiddenCompanyController.class)
class HiddenCompanyControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    HiddenCompanyRepository hiddenCompanyRepository;

    @Test
    void testListCompanies() throws Exception {
        when(hiddenCompanyRepository.findAll(any(Sort.class))).thenReturn(
                List.of(new HiddenCompany(5, "Palantir"),
                        new HiddenCompany(8, "Twitter"))
        );

        mockMvc.perform(get("/api/hidden-companies")).andExpectAll(
                status().isOk(),
                jsonPath("length($)").value(2),
                jsonPath("$[0].id").value(5),
                jsonPath("$[0].name").value("Palantir"),
                jsonPath("$[1].id").value(8),
                jsonPath("$[1].name").value("Twitter")
        );
    }

    @Test
    void testHideCompany() throws Exception {
        when(hiddenCompanyRepository.save(eq(new HiddenCompany(null, "Citadel"))))
                .thenReturn(new HiddenCompany(14, "Citadel"));

        mockMvc.perform(
                post("/api/hidden-companies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Citadel\"}")
        ).andExpectAll(
                status().isCreated(),
                jsonPath("$.id").value(14),
                jsonPath("$.name").value("Citadel")
        );
    }

    @Test
    void testHideCompanyWithIdReturns400() throws Exception {
        mockMvc.perform(
                post("/api/hidden-companies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\": 14, \"name\": \"Citadel\"}")
        ).andExpect(status().isBadRequest());
        verifyNoInteractions(hiddenCompanyRepository);
    }

    @Test
    void testHideCompanyIsIdempotent() throws Exception {
        when(hiddenCompanyRepository.save(eq(new HiddenCompany(null, "Oracle"))))
                .thenThrow(new DataIntegrityViolationException("oh no"));
        when(hiddenCompanyRepository.findByName("Oracle")).thenReturn(new HiddenCompany(23, "Oracle"));

        mockMvc.perform(
                post("/api/hidden-companies")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"Oracle\"}")
        ).andExpectAll(
                status().isCreated(),
                jsonPath("$.id").value(23),
                jsonPath("$.name").value("Oracle")
        );
    }

    @Test
    void testUnhideCompany() throws Exception {
        mockMvc.perform(delete("/api/hidden-companies/2")).andExpect(status().isNoContent());
        verify(hiddenCompanyRepository).deleteById(2);
    }

}