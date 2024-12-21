package com.pharmacymanagement.backend.repository;

import com.pharmacymanagement.backend.model.InvoiceDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceDetailsRepository extends JpaRepository<InvoiceDetails, Integer> {
}
