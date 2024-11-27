package com.pharmacymanagement.backend.repository;

import com.pharmacymanagement.backend.model.Medicine;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Integer> {
    List<Medicine> findByExpDateBetween(LocalDate startDate, LocalDate endDate);
    List<Medicine> findByExpDateBefore(LocalDate currentDate);
    List<Medicine> findByQuantityLessThan(Integer quantity);

    @Modifying
    @Transactional
    @Query("DELETE FROM Medicine m WHERE m.expDate < CURRENT_DATE")
    void deleteAllExpiredMedicine();
}
