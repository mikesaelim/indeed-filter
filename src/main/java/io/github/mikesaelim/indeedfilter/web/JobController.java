package io.github.mikesaelim.indeedfilter.web;

import io.github.mikesaelim.indeedfilter.persistence.Job;
import io.github.mikesaelim.indeedfilter.persistence.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class JobController {

    @Autowired
    JobRepository jobRepository;

    /**
     * Return all the jobs in the database, sorted by most recent pubDate first.
     */
    @GetMapping("/api/jobs")
    List<Job> listJobs() {
        return jobRepository.findAll(Sort.by(Sort.Order.desc("pubDate"), Sort.Order.asc("jobkey")));
    }

}
