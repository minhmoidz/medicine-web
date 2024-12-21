package com.pharmacymanagement.backend.service;

import com.pharmacymanagement.backend.dto.InvoiceDetailsDTO;
import com.pharmacymanagement.backend.exception.InvalidDataException;
import com.pharmacymanagement.backend.exception.ResourceNotFoundException;
import com.pharmacymanagement.backend.model.Contribution;
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

        List<InvoiceDetailsDTO> invoiceDetailsDTOList = new ArrayList<>();

        for (InvoiceDetails invoiceDetails : invoiceDetailsList) {
            invoiceDetailsDTOList.add(modelMapper.map(invoiceDetails, InvoiceDetailsDTO.class));
        }

        return invoiceDetailsDTOList;
    }

    public void addMedicineInvoiceDetails(InvoiceDetailsDTO dto) {
        if (dto.getQuantityDetails() == null || dto.getQuantityDetails() <= 0) {
            throw new InvalidDataException("vui lòng nhập số nguyên dương !");
        }

        Medicine medicine = medicineRepository.findByMedicineName(dto.getMedicineName())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin thuốc " + dto.getMedicineName()));

        Patient patient = patientRepository.findByPatientName(dto.getPatientName())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin bệnh nhân" + dto.getPatientName()));

        medicine.setQuantity(medicine.getQuantity() - dto.getQuantityDetails());
        medicineRepository.save(medicine);

        InvoiceDetails invoiceDetails = new InvoiceDetails();
        invoiceDetails.setMedicine(medicine);
        invoiceDetails.setPatient(patient);
        invoiceDetails.setQuantityDetails(dto.getQuantityDetails());

        invoiceDetailsRepository.save(invoiceDetails);
    }

    public void deleteInvoiceDetailsById(Integer invoiceDetailsId) {
        InvoiceDetails invoiceDetails = invoiceDetailsRepository.findById(invoiceDetailsId)
                .orElseThrow(() -> new ResourceNotFoundException("Khoông tìm thấy thông tin xuất thuốclà: " + invoiceDetailsId));

        Medicine medicine = invoiceDetails.getMedicine();
        if (medicine != null) {

            int newQuantity = medicine.getQuantity() + invoiceDetails.getQuantityDetails();
            medicine.setQuantity(newQuantity);
            medicineRepository.save(medicine);

            invoiceDetailsRepository.deleteById(invoiceDetailsId);
        }
    }
}
