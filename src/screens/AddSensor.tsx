import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createSensor } from '../services/api';

export default function AddSensor() {
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');

  const handleAdd = async () => {
    if (!name.trim() || !unit.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos corretamente');
      return;
    }

    const newSensor = {
      id: Date.now().toString(),
      name,
      unit,
      status: 'OK',
    };

    await createSensor(newSensor);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Novo Sensor</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Nome do Sensor"
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Unidade (ex: %, bar, L/min)"
          style={styles.input}
          value={unit}
          onChangeText={setUnit}
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Adicionar Sensor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007aff',
    marginBottom: 32,
    alignSelf: 'center',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  button: {
    backgroundColor: '#007aff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
