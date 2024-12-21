package com.pharmacymanagement.backend.controller;

import com.pharmacymanagement.backend.dto.InvoiceDetailsDTO;
import com.pharmacymanagement.backend.service.InvoiceDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/invoice-details")
public class InvoiceDetailsController {
    
    @Autowired
    private InvoiceDetailsService invoiceDetailsService;
    
    @GetMapping
    public List<InvoiceDetailsDTO> getAllInvoiceDetails() {
        return invoiceDetailsService.getAllInvoiceDetails();
    }
    
    @PostMapping
    public String addInvoiceDetails(@RequestBody InvoiceDetailsDTO dto) {
        invoiceDetailsService.addMedicineInvoiceDetails(dto);
        return "xuất thuốc thành công !";
    }

    @DeleteMapping("/{id}")
    public String deleteInvoiceDetailsById(@PathVariable Integer id) {
        try {
            invoiceDetailsService.deleteInvoiceDetailsById(id);
            return "Xóa thành công !";
        } catch (Exception e) {
            return "Có lỗi xảy ra, vui lòng thử lại !" + e.getMessage();
        }
    }
}
