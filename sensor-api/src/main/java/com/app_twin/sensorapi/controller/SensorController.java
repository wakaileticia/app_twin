package com.app_twin.sensorapi.controller;

import com.app_twin.sensorapi.model.Reading;
import com.app_twin.sensorapi.model.Sensor;
import com.app_twin.sensorapi.repository.ReadingRepository;
import com.app_twin.sensorapi.repository.SensorRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sensors")
@CrossOrigin(origins = "*")
public class SensorController {

    private final SensorRepository sensorRepo;
    private final ReadingRepository readingRepo;

    public SensorController(SensorRepository sensorRepo, ReadingRepository readingRepo) {
        this.sensorRepo = sensorRepo;
        this.readingRepo = readingRepo;
    }

    // 🔥 GET → Listar sensores com último valor e histórico
    @GetMapping
    public List<Map<String, Object>> getAllSensors() {
        List<Sensor> sensors = sensorRepo.findAll();
        return sensors.stream().map(sensor -> {
            Map<String, Object> response = new HashMap<>();
            response.put("id", sensor.getId());
            response.put("name", sensor.getName());
            response.put("unit", sensor.getUnit());
            response.put("status", sensor.getStatus());

            List<Reading> readings = readingRepo.findBySensorIdOrderByTimestampAsc(sensor.getId());
            if (!readings.isEmpty()) {
                Reading last = readings.get(readings.size() - 1);
                response.put("value", last.getSensorValue());
                response.put("history", readings.stream().map(Reading::getSensorValue).collect(Collectors.toList()));
            } else {
                response.put("value", null);
                response.put("history", Collections.emptyList());
            }

            return response;
        }).collect(Collectors.toList());
    }

    // 🔥 GET → Obter um sensor específico (detalhe + histórico)
    @GetMapping("/{id}")
    public Map<String, Object> getSensorById(@PathVariable String id) {
        Optional<Sensor> sensorOpt = sensorRepo.findById(id);
        if (sensorOpt.isEmpty()) {
            throw new RuntimeException("Sensor não encontrado: " + id);
        }

        Sensor sensor = sensorOpt.get();
        List<Reading> readings = readingRepo.findBySensorIdOrderByTimestampAsc(id);

        Map<String, Object> response = new HashMap<>();
        response.put("id", sensor.getId());
        response.put("name", sensor.getName());
        response.put("unit", sensor.getUnit());
        response.put("status", sensor.getStatus());
        response.put("value", readings.isEmpty() ? null : readings.get(readings.size() - 1).getSensorValue());
        response.put("history", readings.stream().map(Reading::getSensorValue).collect(Collectors.toList()));

        return response;
    }

    // 🔹 POST → Criar sensor
    @PostMapping
    public Sensor createSensor(@RequestBody Sensor sensor) {
        return sensorRepo.save(sensor);
    }

    // 🔹 PUT → Atualizar sensor
    @PutMapping("/{id}")
    public Sensor updateSensor(@PathVariable String id, @RequestBody Sensor sensor) {
        sensor.setId(id);
        return sensorRepo.save(sensor);
    }

    // 🔹 DELETE → Deletar sensor
    @DeleteMapping("/{id}")
    public void deleteSensor(@PathVariable String id) {
        sensorRepo.deleteById(id);
    }

    // 🔥 GET → Histórico de leituras de um sensor
    @GetMapping("/{id}/readings")
    public List<Reading> getReadingsBySensor(@PathVariable String id) {
        return readingRepo.findBySensorIdOrderByTimestampAsc(id);
    }

    // 🔥 POST → Adicionar uma nova leitura ao sensor
    @PostMapping("/{id}/readings")
    public Reading addReading(
            @PathVariable String id,
            @RequestBody ReadingRequest request
    ) {
        Reading reading = new Reading(id, request.getValue(), LocalDateTime.now());
        return readingRepo.save(reading);
    }

    // 🔹 Classe interna para o corpo da requisição de leitura
    public static class ReadingRequest {
        private Double value;

        public Double getValue() {
            return value;
        }

        public void setValue(Double value) {
            this.value = value;
        }
    }
}
