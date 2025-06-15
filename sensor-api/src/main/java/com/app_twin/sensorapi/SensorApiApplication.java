package com.app_twin.sensorapi;

import com.app_twin.sensorapi.model.Reading;
import com.app_twin.sensorapi.model.Sensor;
import com.app_twin.sensorapi.repository.ReadingRepository;
import com.app_twin.sensorapi.repository.SensorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class SensorApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SensorApiApplication.class, args);
    }

    @Bean
    CommandLineRunner init(ReadingRepository readingRepo, SensorRepository sensorRepo) {
        return args -> {
            // 🔸 Sensores mockados
            sensorRepo.save(new Sensor("1", "Sensor de Pressão", "bar", "OK"));
            sensorRepo.save(new Sensor("2", "Sensor de Fluxo", "L/min", "Alerta"));
            sensorRepo.save(new Sensor("3", "Velocidade do Salto", "mm/s", "OK"));
            sensorRepo.save(new Sensor("4", "Consumo de Ar", "L/min", "OK"));
            sensorRepo.save(new Sensor("5", "Eficiência de Recuperação", "%", "OK"));

            // 🔹 Leituras mockadas
            readingRepo.save(new Reading("1", 6.1, LocalDateTime.now().minusMinutes(3)));
            readingRepo.save(new Reading("1", 6.2, LocalDateTime.now().minusMinutes(2)));
            readingRepo.save(new Reading("1", 6.3, LocalDateTime.now().minusMinutes(1)));

            readingRepo.save(new Reading("2", 41.0, LocalDateTime.now().minusMinutes(3)));
            readingRepo.save(new Reading("2", 42.0, LocalDateTime.now().minusMinutes(2)));
            readingRepo.save(new Reading("2", 39.0, LocalDateTime.now().minusMinutes(1)));

            readingRepo.save(new Reading("3", 140.0, LocalDateTime.now().minusMinutes(3)));
            readingRepo.save(new Reading("3", 145.0, LocalDateTime.now().minusMinutes(2)));
            readingRepo.save(new Reading("3", 150.0, LocalDateTime.now().minusMinutes(1)));

            readingRepo.save(new Reading("4", 20.0, LocalDateTime.now().minusMinutes(3)));
            readingRepo.save(new Reading("4", 22.0, LocalDateTime.now().minusMinutes(2)));
            readingRepo.save(new Reading("4", 23.0, LocalDateTime.now().minusMinutes(1)));

            readingRepo.save(new Reading("5", 78.0, LocalDateTime.now().minusMinutes(3)));
            readingRepo.save(new Reading("5", 80.0, LocalDateTime.now().minusMinutes(2)));
            readingRepo.save(new Reading("5", 81.0, LocalDateTime.now().minusMinutes(1)));
        };
    }
}
