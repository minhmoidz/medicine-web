package com.pharmacymanagement.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "contribution")
@Data
public class Contribution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int contributionId;

    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false )
    private Supplier supplier;

    @Column(name = "quantity_contribution", nullable = false)
    private Integer quantityContribution;

}
