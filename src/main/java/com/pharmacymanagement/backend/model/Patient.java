package com.pharmacymanagement.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "patient")
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

    public Patient() {
    }

    public Patient(String patientName, String gender, LocalDate dateOfBirth, String patientAddress, String patientPhone) {
        this.patientName = patientName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.patientAddress = patientAddress;
        this.patientPhone = patientPhone;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPatientAddress() {
        return patientAddress;
    }

    public void setPatientAddress(String patientAddress) {
        this.patientAddress = patientAddress;
    }

    public String getPatientPhone() {
        return patientPhone;
    }

    public void setPatientPhone(String patientPhone) {
        this.patientPhone = patientPhone;
    }
}
