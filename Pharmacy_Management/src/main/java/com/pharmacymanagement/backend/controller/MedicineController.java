package com.pharmacymanagement.backend.controller;

import com.pharmacymanagement.backend.model.Medicine;
import com.pharmacymanagement.backend.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    @GetMapping
    public List<Medicine> getAllMedicines() {
        return medicineService.getAllMedicines();
    }

    @GetMapping("/{id}")
    public Medicine getMedicineById(@PathVariable int id) {
        return medicineService.getMedicine(id);
    }

    @PostMapping
    public void addMedicine(@RequestBody Medicine medicine) {
        medicineService.addMedicine(medicine);
    }

    @PutMapping("{id}")
    public void updateMedicine(@PathVariable int id, @RequestBody Medicine medicine) {
        medicineService.updateMedicine(id, medicine);
    }

    @DeleteMapping("/{id}")
    public void deleteMedicine(@PathVariable int id) {
        medicineService.deleteMedicine(id);
    }

    @GetMapping("/expired")
    public List<Medicine> getMedicineByExpiryDate() {
        return medicineService.getExpiringMedicines();
    }

    @GetMapping("/low-stock")
    public List<Medicine> getLowStockMedicines() {
        return medicineService.getLowStockMedicines();
    }

    @GetMapping("/near-expiry")
    public List<Medicine> getNearExpiryMedicines() {
        return medicineService.getNealyExpiredMedicines();
    }

    @DeleteMapping("/expired")
    public String deleteExpiredMedicines() {
        medicineService.deleteAllExpiredMedicine();
        return "Xóa thành công";
    }
}
