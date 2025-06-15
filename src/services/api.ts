const API_BASE = 'http://localhost:8080/api';

// ======================
// SENSORES (GET, POST, PUT, DELETE)
// ======================

export async function getSensors() {
  try {
    const res = await fetch(`${API_BASE}/sensors`);
    const data = await res.json();

    return data.map((sensor: any) => ({
      id: sensor.id,
      name: sensor.name,
      unit: sensor.unit,
      status: sensor.status,
      value: sensor.value,
      history: sensor.history,
    }));
  } catch (error) {
    console.error('Erro ao buscar sensores:', error);
    return [];
  }
}

export async function createSensor(sensor: {
  id: string;
  name: string;
  unit: string;
  status: string;
}) {
  try {
    const res = await fetch(`${API_BASE}/sensors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sensor),
    });
    return await res.json();
  } catch (error) {
    console.error('Erro ao criar sensor:', error);
  }
}

export async function updateSensor(id: string, sensor: {
  name: string;
  unit: string;
  status: string;
}) {
  try {
    const res = await fetch(`${API_BASE}/sensors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sensor),
    });
    return await res.json();
  } catch (error) {
    console.error(`Erro ao atualizar sensor ${id}:`, error);
  }
}

export async function deleteSensor(id: string) {
  try {
    await fetch(`${API_BASE}/sensors/${id}`, { method: 'DELETE' });
  } catch (error) {
    console.error(`Erro ao deletar sensor ${id}:`, error);
  }
}

// ======================
// LEITURAS (READINGS)
// ======================

export async function fetchSensorById(sensorId: string) {
  try {
    const res = await fetch(`${API_BASE}/sensors/${sensorId}`);
    const data = await res.json();

    return {
      id: data.id,
      name: data.name,
      unit: data.unit,
      status: data.status,
      history: data.history,
      value: data.value,
    };
  } catch (error) {
    console.error(`Erro ao buscar detalhes do sensor ${sensorId}:`, error);
    return null;
  }
}

export async function postReading(sensorId: string, value: number) {
  try {
    await fetch(`${API_BASE}/sensors/${sensorId}/readings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });
    console.log(`Leitura postada para sensor ${sensorId}:`, value);
  } catch (error) {
    console.error('Erro ao postar leitura:', error);
  }
}

// ======================
// LOGIN (MOCK)
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
