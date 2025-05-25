package com.app_twin.sensorapi.controller;

import com.app_twin.sensorapi.model.Reading;
import com.app_twin.sensorapi.repository.ReadingRepository;
import com.app_twin.sensorapi.dto.SensorDTO;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/readings")
@CrossOrigin(origins = "http://localhost:19006")
public class ReadingController {

    private final ReadingRepository repository;

    public ReadingController(ReadingRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Reading saveReading(@RequestBody Reading reading) {
        return repository.save(reading);
    }

    @GetMapping("/{sensorId}")
    public List<Reading> getBySensor(@PathVariable String sensorId) {
        return repository.findBySensorId(sensorId);
    }

    @GetMapping
    public List<SensorDTO> getAll() {
        List<Reading> readings = repository.findAll();

        Map<String, List<Reading>> grouped = readings.stream()
            .collect(Collectors.groupingBy(Reading::getSensorId));

        List<SensorDTO> sensors = new ArrayList<>();

        for (Map.Entry<String, List<Reading>> entry : grouped.entrySet()) {
            String sensorId = entry.getKey();
            List<Reading> sensorReadings = entry.getValue();

            sensorReadings.sort(Comparator.comparing(Reading::getTimestamp));
            Reading latest = sensorReadings.get(sensorReadings.size() - 1);

            String name = getSensorName(sensorId);
            String value = formatValue(sensorId, latest.getSensorValue());
            String status = calculateStatus(sensorId, latest.getSensorValue());
            List<Double> history = sensorReadings.stream()
                .map(Reading::getSensorValue)
                .skip(Math.max(0, sensorReadings.size() - 3))
                .collect(Collectors.toList());

            sensors.add(new SensorDTO(sensorId, name, value, status, history));
        }

        return sensors;
    }

    private String getSensorName(String id) {
        switch (id) {
            case "1": return "Sensor de Pressão";
            case "2": return "Sensor de Fluxo";
            case "3": return "Velocidade do Salto";
            case "4": return "Consumo de Ar";
            case "5": return "Eficiência de Recuperação";
            default: return "Sensor Desconhecido";
        }
    }

    private String formatValue(String id, Double value) {
        switch (id) {
            case "1": return value + " bar";
            case "2": return value.intValue() + " L/min";
            case "3": return value.intValue() + " mm/s";
            case "4": return value.intValue() + " L/min";
            case "5": return value.intValue() + "%";
            default: return value.toString();
        }
    }

    private String calculateStatus(String id, Double value) {
        if ("2".equals(id) && value < 40) return "Alerta";
        return "OK";
    }
}
