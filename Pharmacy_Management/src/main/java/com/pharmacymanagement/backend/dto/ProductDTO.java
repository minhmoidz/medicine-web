package com.pharmacymanagement.backend.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private int medicineId;
    private String medicineName;
    private String medicineType;
    private int quantity;
    private String expDate;
    private String entryDate;
    private String price;
}
