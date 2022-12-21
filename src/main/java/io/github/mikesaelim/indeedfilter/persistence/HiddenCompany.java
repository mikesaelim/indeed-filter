package io.github.mikesaelim.indeedfilter.persistence;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hidden_companies")
@Data
public class HiddenCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String name;
}
