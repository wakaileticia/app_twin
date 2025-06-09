package com.app_twin.sensorapi.controller;

import com.app_twin.sensorapi.model.Sensor;
import com.app_twin.sensorapi.repository.SensorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sensors")
@CrossOrigin(origins = "*")
public class SensorController {

    private final SensorRepository repository;

    public SensorController(SensorRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Sensor> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Sensor create(@RequestBody Sensor sensor) {
        return repository.save(sensor);
    }

    @PutMapping("/{id}")
    public Sensor update(@PathVariable String id, @RequestBody Sensor sensor) {
        sensor.setId(id);
        return repository.save(sensor);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        repository.deleteById(id);
    }
}
