package com.pharmacymanagement.backend.model;


import jakarta.persistence.*;

@Entity
@Table(name = "supplier")
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

    public Supplier() {
    }

    public Supplier(String supplierName, String supplierAddress, String supplierPhone) {
        this.supplierName = supplierName;
        this.supplierAddress = supplierAddress;
        this.supplierPhone = supplierPhone;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getSupplierAddress() {
        return supplierAddress;
    }

    public void setSupplierAddress(String supplierAddress) {
        this.supplierAddress = supplierAddress;
    }

    public String getSupplierPhone() {
        return supplierPhone;
    }

    public void setSupplierPhone(String supplierPhone) {
        this.supplierPhone = supplierPhone;
    }
}
