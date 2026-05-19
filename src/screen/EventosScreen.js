import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps'; // Importamos el mapa y el pin

export default function EventosScreen() {
  // Coordenadas para Bogotá (Punto de encuentro cerca a la Calle 80)
  const puntoEncuentro = {
    latitude: 4.6961,
    longitude: -74.0865,
    latitudeDelta: 0.05, // Qué tan cerca está el zoom (latitud)
    longitudeDelta: 0.05, // Qué tan cerca está el zoom (longitud)
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Rodadas Activas</Text>

      {/* Contenedor del Mapa */}
      <View style={styles.mapContainer}>
        <MapView 
          style={styles.map}
          initialRegion={puntoEncuentro}
        >
          {/* El Pin rojo en el mapa */}
          <Marker 
            coordinate={{ latitude: 4.6961, longitude: -74.0865 }}
            title="Salida Nocturna"
            description="Punto de encuentro: Calle 80"
          />
        </MapView>
      </View>

      <Text style={styles.sectionTitle}>Próximos Eventos</Text>

      {/* Tarjeta del evento que ya tenías diseñada */}
      <View style={styles.card}>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>24 ABR</Text>
        </View>
        <Text style={styles.cardTitle}>Salida Nocturna Calle 80</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A2E44',
    padding: 20,
  },
  mapContainer: {
    height: 250, // Altura del mapa
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden', // Esto es clave para que las esquinas del mapa se vean redondas
    marginBottom: 20,
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dateBox: {
    backgroundColor: '#F25C05', // Naranja de tu diseño
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 15,
  },
  dateText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  }
});