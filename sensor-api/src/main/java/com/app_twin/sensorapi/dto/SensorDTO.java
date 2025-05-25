package com.app_twin.sensorapi.dto;

import java.util.List;

public class SensorDTO {
    private String id;
    private String name;
    private String value;
    private String status;
    private List<Double> history;

    public SensorDTO(String id, String name, String value, String status, List<Double> history) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.status = status;
        this.history = history;
    }

    // Getters
    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getValue() {
        return value;
    }
    public String getStatus() {
        return status;
    }
    public List<Double> getHistory() {
        return history;
    }
}
