package com.pharmacymanagement.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MedicineDTO {
    private Integer medicineId;
    private String medicineName;
    private Integer quantity;
    private LocalDate expDate;
    private LocalDate entryDate;
    private String medicineType;
}
