package com.app_twin.sensorapi.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Sensor {

    @Id
    private String id;

    private String name;
    private String unit;
    private String status;

    public Sensor() {}

    public Sensor(String id, String name, String unit, String status) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.status = status;
    }

    // Getters e setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
