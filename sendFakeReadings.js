const fetch = require('node-fetch');

// Sensores com suas faixas realistas
const sensors = [
  { id: '1', name: 'Sensor de Pressão', min: 4.0, max: 6.5 },
  { id: '2', name: 'Sensor de Fluxo', min: 30, max: 80 },
  { id: '3', name: 'Velocidade do Salto', min: 800, max: 2000 },
  { id: '4', name: 'Consumo de Ar', min: 40, max: 120 },
  { id: '5', name: 'Eficiência de Recuperação', min: 65, max: 100 }
];

const API_URL = 'http://localhost:8080/api/readings';

async function sendReading(sensorId, value) {
  const body = {
    sensorId,
    sensorValue: value,
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar leitura: ${response.status}`);
    }

    console.log(`✅ Leitura enviada para sensor ${sensorId}: ${value}`);
  } catch (err) {
    console.error(`❌ Erro ao enviar para ${sensorId}:`, err.message);
  }
}

function getRandomInRange(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

async function sendAllFakeReadings() {
  for (const sensor of sensors) {
    const value = getRandomInRange(sensor.min, sensor.max);
    await sendReading(sensor.id, value);
  }
}

sendAllFakeReadings();
