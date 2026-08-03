package com.mediguide.mediguide_backend.controller;

import com.mediguide.mediguide_backend.dto.MedicineInfo;
import com.mediguide.mediguide_backend.service.MedicineLookupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lookup")
@CrossOrigin(origins = "*")
public class MedicineLookupController {

    private final MedicineLookupService lookupService;

    public MedicineLookupController(MedicineLookupService lookupService) {
        this.lookupService = lookupService;
    }

    @GetMapping("/{name}")
    public ResponseEntity<MedicineInfo> searchMedicine(@PathVariable String name) {

        MedicineInfo medicine = lookupService.findMedicine(name);

        if (medicine == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(medicine);
    }
}