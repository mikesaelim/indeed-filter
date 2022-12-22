package io.github.mikesaelim.indeedfilter.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, String> {

    @Query(nativeQuery = true,
            value = "SELECT j.* FROM jobs j " +
                    "LEFT JOIN hidden_companies h ON j.company=h.name " +
                    "WHERE h.name IS NULL " +
                    "ORDER BY j.pub_date DESC, j.jobkey ASC")
    List<Job> findAllExcludingHiddenCompanies();

}
