package com.pharmacymanagement.backend.repository;

import com.pharmacymanagement.backend.model.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContributionRepository extends JpaRepository<Contribution, Integer> {
}
