package com.app_twin.sensorapi.model;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * Classe que representa um sensor no sistema pneumático.
 */
@Entity
public class Sensor {

    @Id
    private String id;

    private String name;
    private String unit;
    private String status;
    private double health;  // Vida útil

    public Sensor() {
    }

    public Sensor(String id, String name, String unit, String status, double health) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.status = status;
        this.health = health;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public double getHealth() {
        return health;
    }
    public void setHealth(double health) {
        this.health = health;
    }
}
