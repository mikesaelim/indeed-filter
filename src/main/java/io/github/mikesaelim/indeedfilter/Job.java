package io.github.mikesaelim.indeedfilter;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "jobs")
@Data
public class Job {
    @Id
    String jobkey;

    String title;
    String company;
    String companyIdEncrypted;
    String viewJobLink;
    Boolean expired;
    LocalDate pubDate;
    String jobLocationCity;
    String jobLocationState;
    String jobLocationPostal;
    String jobLocationExtras;
    String formattedLocation;
    String formattedRelativeTime;
    String snippet;
}
