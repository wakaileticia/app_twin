import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login } from '../services/api';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      console.log('Resposta do backend:', data);

      if (!data || data.status !== 'success') {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return;
      }

      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Erro de conexão:', error);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FESTO</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Login"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          editable={!showError}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputWrapper}>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Senha"
            style={styles.inputPassword}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!showError}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowPassword(!showPassword)}
            disabled={showError}
          >
            <Text style={styles.toggleIcon}>
              {showPassword ? '👁️‍🗨️' : '👁️'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, showError && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={showError}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {showError && (
        <View style={styles.overlay}>
          <Image
            source={require('../../assets/erro.png')}
            style={styles.errorImage}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 36,
    color: '#0099ff',
    fontWeight: 'bold',
    marginBottom: 40,
    letterSpacing: 2,
  },
  inputWrapper: {
    width: 300,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  passwordContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12,
  },
  toggleButton: {
    paddingHorizontal: 10,
  },
  toggleIcon: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#0099ff',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginTop: 10,
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
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
