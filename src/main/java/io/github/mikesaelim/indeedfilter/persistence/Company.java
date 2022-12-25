package io.github.mikesaelim.indeedfilter.persistence;

import org.springframework.beans.factory.annotation.Value;

/**
 * Interface projection DTO
 * See https://vladmihalcea.com/spring-jpa-dto-projection/
 */
public interface Company {

    String getName();

    Integer getJobCount();

    @Value("#{target.hidden == 1}")
    Boolean isHidden();

}
