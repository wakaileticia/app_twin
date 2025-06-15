import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Props = {
  id: string;
  name: string;
  value: string | number | null;
  status: string;
  onAlterar: () => void;
  onDelete: () => void;
};

export const SensorItem = ({ id, name, value, status, onAlterar, onDelete }: Props) => {
  const navigation = useNavigation<any>();

  const handleOpenDetails = () => {
    navigation.navigate('SensorDetail', { id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleOpenDetails} activeOpacity={0.9}>
      <View>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>

        <Text style={styles.value}>
          Valor: {value !== null && value !== undefined ? value : '-'}
        </Text>

        <Text style={[styles.status, status === 'OK' ? styles.ok : styles.alerta]}>
          Status: {status}
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnBlue} onPress={(e) => { e.stopPropagation(); onAlterar(); }}>
          <Feather name="edit" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRed} onPress={(e) => { e.stopPropagation(); onDelete(); }}>
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
    minHeight: 150,
    borderRadius: 16,
    padding: 12,
    margin: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 6,
    color: '#333',
  },
  value: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },
  status: {
    fontSize: 13,
    marginBottom: 8,
  },
  ok: { color: 'green' },
  alerta: { color: 'red' },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  btnBlue: {
    backgroundColor: '#007aff',
    padding: 8,
    borderRadius: 8,
  },
  btnRed: {
    backgroundColor: '#ff3b30',
    padding: 8,
    borderRadius: 8,
  },
});
