import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { fetchSensorById, postReading } from '../services/api';

export default function SensorDetail({ route }: any) {
  const { id } = route.params;
  const [sensor, setSensor] = useState<any>(null);

  const loadSensor = async () => {
    const data = await fetchSensorById(id);
    setSensor(data);
  };

  const handleNovaLeitura = async () => {
    const novaLeitura = Number((Math.random() * 100).toFixed(2));
    await postReading(id, novaLeitura);
    await loadSensor();
  };

  useEffect(() => {
    loadSensor();
  }, []);

  if (!sensor) return <Text>Carregando...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{sensor.name}</Text>
      <Text>Status: {sensor.status}</Text>
      <Text>Histórico:</Text>
      {sensor.history.map((v: number, index: number) => (
        <Text key={index}>• {v}</Text>
      ))}
      <Button title="Atualizar valor" onPress={handleNovaLeitura} />
    </View>
  );
}
