package io.github.mikesaelim.indeedfilter.web;

import io.github.mikesaelim.indeedfilter.persistence.HarvesterRun;
import io.github.mikesaelim.indeedfilter.persistence.HarvesterRunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class HarvesterRunController {

    @Autowired
    HarvesterRunRepository runRepository;

    /**
     * Return the last harvester run
     */
    @GetMapping("/api/runs/last")
    ResponseEntity<HarvesterRun> getLastRun() {
        Optional<HarvesterRun> run = runRepository.findFirstByOrderByCompletedAtDesc();

        if (run.isPresent()) {
            return ResponseEntity.ok(run.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
