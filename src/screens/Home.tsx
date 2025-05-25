import React, { useEffect, useState } from 'react';
import { FlatList, View, Button } from 'react-native';
import { SensorItem } from '../components/SensorItem';
import { fetchSensors, postReading } from '../services/api';

export default function Home() {
  const [sensors, setSensors] = useState<any[]>([]);

  const loadSensors = async () => {
    const data = await fetchSensors();
    console.log('Sensores recebidos no Home:', data); // Debug
    setSensors(data);
  };

  const handleTestLeitura = async () => {
    const randomSensorId = Math.ceil(Math.random() * 5).toString();
    const randomValue = Math.random() * 100;
    await postReading(randomSensorId, Number(randomValue.toFixed(2)));
    await loadSensors();
  };

  useEffect(() => {
    loadSensors();
  }, []);

  return (
    <View>
      <Button title="ENVIAR LEITURA ALEATÓRIA" onPress={handleTestLeitura} />
      <FlatList
        data={sensors}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SensorItem
            id={item.id}
            name={item.name}
            value={item.value}
            status={item.status}
          />
        )}
      />
    </View>
  );
}
