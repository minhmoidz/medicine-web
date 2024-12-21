package com.pharmacymanagement.backend.dto;

import lombok.Data;

@Data
public class ContributionDTO {
    private int contributionId;
    private String medicineName;
    private String medicineType;
    private String supplierName;
    private String supplierPhone;
    private Integer quantityContribution;

}
