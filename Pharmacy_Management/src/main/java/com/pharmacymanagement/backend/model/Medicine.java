package com.pharmacymanagement.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "medicine")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int medicineId;

    @Column(name = "medicine_name")
    private String medicineName;

    private int quantity;

    @Column(name = "exp_date")
    private LocalDate expDate;

    @Column(name = "entry_date")
    private LocalDate entryDate;

    @Column(name = "medicine_type")
    private String medicineType;

}
