package com.pharmacymanagement.backend.controller;

import com.pharmacymanagement.backend.dto.ContributionDTO;
import com.pharmacymanagement.backend.model.Contribution;
import com.pharmacymanagement.backend.service.ContributionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contributions")
public class ContributionController {

    @Autowired
    private ContributionService contributionService;

    @GetMapping
    public List<ContributionDTO> getAllContributions() {
        return contributionService.getAllContribution();
    }

    @PostMapping
    public String addMedicineContribution(@RequestBody Contribution contribution) {
        contributionService.addMedicineContribution(
                contribution.getMedicineId(),
                contribution.getSupplierId(),
                contribution.getQuantityContribution());
        return "nhập thuốc thành công !";
    }

    @DeleteMapping("/{id}")
    public String deleteContributionById(@PathVariable Integer id) {
        try {
            contributionService.deleteContributionById(id);
            return "Xóa thành công !";
        } catch (Exception e) {
            return "Có lỗi xảy ra, vui lòng thử lại !" + e.getMessage();
        }
    }

}
