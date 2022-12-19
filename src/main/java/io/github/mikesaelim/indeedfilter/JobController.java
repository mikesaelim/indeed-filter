package io.github.mikesaelim.indeedfilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class JobController {

    @Autowired
    JobRepository jobRepository;

    /**
     * Return all the jobs in the database, sorted by jobkey.  // TODO sort by pubDate desc?
     */
    @GetMapping("/jobs")
    List<Job> listJobs() {
        return jobRepository.findAll();
    }

}
