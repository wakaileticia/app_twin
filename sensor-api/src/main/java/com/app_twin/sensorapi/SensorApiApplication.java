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
import java.util.Random;

@SpringBootApplication
public class SensorApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(SensorApiApplication.class, args);
    }

    @Bean
    CommandLineRunner init(ReadingRepository readingRepo, SensorRepository sensorRepo) {
        return args -> {
            Random random = new Random();

            // Cadastro dos sensores com vida útil 100
            sensorRepo.save(new Sensor("1", "Pressão dos Cilindros", "bar", "", 100.0));
            sensorRepo.save(new Sensor("2", "Consumo de Ar", "L/min", "", 100.0));
            sensorRepo.save(new Sensor("3", "Pressão do Reservatório", "bar", "", 100.0));
            sensorRepo.save(new Sensor("4", "Vazamento", "L/min", "", 100.0));
            sensorRepo.save(new Sensor("5", "Temperatura do Ar", "°C", "", 100.0));
            sensorRepo.save(new Sensor("6", "Contador de Ciclos", "ciclos", "", 100.0));
            sensorRepo.save(new Sensor("7", "Velocidade do Atuador", "mm/s", "", 100.0));
            sensorRepo.save(new Sensor("8", "Força do Atuador", "N", "", 100.0));

            // Gerar leituras iniciais simulando
            generateReadings("1", 5.5, 5.0, 7.0, sensorRepo, readingRepo, random);
            generateReadings("2", 18.0, 15.0, 22.0, sensorRepo, readingRepo, random);
            generateReadings("3", 6.8, 6.0, 8.0, sensorRepo, readingRepo, random);
            generateReadings("4", 0.05, 0.0, 0.3, sensorRepo, readingRepo, random);
            generateReadings("5", 32.0, 28.0, 45.0, sensorRepo, readingRepo, random);
            generateReadings("6", 1000, 950, 1200, sensorRepo, readingRepo, random);
            generateReadings("7", 130.0, 100.0, 180.0, sensorRepo, readingRepo, random);
            generateReadings("8", 220.0, 200.0, 270.0, sensorRepo, readingRepo, random);
        };
    }

    private void generateReadings(
            String sensorId,
            double base,
            double min,
            double max,
            SensorRepository sensorRepo,
            ReadingRepository readingRepo,
            Random random
    ) {
        Sensor sensor = sensorRepo.findById(sensorId).orElse(null);
        if (sensor == null) return;

        double health = sensor.getHealth();

        for (int i = 0; i < 3; i++) {
            // Degradação progressiva
            health = Math.max(health - random.nextDouble() * 2, 0); // Diminui até 2% por leitura

            // Quanto menor a health, maior a chance de erro no valor
            double degradationFactor = (100 - health) / 100.0;

            double variation = (random.nextDouble() - 0.5) * (max - min) * 0.1; // variação normal
            double faultChance = random.nextDouble();

            // Simular falha eventual (5% chance)
            if (faultChance < 0.05) {
                variation += (random.nextBoolean() ? 1 : -1) * (max - min) * 0.4;
            }

            // Aplicar degradação
            double degradedValue = base + variation + degradationFactor * (max - min) * (random.nextBoolean() ? 1 : -1);
            double value = clamp(degradedValue, min, max * 1.2); // Permitir ultrapassar limites para simular falha

            readingRepo.save(new Reading(
                    sensorId,
                    value,
                    LocalDateTime.now().minusMinutes(3 - i)
            ));

            String status = calculateStatus(sensorId, value);

            sensor.setStatus(status);
            sensor.setHealth(health);
            sensorRepo.save(sensor);
        }
    }

    private double clamp(double value, double min, double max) {
        return Math.max(min, Math.min(max, value));
    }

    private String calculateStatus(String sensorId, double value) {
        switch (sensorId) {
            case "1": // Pressão dos Cilindros
            case "3": // Pressão do Reservatório
                return (value >= 5 && value <= 7) ? "OK" : (value >= 4.5 && value <= 7.5) ? "Alerta" : "Crítico";

            case "2": // Consumo de Ar
                return (value <= 20) ? "OK" : (value <= 22) ? "Alerta" : "Crítico";

            case "4": // Vazamento
                return (value <= 0.2) ? "OK" : (value <= 0.3) ? "Alerta" : "Crítico";

            case "5": // Temperatura
                return (value <= 40) ? "OK" : (value <= 45) ? "Alerta" : "Crítico";

            case "6": // Ciclos
                return "OK";

            case "7": // Velocidade
                return (value <= 150) ? "OK" : (value <= 180) ? "Alerta" : "Crítico";

            case "8": // Força
                return (value <= 250) ? "OK" : (value <= 270) ? "Alerta" : "Crítico";

            default:
                return "Desconhecido";
        }
    }
}
