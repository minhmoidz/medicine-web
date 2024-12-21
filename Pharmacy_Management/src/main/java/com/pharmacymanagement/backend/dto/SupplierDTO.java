package com.pharmacymanagement.backend.dto;

import lombok.Data;

@Data
public class SupplierDTO {
    private Integer supplierId;
    private String supplierName;
    private String address;
    private String phone;

}
