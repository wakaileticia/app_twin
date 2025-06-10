import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchSensorById, postReading } from '../services/api';

export default function SensorDetail({ route }: any) {
  const { id } = route.params;
  const [sensor, setSensor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const loadSensor = async () => {
    setLoading(true);
    const data = await fetchSensorById(id);
    setSensor(data);
    setLoading(false);
  };

  const handleNovaLeitura = async () => {
    setPosting(true);
    const novaLeitura = Number((Math.random() * 100).toFixed(2));
    await postReading(id, novaLeitura);
    await loadSensor();
    setPosting(false);
  };

  useEffect(() => {
    loadSensor();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!sensor) {
    return <Text style={styles.loading}>Erro ao carregar sensor.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sensor.name}</Text>
      <Text style={styles.status}>Status: {sensor.status || '-'}</Text>

      <Text style={styles.valueLabel}>Valor atual:</Text>
      <Text style={styles.value}>{sensor.value || '-'}</Text>

      <Text style={styles.historyTitle}>Histórico de Leituras:</Text>
      <FlatList
        data={(sensor.history || []).slice().reverse()}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>• {item}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.button} onPress={handleNovaLeitura} disabled={posting}>
        <Text style={styles.buttonText}>
          {posting ? 'Enviando...' : 'Gerar Nova Leitura'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  loading: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
  },
  valueLabel: {
    fontSize: 16,
    color: '#777',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  historyItem: {
    fontSize: 16,
    marginBottom: 4,
    color: '#444',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
