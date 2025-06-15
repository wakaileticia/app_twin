import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchPredictMaintenance } from '../services/api';

export default function PredictMaintenance() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const loadData = async () => {
    setLoading(true);
    const response = await fetchPredictMaintenance();
    setData(response);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.label}>Status: <Text style={[
        styles.value,
        item.status === 'OK' ? styles.ok : item.status === 'Alerta' ? styles.alerta : styles.critico
      ]}>{item.status}</Text></Text>
      <Text style={styles.label}>Último Valor: <Text style={styles.value}>{item.lastValue ?? '-'}</Text></Text>
      <Text style={styles.label}>🔧 {item.prediction}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadData} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 12,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  label: {
    color: '#555',
    fontSize: 14,
    marginTop: 4,
  },
  value: {
    fontWeight: 'bold',
    color: '#333',
  },
  ok: {
    color: 'green',
  },
  alerta: {
    color: 'orange',
  },
  critico: {
    color: 'red',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#0099ff',
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
