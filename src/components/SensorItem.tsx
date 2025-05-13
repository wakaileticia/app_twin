import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
    id: string;
    name: string;
    value: string;
    status: string;
};

export const SensorItem = ({ id, name, value, status }: Props) => {
    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('SensorDetail', { id })}
        >
            <Text style={styles.name}>{name}</Text>
            <Text>{value}</Text>
            <Text style={{ color: status === 'OK' ? 'green' : 'red' }}>{status}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
