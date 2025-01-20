package io.github.mikesaelim.indeedfilter.persistence;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.ZonedDateTime;

@Entity
@Table(name = "runs")
@Data
public class HarvesterRun {
    @Id
    private Integer id;

    private ZonedDateTime completedAt;
    private String searchUrl;
    private Boolean success;
}
