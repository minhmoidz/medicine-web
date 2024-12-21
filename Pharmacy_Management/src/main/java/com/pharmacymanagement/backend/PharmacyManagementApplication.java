package com.pharmacymanagement.backend;

import com.pharmacymanagement.backend.config.WebConfig;
import com.pharmacymanagement.backend.repository.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(WebConfig.class)
public class PharmacyManagementApplication {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(PharmacyManagementApplication.class, args);

        MedicineRepository medicineRepository = context.getBean(MedicineRepository.class);
        PatientRepository patientRepository = context.getBean(PatientRepository.class);
        SupplierRepository supplierRepository = context.getBean(SupplierRepository.class);
        ContributionRepository contributionRepository = context.getBean(ContributionRepository.class);
        InvoiceDetailsRepository invoiceDetailsRepository = context.getBean(InvoiceDetailsRepository.class);

    }

}
