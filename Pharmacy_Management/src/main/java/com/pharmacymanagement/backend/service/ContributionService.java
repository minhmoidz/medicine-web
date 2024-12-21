package com.pharmacymanagement.backend.service;

import com.pharmacymanagement.backend.dto.ContributionDTO;
import com.pharmacymanagement.backend.exception.InvalidDataException;
import com.pharmacymanagement.backend.exception.ResourceNotFoundException;
import com.pharmacymanagement.backend.model.Contribution;
import com.pharmacymanagement.backend.model.Medicine;
import com.pharmacymanagement.backend.model.Supplier;
import com.pharmacymanagement.backend.repository.ContributionRepository;
import com.pharmacymanagement.backend.repository.MedicineRepository;
import com.pharmacymanagement.backend.repository.SupplierRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContributionService {

    @Autowired
    private ContributionRepository contributionRepository;
    @Autowired
    private MedicineRepository medicineRepository;
    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<ContributionDTO> getAllContribution() {
        List<Contribution> contributions = contributionRepository.findAll();

        List<ContributionDTO> contributionDTOs = new ArrayList<>();

        for (Contribution contribution : contributions) {
            contributionDTOs.add(modelMapper.map(contribution, ContributionDTO.class));
        }

        return contributionDTOs;
    }

    public void addMedicineContribution(ContributionDTO dto) {
        if (dto.getQuantityContribution() == null || dto.getQuantityContribution() <= 0) {
            throw new InvalidDataException("Vui lòng nhập số nguyên dương cho số lượng đóng góp!");
        }

        Medicine medicine = medicineRepository.findByMedicineName(dto.getMedicineName())
                .orElseThrow(() -> new ResourceNotFoundException("Medicine not found"));

        Supplier supplier = supplierRepository.findBySupplierName(dto.getSupplierName())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));

        medicine.setQuantity(medicine.getQuantity() + dto.getQuantityContribution());
        medicineRepository.save(medicine);

        Contribution contribution = new Contribution();
        contribution.setMedicine(medicine);
        contribution.setSupplier(supplier);
        contribution.setQuantityContribution(dto.getQuantityContribution());

        contributionRepository.save(contribution);
    }

    public void deleteContributionById(Integer contributionId) {
        Contribution contribution = contributionRepository.findById(contributionId)
                .orElseThrow(() -> new ResourceNotFoundException("Khoông tìm thấy thông tin nhập thuốc với id là: " + contributionId));

        Medicine medicine = contribution.getMedicine();
        if (medicine != null) {

            int newQuantity = medicine.getQuantity() - contribution.getQuantityContribution();
            medicine.setQuantity(newQuantity);
            medicineRepository.save(medicine);

            contributionRepository.delete(contribution);
        }
    }






}
