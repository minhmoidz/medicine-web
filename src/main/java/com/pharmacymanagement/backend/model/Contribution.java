package com.pharmacymanagement.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contribution")
public class Contribution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int contributionId;

    @Column(name = "medicine_id", nullable = false)
    private Integer medicineId;

    @Column(name = "supplier_id", nullable = false)
    private Integer supplierId;

    @ManyToOne
    @JoinColumn(name = "medicine_id", insertable = false, updatable = false )
    private Medicine medicine;

    @ManyToOne
    @JoinColumn(name = "supplier_id", insertable = false, updatable = false )
    private Supplier supplier;

    @Column(name = "quantity_contribution", nullable = false)
    private Integer quantityContribution;

    public Contribution() {
    }

    public Contribution(Integer medicineId, Integer supplierId, Medicine medicine, Supplier supplier, Integer quantityContribution) {
        this.medicineId = medicineId;
        this.supplierId = supplierId;
        this.medicine = medicine;
        this.supplier = supplier;
        this.quantityContribution = quantityContribution;
    }

    public int getContributionId() {
        return contributionId;
    }

    public void setContributionId(int contributionId) {
        this.contributionId = contributionId;
    }

    public Integer getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Integer medicineId) {
        this.medicineId = medicineId;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Integer getQuantityContribution() {
        return quantityContribution;
    }

    public void setQuantityContribution(Integer quantityContribution) {
        this.quantityContribution = quantityContribution;
    }
}
