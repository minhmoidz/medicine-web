package com.pharmacymanagement.backend.service;

import com.pharmacymanagement.backend.dto.InvoiceDetailsDTO;
import com.pharmacymanagement.backend.exception.InvalidDataException;
import com.pharmacymanagement.backend.exception.ResourceNotFoundException;
import com.pharmacymanagement.backend.model.InvoiceDetails;
import com.pharmacymanagement.backend.model.Medicine;
import com.pharmacymanagement.backend.model.Patient;
import com.pharmacymanagement.backend.repository.InvoiceDetailsRepository;
import com.pharmacymanagement.backend.repository.MedicineRepository;
import com.pharmacymanagement.backend.repository.PatientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceDetailsService {
    
    @Autowired
    private InvoiceDetailsRepository invoiceDetailsRepository;
    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<InvoiceDetailsDTO> getAllInvoiceDetails() {
        List<InvoiceDetails> invoiceDetailsList = invoiceDetailsRepository.findAll();

        // Tạo danh sách DTO
        List<InvoiceDetailsDTO> invoiceDetailsDTOList = new ArrayList<>();

        // Chuyển đổi từng entity sang DTO
        for (InvoiceDetails invoiceDetails : invoiceDetailsList) {
            invoiceDetailsDTOList.add(modelMapper.map(invoiceDetails, InvoiceDetailsDTO.class));
        }

        return invoiceDetailsDTOList;
    }

    public void addMedicineInvoiceDetails(Integer medicineId, Integer patientId, Integer quantityDetails, LocalDate dateOfTrans) {
        if (quantityDetails == null || quantityDetails <= 0) {
            throw new InvalidDataException("Vui lòng nhập số nguyên dương !");
        }

        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thuốc với Id là: "+medicineId));

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin bệnh nhân với Id là: "+patientId));

        medicine.setQuantity(medicine.getQuantity() - quantityDetails);
        medicineRepository.save(medicine);

        InvoiceDetails invoiceDetails = new InvoiceDetails();
        invoiceDetails.setMedicineId(medicineId);
        invoiceDetails.setPatientId(patientId);
        invoiceDetails.setQuantityDetails(quantityDetails);
        invoiceDetails.setDateOfTrans(dateOfTrans);

        invoiceDetailsRepository.save(invoiceDetails);
    }

    public void deleteInvoiceDetailsById(Integer invoiceDetailsId) {
        InvoiceDetails invoiceDetails = invoiceDetailsRepository.findById(invoiceDetailsId)
                .orElseThrow(() -> new ResourceNotFoundException("Khoông tìm thấy thông tin xuất thuốc với id là: "+invoiceDetailsId));

        Medicine medicine = medicineRepository.findById(invoiceDetails.getMedicineId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin thuốc với Id là: "+invoiceDetails.getMedicineId()));

        medicine.setQuantity(medicine.getQuantity() + invoiceDetails.getQuantityDetails());
        medicineRepository.save(medicine);

        invoiceDetailsRepository.delete(invoiceDetails);
    }
}
