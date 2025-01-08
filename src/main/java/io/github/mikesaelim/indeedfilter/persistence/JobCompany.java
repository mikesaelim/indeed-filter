package io.github.mikesaelim.indeedfilter.persistence;

import org.springframework.beans.factory.annotation.Value;

/**
 * Interface projection DTO
 * See https://vladmihalcea.com/spring-jpa-dto-projection/
 */
public interface JobCompany {

    String getName();

    Integer getJobCount();

    // Only non-null if the company has a row in the companies table
    Integer getId();

    // Only non-null if the company has a row in the companies table
    String getNotes();

    @Value("#{target.hidden == 1}")
    Boolean isHidden();

}
