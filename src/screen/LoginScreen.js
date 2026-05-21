import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function LoginScreen({ navigation }) {

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    try {

      const response = await api.post('/auth/login', {
        correo,
        password
      });

      if (response.data.success) {

        await AsyncStorage.setItem(
          'usuario',
          JSON.stringify(response.data.usuario)
        );

        await AsyncStorage.setItem(
          'token',
          response.data.token
        );

        navigation.replace('Main');

      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Iniciar sesión
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#F25C05',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});