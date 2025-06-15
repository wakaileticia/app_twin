package com.app_twin.sensorapi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Classe que representa uma leitura de um sensor.
 */
@Entity
public class Reading {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sensorId;
    private Double sensorValue;
    private LocalDateTime timestamp;

    public Reading() {
    }

    public Reading(String sensorId, Double sensorValue, LocalDateTime timestamp) {
        this.sensorId = sensorId;
        this.sensorValue = sensorValue;
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
