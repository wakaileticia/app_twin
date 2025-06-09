package com.app_twin.sensorapi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Reading {

    @Id
    @GeneratedValue
    private Long id;

    private String sensorId;
    private Double value;
    private LocalDateTime timestamp;

    public Reading() {
    }

    public Reading(String sensorId, Double value, LocalDateTime timestamp) {
        this.sensorId = sensorId;
        this.value = value;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
