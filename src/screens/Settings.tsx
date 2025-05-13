import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function Settings() {
    const [url, setUrl] = useState('');

    return (
        <View style={{ padding: 16 }}>
            <Text>URL da API</Text>
            <TextInput
                value={url}
                onChangeText={setUrl}
                placeholder="http://localhost:3000"
                style={{
                    borderWidth: 1,
                    padding: 8,
                    marginBottom: 16,
                }}
            />
            <Button title="Salvar" onPress={() => console.log('URL salva:', url)} />
        </View>
    );
}
