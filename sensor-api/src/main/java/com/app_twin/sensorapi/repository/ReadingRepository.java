package com.app_twin.sensorapi.repository;

import com.app_twin.sensorapi.model.Reading;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repositório para operações CRUD da entidade Reading.
 */
public interface ReadingRepository extends JpaRepository<Reading, Long> {
    List<Reading> findBySensorIdOrderByTimestampAsc(String sensorId);
}
