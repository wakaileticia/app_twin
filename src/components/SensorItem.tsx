import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Props = {
  id: string;
  name: string;
  value: string;
  status: string;
  onAlterar: () => void;
  onDelete: () => void;
};

export const SensorItem = ({ id, name, value, status, onAlterar, onDelete }: Props) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('SensorDetail', { id });
  };

  const handleAlterar = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onAlterar();
  };

  const handleDelete = (event: GestureResponderEvent) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {name || 'Sensor'}
      </Text>
      <Text style={styles.value}>Valor: {value || '-'}</Text>
      <Text style={[styles.status, status === 'OK' ? styles.ok : styles.alerta]}>
        Status: {status || '-'}
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnBlue} onPress={handleAlterar}>
          <Feather name="edit" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRed} onPress={handleDelete}>
          <Feather name="trash-2" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '48%',
    minHeight: 140,
    borderRadius: 12,
    padding: 10,
    margin: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    marginBottom: 2,
  },
  status: {
    fontSize: 12,
    marginBottom: 8,
  },
  ok: { color: 'green' },
  alerta: { color: 'red' },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  btnBlue: {
    backgroundColor: '#007aff',
    padding: 6,
    borderRadius: 6,
  },
  btnRed: {
    backgroundColor: '#ff3b30',
    padding: 6,
    borderRadius: 6,
  },
});
