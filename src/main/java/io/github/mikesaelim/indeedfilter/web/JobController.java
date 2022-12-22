package io.github.mikesaelim.indeedfilter.web;

import io.github.mikesaelim.indeedfilter.persistence.Job;
import io.github.mikesaelim.indeedfilter.persistence.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class JobController {

    @Autowired
    JobRepository jobRepository;

    /**
     * Return jobs except for the ones from hidden companies, sorted by most recent pubDate first.
     * If the query parameter "?all" is set to a truthy value, it returns all jobs in the database.
     */
    @GetMapping("/api/jobs")
    ResponseEntity<List<Job>> listJobs(@RequestParam(defaultValue = "false") Boolean all) {
        if (all) {
            return ResponseEntity.ok(jobRepository.findAll(Sort.by(Sort.Order.desc("pubDate"), Sort.Order.asc("jobkey"))));
        } else {
            return ResponseEntity.ok(jobRepository.findAllExcludingHiddenCompanies());
        }
    }

}
