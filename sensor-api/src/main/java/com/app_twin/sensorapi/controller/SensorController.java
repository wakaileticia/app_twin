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

    // 🔥 GET → Lista sensores
    @GetMapping
    public List<Map<String, Object>> getAllSensors() {
        return sensorRepo.findAll().stream().map(this::buildSensorResponse).collect(Collectors.toList());
    }

    // 🔥 GET → Detalhe de sensor
    @GetMapping("/{id}")
    public Map<String, Object> getSensorById(@PathVariable String id) {
        Sensor sensor = sensorRepo.findById(id).orElseThrow(() -> new RuntimeException("Sensor não encontrado: " + id));
        return buildSensorResponse(sensor);
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

    // 🔥 GET → Histórico de leituras
    @GetMapping("/{id}/readings")
    public List<Reading> getReadingsBySensor(@PathVariable String id) {
        return readingRepo.findBySensorIdOrderByTimestampAsc(id);
    }

    // 🔥 POST → Adicionar leitura
    @PostMapping("/{id}/readings")
    public Reading addReading(@PathVariable String id, @RequestBody ReadingRequest request) {
        Reading reading = new Reading(id, request.getValue(), LocalDateTime.now());
        readingRepo.save(reading);

        Sensor sensor = sensorRepo.findById(id).orElseThrow(() -> new RuntimeException("Sensor não encontrado"));
        String status = calculateStatus(id, request.getValue());
        sensor.setStatus(status);
        sensorRepo.save(sensor);

        return reading;
    }

    // 🔧 POST → Realizar manutenção (Resetar health e status)
    @PostMapping("/{id}/maintenance")
    public Sensor performMaintenance(@PathVariable String id) {
        Sensor sensor = sensorRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Sensor não encontrado"));

        sensor.setHealth(100.0);
        sensor.setStatus("OK");
        sensorRepo.save(sensor);

        return sensor;
    }

    // 🔥 Predictive Maintenance (Protótipo de IA)
    @GetMapping("/predict-maintenance")
    public List<Map<String, Object>> predictMaintenance() {
        List<Sensor> sensors = sensorRepo.findAll();

        return sensors.stream().map(sensor -> {
            Map<String, Object> result = new HashMap<>();
            result.put("id", sensor.getId());
            result.put("name", sensor.getName());

            List<Reading> readings = readingRepo.findBySensorIdOrderByTimestampAsc(sensor.getId());

            if (!readings.isEmpty()) {
                Double lastValue = readings.get(readings.size() - 1).getSensorValue();
                String status = calculateStatus(sensor.getId(), lastValue);
                result.put("lastValue", lastValue);
                result.put("status", status);

                if (status.equals("Crítico") || status.equals("Alerta")) {
                    result.put("prediction", "🚨 Alta probabilidade de necessidade de manutenção");
                } else {
                    result.put("prediction", "✅ Funcionamento dentro dos padrões");
                }
            } else {
                result.put("prediction", "⚠️ Sem dados suficientes");
            }

            return result;
        }).collect(Collectors.toList());
    }

    // 🔧 Build response com histórico
    private Map<String, Object> buildSensorResponse(Sensor sensor) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", sensor.getId());
        response.put("name", sensor.getName());
        response.put("unit", sensor.getUnit());
        response.put("health", sensor.getHealth());

        List<Reading> readings = readingRepo.findBySensorIdOrderByTimestampAsc(sensor.getId());

        if (!readings.isEmpty()) {
            Double lastValue = readings.get(readings.size() - 1).getSensorValue();
            response.put("value", lastValue);
            response.put("status", calculateStatus(sensor.getId(), lastValue));
            response.put("history", readings.stream().map(Reading::getSensorValue).collect(Collectors.toList()));
        } else {
            response.put("value", null);
            response.put("status", "Sem Dados");
            response.put("history", Collections.emptyList());
        }

        return response;
    }

    // 🔥 Status calculation
    private String calculateStatus(String sensorId, Double value) {
        if (value == null) return "Sem Dados";

        switch (sensorId) {
            case "1":
                return checkRange(value, 5, 7, 4.5, 7.5);
            case "2":
                return checkMax(value, 20, 25);
            case "3":
                return checkRange(value, 6.5, 8, 6, 8.5);
            case "4":
                return checkMax(value, 0.2, 0.5);
            case "5":
                return checkMax(value, 40, 50);
            case "6":
                return "OK";
            case "7":
                return checkMax(value, 150, 180);
            case "8":
                return checkMax(value, 250, 280);
            default:
                return "Desconhecido";
        }
    }

    private String checkRange(Double value, double minOk, double maxOk, double minAlerta, double maxAlerta) {
        if (value >= minOk && value <= maxOk) return "OK";
        if ((value >= minAlerta && value < minOk) || (value > maxOk && value <= maxAlerta)) return "Alerta";
        return "Crítico";
    }

    private String checkMax(Double value, double maxOk, double maxAlerta) {
        if (value <= maxOk) return "OK";
        if (value <= maxAlerta) return "Alerta";
        return "Crítico";
    }

    // 📨 Classe de request de leitura
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
