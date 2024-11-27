package com.pharmacymanagement.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "invoice_details")
public class InvoiceDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int invoiceDetailsId;

    @Column(name = "medicine_id", nullable = false)
    private Integer medicineId;

    @Column(name = "patient_id", nullable = false)
    private Integer patientId;

    @ManyToOne
    @JoinColumn(name = "medicine_id", insertable = false, updatable = false )
    private Medicine medicine;

    @ManyToOne
    @JoinColumn(name = "patient_id", insertable = false, updatable = false )
    private Patient patient;

    @Column(name = "quantity", nullable = false)
    private Integer quantityDetails;

    @Column(name = "date_of_transact")
    private LocalDate dateOfTrans;

    public InvoiceDetails() {
    }

    public int getInvoiceDetailsId() {
        return invoiceDetailsId;
    }

    public void setInvoiceDetailsId(int invoiceDetailsId) {
        this.invoiceDetailsId = invoiceDetailsId;
    }

    public Integer getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Integer medicineId) {
        this.medicineId = medicineId;
    }

    public Integer getPatientId() {
        return patientId;
    }

    public void setPatientId(Integer patientId) {
        this.patientId = patientId;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Integer getQuantityDetails() {
        return quantityDetails;
    }

    public void setQuantityDetails(Integer quantityDetails) {
        this.quantityDetails = quantityDetails;
    }

    public LocalDate getDateOfTrans() {
        return dateOfTrans;
    }

    public void setDateOfTrans(LocalDate dateOfTrans) {
        this.dateOfTrans = dateOfTrans;
    }
}
