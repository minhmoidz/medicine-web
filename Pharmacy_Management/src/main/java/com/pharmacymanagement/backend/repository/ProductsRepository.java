package com.pharmacymanagement.backend.repository;

import com.pharmacymanagement.backend.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Integer> {
    Optional<Products> findByMedicineName(String medicineName);
}
