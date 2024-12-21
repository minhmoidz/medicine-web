package com.pharmacymanagement.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class InvoiceDetailsDTO {
    private int invoiceDetailsId;
    private String patientName;
    private String patientPhone;
    private String medicineName;
    private String medicineType;
    private Integer quantityDetails;
    private LocalDate dateOfTrans;

}
