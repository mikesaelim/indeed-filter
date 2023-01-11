package io.github.mikesaelim.indeedfilter.web;

import lombok.Value;

import java.util.List;

@Value
public class JobList {
    /**
     * Total number of jobs, without filtering
     */
    Long totalCount;

    List<JobModel> jobs;
}
