package io.github.mikesaelim.indeedfilter.web;

import io.github.mikesaelim.indeedfilter.persistence.Job;
import lombok.Value;

import java.util.List;

@Value
public class JobList {
    /**
     * Total number of jobs, without filtering
     */
    Long totalCount;

    List<Job> jobs;
}
