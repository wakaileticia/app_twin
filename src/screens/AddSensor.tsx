import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createSensor } from '../services/api';

export default function AddSensor() {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');

  const handleAdd = async () => {
    if (!name || !unit) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const newSensor = {
      id: Date.now().toString(),
      name,
      unit,
      status: 'OK',
    };

    await createSensor(newSensor);
    navigation.navigate('Home', { reload: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Sensor</Text>
      <TextInput
        placeholder="Nome do sensor"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Unidade (ex: %, bar, L/min)"
        style={styles.input}
        value={unit}
        onChangeText={setUnit}
      />
      <Button title="Adicionar Sensor" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
