package io.github.mikesaelim.indeedfilter.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HiddenCompanyRepository extends JpaRepository<HiddenCompany, Integer> {

    HiddenCompany findByName(String name);

}
