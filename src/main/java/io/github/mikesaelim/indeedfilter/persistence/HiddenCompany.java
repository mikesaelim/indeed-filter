package io.github.mikesaelim.indeedfilter.persistence;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hidden_companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HiddenCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String name;
}
