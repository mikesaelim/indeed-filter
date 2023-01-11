package io.github.mikesaelim.indeedfilter.web;

import io.github.mikesaelim.indeedfilter.persistence.Job;
import lombok.Builder;
import lombok.Value;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;

@Value
@Builder
public class JobModel {
    String jobkey;
    String title;
    String company;
    String companyIdEncrypted;
    String viewJobLink;
    Boolean expired;
    ZonedDateTime pubDate;
    String jobLocationCity;
    String jobLocationState;
    String jobLocationPostal;
    String jobLocationExtras;
    String formattedLocation;
    String formattedRelativeTime;
    String snippet;

    public static JobModel fromJob(Job job) {
        return JobModel.builder()
                .jobkey(job.getJobkey())
                .title(job.getTitle())
                .company(job.getCompany())
                .companyIdEncrypted(job.getCompanyIdEncrypted())
                .viewJobLink(job.getViewJobLink())
                .expired(job.getExpired())
                .pubDate(job.getPubDate().atZone(ZoneOffset.UTC))
                .jobLocationCity(job.getJobLocationCity())
                .jobLocationState(job.getJobLocationState())
                .jobLocationPostal(job.getJobLocationPostal())
                .jobLocationExtras(job.getJobLocationExtras())
                .formattedLocation(job.getFormattedLocation())
                .formattedRelativeTime(job.getFormattedRelativeTime())
                .snippet(job.getSnippet())
                .build();
    }
}
