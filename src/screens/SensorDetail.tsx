import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { fetchSensorById, postReading } from '../services/api';
import { Feather } from '@expo/vector-icons';

export default function SensorDetail({ route, navigation }: any) {
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

  if (!sensor) return (
    <View style={styles.container}>
      <Text style={styles.loading}>Carregando...</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{sensor.name}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, sensor.status === 'OK' ? styles.ok : styles.alerta]}>
          {sensor.status}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Último valor registrado:</Text>
        <Text style={styles.value}>
          {sensor.value !== null && sensor.value !== undefined ? sensor.value : '-'}
        </Text>
      </View>

      <View style={styles.historyCard}>
        <Text style={styles.label}>Histórico de Leituras:</Text>
        {sensor.history && sensor.history.length > 0 ? (
          sensor.history.map((v: number, index: number) => (
            <Text key={index} style={styles.historyItem}>
              • {v}
            </Text>
          ))
        ) : (
          <Text style={styles.historyItem}>Nenhuma leitura registrada.</Text>
        )}
      </View>

      <TouchableOpacity style={styles.btnBlue} onPress={handleNovaLeitura}>
        <Feather name="refresh-ccw" size={16} color="#fff" />
        <Text style={styles.btnText}>Gerar Nova Leitura</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={16} color="#0099ff" />
        <Text style={styles.btnBackText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
  ok: { color: 'green' },
  alerta: { color: 'red' },
  historyCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  historyItem: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  btnBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0099ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 12,
  },
  btnText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0099ff',
  },
  btnBackText: {
    color: '#0099ff',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 14,
  },
  loading: {
    fontSize: 16,
    color: '#555',
  },
});
