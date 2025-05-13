import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SensorItem } from '../components/SensorItem';
import { fetchSensors } from '../services/api';

export default function Home() {
    const [sensors, setSensors] = useState<any[]>([]);

    const loadSensors = async () => {
        const data = await fetchSensors();
        setSensors(data);
    };

    useEffect(() => {
        loadSensors();
    }, []);

    return (
        <View>
            <FlatList
                data={sensors}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SensorItem
                        id={item.id}
                        name={item.name}
                        value={item.value}
                        status={item.status}
                    />
                )}
            />
        </View>
    );
}
