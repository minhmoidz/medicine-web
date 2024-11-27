package com.pharmacymanagement.backend.config;

import com.pharmacymanagement.backend.dto.ContributionDTO;
import com.pharmacymanagement.backend.dto.InvoiceDetailsDTO;
import com.pharmacymanagement.backend.model.Contribution;
import com.pharmacymanagement.backend.model.InvoiceDetails;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        // Cấu hình ánh xạ tùy chỉnh
        modelMapper.addMappings(new PropertyMap<InvoiceDetails, InvoiceDetailsDTO>() {
            @Override
            protected void configure() {
                map().setPatientName(source.getPatient().getPatientName());   // Ánh xạ tên bệnh nhân
                map().setPatientPhone(source.getPatient().getPatientPhone());
                map().setMedicineName(source.getMedicine().getMedicineName()); // Ánh xạ tên thuốc
                map().setMedicineType(source.getMedicine().getMedicineType());
            }
        });

        modelMapper.addMappings(new PropertyMap<Contribution, ContributionDTO>() {
            @Override
            protected void configure() {
                map().setMedicineName(source.getMedicine().getMedicineName());
                map().setMedicineType(source.getMedicine().getMedicineType());
                map().setSupplierName(source.getSupplier().getSupplierName());
                map().setSupplierPhone(source.getSupplier().getSupplierPhone());
            }
        });
        return modelMapper;
    }
}

