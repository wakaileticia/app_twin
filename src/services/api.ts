const API_BASE = 'http://localhost:8080/api';

// ======================
// LEITURAS (com valores)
// ======================

export async function fetchSensors() {
  try {
    const res = await fetch(`${API_BASE}/readings`);
    const data = await res.json();

    return data.map((sensor: any) => ({
      id: sensor.id,
      name: sensor.name,
      value: sensor.value,
      status: sensor.status,
      history: sensor.history,
    }));
  } catch (error) {
    console.error('Erro ao buscar sensores:', error);
    return [];
  }
}

export async function fetchSensorById(sensorId: string) {
  try {
    const res = await fetch(`${API_BASE}/readings`);
    const allSensors = await res.json();

    const sensor = allSensors.find((s: any) => s.id === sensorId);
    return sensor || null;
  } catch (error) {
    console.error(`Erro ao buscar sensor ${sensorId}:`, error);
    return null;
  }
}

export async function postReading(sensorId: string, value: number) {
  const body = {
    sensorId,
    sensorValue: value,
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(`${API_BASE}/readings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log(`Leitura postada para sensor ${sensorId}:`, body);
  } catch (error) {
    console.error('Erro ao postar leitura:', error);
  }
}

// ======================
// LOGIN
// ======================

export async function login(username: string, password: string) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();
    console.log('LOGIN RESPONSE:', result);
    return result;
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    return { status: 'fail' };
  }
}
