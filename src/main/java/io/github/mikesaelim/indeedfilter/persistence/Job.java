package io.github.mikesaelim.indeedfilter.persistence;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Data
public class Job {
    @Id
    private String jobkey;

    private String title;
    private String company;
    private String companyIdEncrypted;
    private String viewJobLink;
    private Boolean expired;
    // Datetime in UTC
    private LocalDateTime pubDate;
    private String jobLocationCity;
    private String jobLocationState;
    private String jobLocationPostal;
    private String jobLocationExtras;
    private String formattedLocation;
    private String formattedRelativeTime;
    private String snippet;
}
