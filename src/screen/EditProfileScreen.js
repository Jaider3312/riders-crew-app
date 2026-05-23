import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default function EditProfileScreen({ navigation }) {

  const [usuario, setUsuario] = useState(null);

  const [nombre, setNombre] = useState('');

  const [descripcion, setDescripcion] = useState('');

  const [foto, setFoto] = useState(null);


  useEffect(() => {
    loadProfile();
  }, []);


  const loadProfile = async () => {

    const user = JSON.parse(
      await AsyncStorage.getItem('usuario')
    );

    const response = await api.get(
      `/profile/${user.id}`
    );

    setUsuario(response.data.usuario);

    setNombre(response.data.usuario.nombre);

    setDescripcion(
      response.data.usuario.descripcion || ''
    );

    setFoto(response.data.usuario.foto);
  };


  const pickImage = async () => {

    const result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        quality: 0.5,

        base64: true
      });

    if (!result.canceled) {

      setFoto(
        `data:image/jpeg;base64,${result.assets[0].base64}`
      );
    }
  };


  const saveProfile = async () => {

    try {

      await api.put('/profile', {
        usuario_id: usuario.id,
        nombre,
        descripcion,
        foto
      });

      Alert.alert(
        'Éxito',
        'Perfil actualizado'
      );

      navigation.goBack();

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'No se pudo actualizar'
      );
    }
  };


  return (

    <View style={styles.container}>

      <TouchableOpacity
        style={styles.imageContainer}
        onPress={pickImage}
      >

        <Image
          source={{
            uri:
              foto ||
              'https://cdn-icons-png.flaticon.com/512/149/149071.png'
          }}
          style={styles.image}
        />

      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Descripción"
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveProfile}
      >

        <Text style={styles.buttonText}>
          Guardar cambios
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    paddingTop: 60
  },

  imageContainer: {
    alignSelf: 'center',
    marginBottom: 25
  },

  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#F25C05'
  },

  input: {
    backgroundColor: '#F1F5F9',
    padding: 18,
    borderRadius: 15,
    marginBottom: 20
  },

  button: {
    backgroundColor: '#F25C05',
    padding: 18,
    borderRadius: 15
  },

  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
  }

});