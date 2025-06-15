package com.app_twin.sensorapi.controller;

import com.app_twin.sensorapi.model.Reading;
import com.app_twin.sensorapi.repository.ReadingRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/readings")
@CrossOrigin(origins = "*")
public class ReadingController {

    private final ReadingRepository repository;

    public ReadingController(ReadingRepository repository) {
        this.repository = repository;
    }

    // 🔥 GET → Lista TODAS as leituras (Entrega 2)
    @GetMapping
    public List<Reading> getAllReadings() {
        return repository.findAll();
    }

    // 🔥 GET → Lista as leituras de um sensor específico
    @GetMapping("/{sensorId}")
    public List<Reading> getReadingsBySensor(@PathVariable String sensorId) {
        return repository.findBySensorIdOrderByTimestampAsc(sensorId);
    }

    // 🔥 POST → Adiciona uma nova leitura para um sensor
    @PostMapping("/{sensorId}")
    public Reading addReading(
            @PathVariable String sensorId,
            @RequestBody ReadingRequest request
    ) {
        if (request.getValue() == null) {
            throw new IllegalArgumentException("O valor da leitura não pode ser nulo.");
        }

        Reading reading = new Reading(
                sensorId,
                request.getValue(),
                LocalDateTime.now()
        );

        return repository.save(reading);
    }

    // 🔸 Classe interna para o corpo da requisição
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
