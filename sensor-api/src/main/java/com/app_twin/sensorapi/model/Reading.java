package com.app_twin.sensorapi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Reading {

    @Id
    @GeneratedValue
    private Long id;

    private String sensorId;

    private Double sensorValue;

    private LocalDateTime timestamp;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    public Double getSensorValue() {
        return sensorValue;
    }

    public void setSensorValue(Double sensorValue) {
        this.sensorValue = sensorValue;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
