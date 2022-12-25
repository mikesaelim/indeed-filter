package io.github.mikesaelim.indeedfilter.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, String> {

    @Query(nativeQuery = true,
            value = """
                    SELECT j.* FROM jobs j
                    LEFT JOIN hidden_companies h ON j.company=h.name
                    WHERE h.name IS NULL
                    ORDER BY j.pub_date DESC, j.jobkey ASC
                    """)
    List<Job> findAllExcludingHiddenCompanies();

    @Query(nativeQuery = true,
            value = """
                    WITH companies AS
                      (SELECT company AS name, count(jobkey) AS jobCount
                       FROM jobs
                       GROUP BY name
                       ORDER BY jobCount DESC, name ASC)
                    SELECT companies.*, CASE WHEN hc.id IS NULL THEN FALSE ELSE TRUE END hidden
                    FROM companies
                    LEFT JOIN hidden_companies hc ON companies.name=hc.name
                    """)
    List<Company> findCompanies();

}
