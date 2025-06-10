import React from 'react';
import { FlatList, View, StyleSheet, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SensorItem } from '../components/SensorItem';
import { fetchSensors, postReading } from '../services/api'; // <- usar apenas funções de leitura com valores

export default function Home() {
  const [sensors, setSensors] = React.useState<any[]>([]);
  const navigation = useNavigation<any>();

  const loadSensors = async () => {
    const data = await fetchSensors(); // <- função correta com valores
    setSensors(data);
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
        numColumns={2}
        renderItem={({ item }) => (
          <SensorItem
            id={item.id}
            name={item.name}
            value={item.value}
            status={item.status}
            onDelete={() => {}} // <- Sem delete por enquanto
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
