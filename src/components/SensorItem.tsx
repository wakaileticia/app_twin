import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  id: string;
  name: string;
  value: string;
  status: string;
};

export const SensorItem = ({ id, name, value, status }: Props) => {
  const navigation = useNavigation<any>();

  const getIcon = (name: string) => {
    if (name.includes('Pressão')) return 'gauge';
    if (name.includes('Fluxo')) return 'water-pump';
    if (name.includes('Temperatura')) return 'thermometer';
    if (name.includes('Consumo')) return 'gas-cylinder';
    if (name.includes('Eficiência')) return 'chart-line';
    if (name.includes('Velocidade')) return 'speedometer';
    return 'chip';
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('SensorDetail', { id })}
    >
      <MaterialCommunityIcons
        name={getIcon(name)}
        size={32}
        color="#007aff"
        style={styles.icon}
      />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text>{value}</Text>
        <Text style={{ color: status === 'OK' ? 'green' : 'red' }}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
