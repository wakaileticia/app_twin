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

    // Construtor vazio obrigatório para o JPA
    public Reading() {
    }

    // Construtor com parâmetros (útil para inserir sensores iniciais)
    public Reading(String sensorId, Double sensorValue, LocalDateTime timestamp) {
        this.sensorId = sensorId;
        this.sensorValue = sensorValue;
        this.timestamp = timestamp;
    }

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
