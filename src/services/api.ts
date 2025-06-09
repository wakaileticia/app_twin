const API_BASE = 'http://localhost:8080/api';

// ======================
// SENSORES (CRUD)
// ======================

export async function getSensors() {
  try {
    const res = await fetch(`${API_BASE}/sensors`);
    return await res.json();
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
// LEITURAS
// ======================

export async function fetchSensors() {
  try {
    const res = await fetch(`${API_BASE}/readings`);
    const data = await res.json();

    console.log('Resposta da API (sensors):', data);
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
    const res = await fetch(`${API_BASE}/readings/${sensorId}`);
    const data = await res.json();

    return {
      id: data.sensorId,
      name: data.sensorId,
      value: data.sensorValue,
      status: 'OK',
      history: [data.sensorValue],
    };
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
