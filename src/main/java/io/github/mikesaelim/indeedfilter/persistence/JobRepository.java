package io.github.mikesaelim.indeedfilter.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, String> {
}
