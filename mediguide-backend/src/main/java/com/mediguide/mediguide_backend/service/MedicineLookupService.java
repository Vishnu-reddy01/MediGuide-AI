package com.mediguide.mediguide_backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mediguide.mediguide_backend.dto.MedicineInfo;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class MedicineLookupService {

    private List<MedicineInfo> medicines = new ArrayList<>();

    @PostConstruct
    public void loadMedicines() {

        try {

            ObjectMapper mapper = new ObjectMapper();

            InputStream input =
                    new ClassPathResource("medicines/medicines.json").getInputStream();

            medicines = mapper.readValue(
                    input,
                    new TypeReference<List<MedicineInfo>>() {}
            );

            System.out.println("Loaded " + medicines.size() + " medicines.");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
public MedicineInfo findMedicine(String medicineName) {

    for (MedicineInfo medicine : medicines) {

        if (medicine.getName().equalsIgnoreCase(medicineName)) {

            return medicine;

        }

    }

    return null;

}
}