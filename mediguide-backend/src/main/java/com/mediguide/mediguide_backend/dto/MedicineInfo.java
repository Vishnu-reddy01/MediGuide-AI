package com.mediguide.mediguide_backend.dto;

public class MedicineInfo {

    private String name;
    private String usedFor;
    private String dosage;
    private String recommendedFoods;
    private String avoidFoods;
    private String sideEffects;

    public MedicineInfo() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsedFor() {
        return usedFor;
    }

    public void setUsedFor(String usedFor) {
        this.usedFor = usedFor;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getRecommendedFoods() {
        return recommendedFoods;
    }

    public void setRecommendedFoods(String recommendedFoods) {
        this.recommendedFoods = recommendedFoods;
    }

    public String getAvoidFoods() {
        return avoidFoods;
    }

    public void setAvoidFoods(String avoidFoods) {
        this.avoidFoods = avoidFoods;
    }

    public String getSideEffects() {
        return sideEffects;
    }

    public void setSideEffects(String sideEffects) {
        this.sideEffects = sideEffects;
    }

}