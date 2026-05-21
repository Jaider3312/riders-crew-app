import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';

import api from '../services/api';

export default function FeedScreen() {

  const [posts, setPosts] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [contenido, setContenido] = useState('');

  const [imagen, setImagen] = useState(null);

  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState({});

  useEffect(() => {
    loadPosts();
    const loadComments = async (postId) => {

  try {

    const response = await api.get(
      `/posts/${postId}/comments`
    );

    setComentarios(prev => ({
      ...prev,
      [postId]: response.data
    }));

  } catch (error) {
    console.log(error);
  }
};
  }, []);

  // =========================================
  // CARGAR POSTS
  // =========================================

  const loadPosts = async () => {

    try {

      const response = await api.get('/posts');

      setPosts(response.data);

response.data.forEach(post => {
  loadComments(post.id);
});

    } catch (error) {
      console.log(error);
    }
  };
const loadComments = async (postId) => {

  try {

    const response = await api.get(
      `/posts/${postId}/comments`
    );

    setComentarios(prev => ({
      ...prev,
      [postId]: response.data
    }));

  } catch (error) {
    console.log(error);
  }
};
  // =========================================
  // SELECCIONAR IMAGEN
  // =========================================

  const pickImage = async () => {

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert('Se necesitan permisos para acceder a las fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (!result.canceled) {

      setImagen(result.assets[0].uri);

    }
  };

  // =========================================
  // CREAR POST
  // =========================================

  const createPost = async () => {

    try {

      const usuario = JSON.parse(
        await AsyncStorage.getItem('usuario')
      );

      await api.post('/posts', {
        usuario_id: usuario.id,
        contenido,
        imagen
      });

      setContenido('');
      setImagen(null);

      setModalVisible(false);

      loadPosts();

    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // DAR LIKE
  // =========================================

  const likePost = async (postId) => {

    try {

      await api.post(`/posts/${postId}/like`);

      loadPosts();

    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // COMENTAR
  // =========================================

  const comentarPost = async (postId) => {

    try {

      const usuario = JSON.parse(
        await AsyncStorage.getItem('usuario')
      );

      await api.post('/posts/comment', {
        publicacion_id: postId,
        usuario_id: usuario.id,
        comentario
      });

      setComentario('');

loadComments(postId);

    } catch (error) {
      console.log(error);
    }
  };

  // =========================================
  // RENDER POST
  // =========================================

  const renderItem = ({ item }) => (

    <View style={styles.card}>

      {/* Usuario */}
      <Text style={styles.user}>
        {item.usuario_nombre}
      </Text>

      {/* Contenido */}
      <Text style={styles.content}>
        {item.contenido}
      </Text>

      {/* Imagen */}
      {
        item.imagen &&
        <Image
          source={{ uri: item.imagen }}
          style={styles.postImage}
        />
      }

      {/* Likes */}
      <View style={styles.actions}>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => likePost(item.id)}
        >
          <Ionicons
            name="heart"
            size={22}
            color="red"
          />

          <Text style={styles.likeText}>
            {item.likes}
          </Text>

        </TouchableOpacity>

      </View>

      {/* Comentarios */}
      {/* LISTA COMENTARIOS */}

{
  comentarios[item.id]?.map((comentario) => (

    <View
      key={comentario.id}
      style={styles.commentBox}
    >

      <Text style={styles.commentUser}>
        {comentario.usuario}
      </Text>

      <Text style={styles.commentText}>
        {comentario.comentario}
      </Text>

    </View>

  ))
}
      <View style={styles.commentSection}>

        <TextInput
          placeholder="Escribe un comentario"
          style={styles.commentInput}
          value={comentario}
          onChangeText={setComentario}
        />

        <TouchableOpacity
          onPress={() => comentarPost(item.id)}
        >
          <Ionicons
            name="send"
            size={24}
            color="#F25C05"
          />
        </TouchableOpacity>

      </View>

    </View>
  );

  // =========================================
  // RETURN
  // =========================================

  return (

    <View style={styles.container}>

      {/* LISTA POSTS */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 100
        }}
      />

      {/* BOTON FLOTANTE */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons
          name="add"
          size={32}
          color="#FFF"
        />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
      >

        <ScrollView style={styles.modalContainer}>

          <Text style={styles.modalTitle}>
            Nueva publicación
          </Text>

          <TextInput
            placeholder="¿Qué estás pensando?"
            multiline
            style={styles.input}
            value={contenido}
            onChangeText={setContenido}
          />

          {/* Preview imagen */}
          {
            imagen &&
            <Image
              source={{ uri: imagen }}
              style={styles.preview}
            />
          }

          {/* Botón seleccionar imagen */}
          <TouchableOpacity
            style={styles.imageBtn}
            onPress={pickImage}
          >
            <Text style={styles.imageBtnText}>
              Seleccionar imagen
            </Text>
          </TouchableOpacity>

          {/* Botón publicar */}
          <TouchableOpacity
            style={styles.publishBtn}
            onPress={createPost}
          >
            <Text style={styles.publishText}>
              Publicar
            </Text>
          </TouchableOpacity>

          {/* Botón cerrar */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>
              Cancelar
            </Text>
          </TouchableOpacity>

        </ScrollView>

      </Modal>

    </View>
  );
}

// =========================================
// ESTILOS
// =========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },

  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 15,
    padding: 15,
    elevation: 2
  },

  user: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#1A2E44'
  },

  content: {
    fontSize: 15,
    color: '#333',
    marginBottom: 15
  },

  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 15
  },

  actions: {
    flexDirection: 'row',
    marginBottom: 15
  },

  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  likeText: {
    marginLeft: 5,
    fontWeight: 'bold'
  },

  commentSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentBox: {
  backgroundColor: '#F8FAFC',
  padding: 10,
  borderRadius: 10,
  marginBottom: 10
},

commentUser: {
  fontWeight: 'bold',
  color: '#1A2E44',
  marginBottom: 3
},

commentText: {
  color: '#333'
},

  commentInput: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10
  },

  fab: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: '#F25C05',
    width: 65,
    height: 65,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },

  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF'
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A2E44'
  },

  input: {
    backgroundColor: '#F1F5F9',
    minHeight: 120,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    textAlignVertical: 'top'
  },

  imageBtn: {
    backgroundColor: '#1A2E44',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },

  imageBtnText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  preview: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20
  },

  publishBtn: {
    backgroundColor: '#F25C05',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },

  publishText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  closeBtn: {
    backgroundColor: '#E2E8F0',
    padding: 15,
    borderRadius: 12
  },

  closeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1A2E44'
  }

});