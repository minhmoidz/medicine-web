package com.pharmacymanagement.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "medicine")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int medicineId;

    @Column(name = "medicine_name")
    private String medicineName;

    @Column(name = "treat")
    private String treat;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "exp_date")
    private java.sql.Date expDate;

    @Column(name = "medicine_type")
    private String medicineType;

    @Column(name = "entry_date")
    private java.sql.Date entryDate;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "price")
    private String price;
}
