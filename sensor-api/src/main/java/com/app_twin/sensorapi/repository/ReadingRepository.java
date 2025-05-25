package com.app_twin.sensorapi.repository;

import com.app_twin.sensorapi.model.Reading;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReadingRepository extends JpaRepository<Reading, Long> {
    List<Reading> findBySensorId(String sensorId);
}
