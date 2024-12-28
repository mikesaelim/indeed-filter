package io.github.mikesaelim.indeedfilter.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, String> {

    @Query(nativeQuery = true,
            value = """
                    SELECT j.* FROM jobs j
                    LEFT JOIN companies c ON j.company=c.name
                    WHERE c.name IS NULL OR c.hidden IS FALSE
                    ORDER BY j.pub_date DESC, j.jobkey ASC
                    """)
    List<Job> findAllExcludingHiddenCompanies();

    @Query(nativeQuery = true,
            value = """
                    WITH job_companies AS
                      (SELECT company AS name, count(jobkey) AS jobCount
                       FROM jobs
                       GROUP BY name
                       ORDER BY jobCount DESC, name ASC)
                    SELECT job_companies.*, COALESCE(companies.hidden, FALSE) AS hidden
                    FROM job_companies
                    LEFT JOIN companies ON job_companies.name=companies.name
                    """)
    List<JobCompany> findCompanies();

}
