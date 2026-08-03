package com.mediguide.mediguide_backend.service;

import com.mediguide.mediguide_backend.entity.Medicine;
import com.mediguide.mediguide_backend.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    // Add Medicine
    public Medicine addMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    // Get All Medicines
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    // Get Medicine By ID
    public Optional<Medicine> getMedicineById(Long id) {
        return medicineRepository.findById(id);
    }

    // Update Medicine
    public Medicine updateMedicine(Long id, Medicine updatedMedicine) {

        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        medicine.setMedicineName(updatedMedicine.getMedicineName());
        medicine.setDosage(updatedMedicine.getDosage());
        medicine.setTiming(updatedMedicine.getTiming());
        medicine.setPurpose(updatedMedicine.getPurpose());

        return medicineRepository.save(medicine);
    }

    // Delete Medicine
    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }
}