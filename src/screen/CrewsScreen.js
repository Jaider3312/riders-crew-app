import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function CrewsScreen() {

  const [crews, setCrews] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadCrews();
  }, []);

  const loadCrews = async (text = '') => {

    try {

      const response = await api.get(
        `/crews?search=${text}`
      );

      setCrews(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const joinCrew = async (crewId) => {

    try {

      const usuario = JSON.parse(
        await AsyncStorage.getItem('usuario')
      );

      await api.post('/crews/join', {
        usuario_id: usuario.id,
        crew_id: crewId
      });

      Alert.alert(
        'Éxito',
        'Solicitud enviada'
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.search}
        placeholder="Buscar crew"
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          loadCrews(text);
        }}
      />

      <FlatList
        data={crews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.name}>
              {item.nombre}
            </Text>

            <Text style={styles.description}>
              {item.descripcion}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => joinCrew(item.id)}
            >
              <Text style={styles.buttonText}>
                Unirse
              </Text>
            </TouchableOpacity>

          </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  search: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18
  },
  description: {
    marginVertical: 10
  },
  button: {
    backgroundColor: '#F25C05',
    padding: 12,
    borderRadius: 10
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});