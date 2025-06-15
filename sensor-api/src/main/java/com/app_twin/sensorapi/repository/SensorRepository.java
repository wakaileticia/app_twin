package com.app_twin.sensorapi.repository;

import com.app_twin.sensorapi.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SensorRepository extends JpaRepository<Sensor, String> {
    List<Sensor> findByStatus(String status);
}
