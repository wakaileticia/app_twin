import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';

export default function Detalhes() {
    const route = useRoute();
    const { maquina } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{maquina.nome}</Text>
            <Text>Status: {maquina.status}</Text>
            <Text>Última Manutenção: {maquina.ultimaManutencao}</Text>
            <Text>Probabilidade de Falha: {maquina.probabilidadeFalha}%</Text>
        </View>
    );
}
