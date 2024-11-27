package com.pharmacymanagement.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class PatientDTO {
    private Integer patientId;
    private String patientName;
    private String gender;
    private LocalDate dateOfBirth;
    private String address;
    private String phone;

}
