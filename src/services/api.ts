const API_BASE = 'http://localhost:8080/api'; // Use 10.0.2.2 se estiver no emulador Android

export async function fetchSensors() {
  const res = await fetch(`${API_BASE}/readings`);
  const data = await res.json();

  console.log('Resposta da API (sensors):', data);
  return data.map((sensor: any) => ({
    id: sensor.id,
    name: sensor.name,
    value: sensor.value,
    status: sensor.status,
    history: sensor.history
  }));
}

export async function fetchSensorById(sensorId: string) {
  const res = await fetch(`${API_BASE}/readings/${sensorId}`);
  const data = await res.json();

  return {
    id: data.sensorId,
    name: data.sensorId,
    value: data.sensorValue,
    status: 'OK',
    history: [data.sensorValue]
  };
}

export async function postReading(sensorId: string, value: number) {
  const body = {
    sensorId,
    sensorValue: value,
    timestamp: new Date().toISOString()
  };

  await fetch(`${API_BASE}/readings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  return await res.json();
}
