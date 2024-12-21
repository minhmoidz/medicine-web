package com.pharmacymanagement.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "supplier")
@Data
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int supplierId;

    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "address")
    private String supplierAddress;

    @Column(name = "phone")
    private String supplierPhone;

}
