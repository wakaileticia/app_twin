import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SensorItem } from '../components/SensorItem';
import { getSensors, deleteSensor, postReading } from '../services/api';

export default function Home() {
  const [sensors, setSensors] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  const loadSensors = async () => {
    const data = await getSensors();
    setSensors(data);
  };

  const handleDelete = async (sensorId: string) => {
    await deleteSensor(sensorId);
    await loadSensors();
  };

  const handleAlterarLeitura = async (sensorId: string) => {
    const novoValor = Math.random() * 100;
    await postReading(sensorId, Number(novoValor.toFixed(2)));
    await loadSensors();
  };

  useFocusEffect(
    React.useCallback(() => {
      loadSensors();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Button title="Novo Sensor" onPress={() => navigation.navigate('AddSensor')} />

      <FlatList
        data={sensors}
        keyExtractor={(item) => item.id}
        numColumns={2} // <- grade com duas colunas
        renderItem={({ item }) => (
          <SensorItem
            id={item.id}
            name={item.name}
            value={'-'}
            status={item.status}
            onDelete={() => handleDelete(item.id)}
            onAlterar={() => handleAlterarLeitura(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: '#f9f9f9',
  },
  list: {
    paddingBottom: 20,
    gap: 8,
    justifyContent: 'space-between',
  },
});
