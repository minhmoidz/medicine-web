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

    public Medicine() {
    }

    public Medicine(String medicineName, int quantity, LocalDate expDate, LocalDate entryDate,  String medicineType) {
        this.medicineName = medicineName;
        this.quantity = quantity;
        this.expDate = expDate;
        this.entryDate = entryDate;
        this.quantity = quantity;
        this.medicineType = medicineType;
    }

    public int getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(int medicineId) {
        this.medicineId = medicineId;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDate getExpDate() {
        return expDate;
    }

    public void setExpDate(LocalDate expDate) {
        this.expDate = expDate;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public String getMedicineType() {
        return medicineType;
    }

    public void setMedicineType(String medicineType) {
        this.medicineType = medicineType;
    }

    @Override
    public String toString() {
        return "Medicine{" +
                "medicineId=" + medicineId +
                ", medicineName='" + medicineName + '\'' +
                ", quantity=" + quantity +
                ", expDate=" + expDate +
                ", entryDate=" + entryDate +
                ", medicineType='" + medicineType + '\'' +
//                ", quantityContribution=" + quantityContribution +
                '}';
    }
}
