package com.pharmacymanagement.backend.service;

import com.pharmacymanagement.backend.exception.ResourceNotFoundException;
import com.pharmacymanagement.backend.model.Patient;
import com.pharmacymanagement.backend.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatient() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(int id) {
        return patientRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin bệnh nhân"));
    }

    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(int id, Patient updatedPatient) {
        Patient patient = patientRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin bệnh nhân"));
        if (patient != null) {
            patient.setPatientName(updatedPatient.getPatientName());
            patient.setGender(updatedPatient.getGender());
            patient.setDateOfBirth(updatedPatient.getDateOfBirth());
            patient.setPatientAddress(updatedPatient.getPatientAddress());
            patient.setPatientPhone(updatedPatient.getPatientPhone());
            return patientRepository.save(patient);
        }
        return null;
    }

    public void deletePatient(int id) {
        patientRepository.deleteById(id);
    }
}
