package io.github.mikesaelim.indeedfilter.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyPatch {
    private String notes;

    private Boolean hidden;
}
