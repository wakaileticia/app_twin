import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SensorItem } from '../components/SensorItem';
import { getSensors, deleteSensor, postReading } from '../services/api';
import { Feather } from '@expo/vector-icons';

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
      <FlatList
        data={sensors}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <SensorItem
            id={item.id}
            name={item.name}
            value={item.value ?? '-'}
            status={item.status}
            onDelete={() => handleDelete(item.id)}
            onAlterar={() => handleAlterarLeitura(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
      />

      {/* Botão adicionar sensor */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddSensor')}
      >
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Botão manutenção geral */}
      <TouchableOpacity
        style={styles.maintenanceButton}
        onPress={() => navigation.navigate('PredictMaintenance')}
      >
        <Feather name="tool" size={22} color="#fff" />
      </TouchableOpacity>
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
    paddingBottom: 100,
    gap: 8,
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#007aff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  maintenanceButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    backgroundColor: '#28a745',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
