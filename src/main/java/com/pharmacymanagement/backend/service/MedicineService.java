package com.pharmacymanagement.backend.service;

import com.pharmacymanagement.backend.exception.ResourceNotFoundException;
import com.pharmacymanagement.backend.model.Medicine;
import com.pharmacymanagement.backend.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MedicineService {
     @Autowired
     private MedicineRepository medicineRepository;

     public List<Medicine> getAllMedicines() {
         return medicineRepository.findAll();
     }

     public Medicine getMedicineById(int id) {
          return medicineRepository.findById(id)
                  .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thuốc với Id là:"+id));
     }

     public Medicine addMedicine(Medicine medicine) {
          return medicineRepository.save(medicine);
     }

     public Medicine updateMedicine(int id, Medicine updatedMedicine) {
          Medicine medicine = medicineRepository.findById(id)
                  .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thuốc với Id là:"+id));

          medicine.setMedicineName(updatedMedicine.getMedicineName());
          medicine.setQuantity(updatedMedicine.getQuantity());
          medicine.setExpDate(updatedMedicine.getExpDate());
          medicine.setMedicineType(updatedMedicine.getMedicineType());
          medicine.setEntryDate(updatedMedicine.getEntryDate());

          return medicineRepository.save(medicine);
     }

     public void deleteMedicine(int id) {
          medicineRepository.deleteById(id);
     }

     public List<Medicine> getExpiringMedicines() {
          LocalDate today = LocalDate.now();
          return medicineRepository.findByExpDateBefore(today);
     }

     public void deleteAllExpiredMedicine() {
          List<Medicine> expiringMedicines = getExpiringMedicines();

          if (!expiringMedicines.isEmpty()) {
               medicineRepository.deleteAllExpiredMedicine();
          }
     }

     public List<Medicine> getNealyExpiredMedicines() {
          LocalDate today = LocalDate.now();
          LocalDate targetDate = today.plusDays(15);
          return medicineRepository.findByExpDateBetween(today, targetDate);
     }

     public List<Medicine> getLowStockMedicines() {
          try {
               return medicineRepository.findByQuantityLessThan(150);
          } catch (Exception e) {
               System.out.println("Lỗi là: "+e.getMessage());
          }
          return null;
     }









}
