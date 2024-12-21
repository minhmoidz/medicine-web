package com.pharmacymanagement.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "patient")
@Data
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int patientId;
    private String patientName;
    private String gender;
    private LocalDate dateOfBirth;

    @Column(name = "address")
    private String patientAddress;

    @Column(name = "phone")
    private String patientPhone;

}
