package io.github.mikesaelim.indeedfilter.web;

import io.github.mikesaelim.indeedfilter.persistence.Job;
import io.github.mikesaelim.indeedfilter.persistence.JobRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Sort;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(JobController.class)
class JobControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    JobRepository jobRepository;

    private static final List<Job> JOBS = List.of(
            buildJob("a1", "White Rook", "Chess.com"),
            buildJob("b2", "White Pawn", "Lichess")
    );

    @Test
    void testListJobs() throws Exception {
        when(jobRepository.findAll(any(Sort.class))).thenReturn(JOBS);

        mockMvc.perform(get("/api/jobs")).andExpectAll(
                status().isOk(),
                jsonPath("length($)").value(2),
                jsonPath("$[0].jobkey").value("a1"),
                jsonPath("$[0].title").value("White Rook"),
                jsonPath("$[0].company").value("Chess.com"),
                jsonPath("$[1].jobkey").value("b2"),
                jsonPath("$[1].title").value("White Pawn"),
                jsonPath("$[1].company").value("Lichess")
        );
    }

    private static Job buildJob(String jobkey, String title, String company) {
        Job job = new Job();
        job.setJobkey(jobkey);
        job.setTitle(title);
        job.setCompany(company);
        return job;
    }

}