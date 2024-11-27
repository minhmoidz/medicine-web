package com.pharmacymanagement.backend.service;

import com.pharmacymanagement.backend.dto.ContributionDTO;
import com.pharmacymanagement.backend.exception.InvalidDataException;
import com.pharmacymanagement.backend.exception.ResourceNotFoundException;
import com.pharmacymanagement.backend.model.Contribution;
import com.pharmacymanagement.backend.model.Medicine;
import com.pharmacymanagement.backend.repository.ContributionRepository;
import com.pharmacymanagement.backend.repository.MedicineRepository;
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
    private ModelMapper modelMapper;

    public List<ContributionDTO> getAllContribution() {
        List<Contribution> contributions = contributionRepository.findAll();

        List<ContributionDTO> contributionDTOs = new ArrayList<>();

        for (Contribution contribution : contributions) {
            contributionDTOs.add(modelMapper.map(contribution, ContributionDTO.class));
        }

        return contributionDTOs;
    }

    public void addMedicineContribution(Integer medicineId, Integer supplierId, Integer quantityContribution) {
        if (quantityContribution == null || quantityContribution <= 0) {
            throw new InvalidDataException("Vui lòng nhập số nguyên dương !");
        }

        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thuốc với Id là: "+medicineId));

        medicine.setQuantity(medicine.getQuantity() + quantityContribution);
        medicineRepository.save(medicine);

        Contribution contribution = new Contribution();
        contribution.setMedicineId(medicineId);
        contribution.setSupplierId(supplierId);
        contribution.setQuantityContribution(quantityContribution);

        contributionRepository.save(contribution);
    }

    public void deleteContributionById(Integer contributionId) {
        Contribution contribution = contributionRepository.findById(contributionId)
                .orElseThrow(() -> new ResourceNotFoundException("Khoông tìm thấy thông tin nhập thuốc với id là: "+contributionId));

        Medicine medicine = medicineRepository.findById(contribution.getMedicineId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin thuốc với Id là: "+contribution.getMedicineId()));

        medicine.setQuantity(medicine.getQuantity() - contribution.getQuantityContribution());
        medicineRepository.save(medicine);

        contributionRepository.delete(contribution);
    }




}
