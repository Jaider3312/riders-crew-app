import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import api from '../services/api';

export default function RegisterScreen({ navigation }) {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {

    if (!nombre || !correo || !password) {

      Alert.alert(
        'Error',
        'Completa todos los campos'
      );

      return;
    }

    try {

      const response = await api.post('/auth/register', {
        nombre,
        correo,
        password
      });

      if (response.data.success) {

        Alert.alert(
          'Éxito',
          'Usuario creado correctamente'
        );

        navigation.goBack();

      } else {

        Alert.alert(
          'Error',
          response.data.message
        );
      }

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'No se pudo crear el usuario'
      );
    }
  };

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.logoContainer}>

        <View style={styles.logoCircle}>

          <Ionicons
            name="bicycle"
            size={55}
            color="#FFF"
          />

        </View>

        <Text style={styles.title}>
          Riders Crew
        </Text>

        <Text style={styles.subtitle}>
          Crea tu cuenta y empieza a rodar
        </Text>

      </View>

      <View style={styles.formContainer}>

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
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
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>
            Crear cuenta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.loginText}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    padding: 25
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40
  },

  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: '#F25C05',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 6
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1A2E44'
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: '#64748B'
  },

  formContainer: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 25,
    elevation: 5
  },

  input: {
    backgroundColor: '#F1F5F9',
    padding: 18,
    borderRadius: 15,
    marginBottom: 18,
    fontSize: 15
  },

  button: {
    backgroundColor: '#F25C05',
    padding: 18,
    borderRadius: 15,
    marginTop: 10
  },

  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },

  loginText: {
    textAlign: 'center',
    marginTop: 25,
    color: '#F25C05',
    fontWeight: 'bold'
  }

});