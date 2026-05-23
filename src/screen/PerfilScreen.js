import React, {
  useEffect,
  useState
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default function PerfilScreen({ navigation }) {

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);


  // =========================================
  // CARGAR PERFIL
  // =========================================

  const loadProfile = async () => {

    try {

      const user = JSON.parse(
        await AsyncStorage.getItem('usuario')
      );

      const response = await api.get(
        `/profile/${user.id}`
      );

      setUsuario(response.data.usuario);

    } catch (error) {

      console.log(error);
    }
  };


  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = async () => {

    await AsyncStorage.removeItem('token');

    await AsyncStorage.removeItem('usuario');

    navigation.replace('Login');
  };


  return (

    <SafeAreaView style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ========================================= */}
        {/* CABECERA */}
        {/* ========================================= */}

        <View style={styles.profileHeader}>

          <View style={styles.imageContainer}>

            <Image
              source={{
                uri:
                  usuario?.foto ||
                  'https://cdn-icons-png.flaticon.com/512/149/149071.png'
              }}
              style={styles.profileImage}
            />

            <TouchableOpacity
              style={styles.editBadge}
              onPress={() =>
                navigation.navigate('EditProfile')
              }
            >

              <Ionicons
                name="camera"
                size={20}
                color="#FFF"
              />

            </TouchableOpacity>

          </View>

          <Text style={styles.userName}>
            {usuario?.nombre || 'Usuario'}
          </Text>

          <Text style={styles.userBio}>
            {
              usuario?.descripcion ||
              'Rider de corazón 🏍️'
            }
          </Text>

        </View>


        {/* ========================================= */}
        {/* ESTADISTICAS */}
        {/* ========================================= */}

        <View style={styles.statsContainer}>

          <View style={styles.statBox}>

            <Text style={styles.statNumber}>
              12
            </Text>

            <Text style={styles.statLabel}>
              Rodadas
            </Text>

          </View>

          <View style={[
            styles.statBox,
            styles.borderSides
          ]}>

            <Text style={styles.statNumber}>
              4
            </Text>

            <Text style={styles.statLabel}>
              Crews
            </Text>

          </View>

          <View style={styles.statBox}>

            <Text style={styles.statNumber}>
              1.5k
            </Text>

            <Text style={styles.statLabel}>
              Km
            </Text>

          </View>

        </View>


        {/* ========================================= */}
        {/* MENU */}
        {/* ========================================= */}

        <View style={styles.menuContainer}>


          {/* EDITAR PERFIL */}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate('EditProfile')
            }
          >

            <Ionicons
              name="person-outline"
              size={24}
              color="#1A2E44"
            />

            <Text style={styles.menuText}>
              Editar Perfil
            </Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#94A3B8"
            />

          </TouchableOpacity>


          {/* CONFIGURACION */}

          <TouchableOpacity style={styles.menuItem}>

            <Ionicons
              name="settings-outline"
              size={24}
              color="#1A2E44"
            />

            <Text style={styles.menuText}>
              Configuración
            </Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#94A3B8"
            />

          </TouchableOpacity>


          {/* LOGOUT */}

          <TouchableOpacity
            style={[
              styles.menuItem,
              styles.logoutItem
            ]}
            onPress={handleLogout}
          >

            <Ionicons
              name="log-out-outline"
              size={24}
              color="#EF4444"
            />

            <Text style={[
              styles.menuText,
              styles.logoutText
            ]}>
              Cerrar Sesión
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30
  },

  imageContainer: {
    position: 'relative',
    marginBottom: 15
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#F25C05'
  },

  editBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#F25C05',
    padding: 8,
    borderRadius: 20,
    elevation: 5
  },

  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A2E44'
  },

  userBio: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 20
  },

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 20
  },

  statBox: {
    flex: 1,
    alignItems: 'center'
  },

  borderSides: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E2E8F0'
  },

  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A2E44'
  },

  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2
  },

  menuContainer: {
    marginTop: 30,
    paddingHorizontal: 20
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },

  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#1A2E44'
  },

  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 10
  },

  logoutText: {
    color: '#EF4444',
    fontWeight: 'bold'
  }

});