package io.github.mikesaelim.indeedfilter.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HarvesterRunRepository extends JpaRepository<HarvesterRun, Integer> {

    Optional<HarvesterRun> findFirstByOrderByCompletedAtDesc();

}
