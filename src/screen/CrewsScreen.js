import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const CREWS_DATA = [
  {
    id: '1',
    name: 'Ruta Motera Bogotá',
    members: '1.2k miembros',
    image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=400', 
  },
  {
    id: '2',
    name: 'Pulsaristas Club',
    members: '850 miembros',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=400',
  },
];

export default function CrewsScreen() {
  const [search, setSearch] = useState('');

  const handleJoin = (crewName) => {
    Alert.alert(
      "¡Solicitud enviada!",
      `Has solicitado unirte a ${crewName}. El administrador te responderá pronto.`,
      [{ text: "Entendido", onPress: () => console.log("Unión pendiente") }]
    );
  };

  const renderCrew = ({ item }) => (
    <View style={styles.crewCard}>
      <Image source={{ uri: item.image }} style={styles.crewImage} />
      <View style={styles.crewInfo}>
        <View>
          <Text style={styles.crewName}>{item.name}</Text>
          <Text style={styles.crewMembers}>{item.members}</Text>
        </View>
        <TouchableOpacity 
          style={styles.joinBtn} 
          onPress={() => handleJoin(item.name)}
        >
          <Text style={styles.joinBtnText}>Unirse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crews</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar grupos..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <Text style={styles.sectionSubtitle}>Recomendados</Text>

      <FlatList
        data={CREWS_DATA}
        renderItem={renderCrew}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1A2E44', marginBottom: 15 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 16 },
  sectionSubtitle: { fontSize: 20, fontWeight: 'bold', padding: 20, color: '#1A2E44' },
  list: { paddingHorizontal: 20 },
  crewCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  crewImage: { width: '100%', height: 150 },
  crewInfo: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crewName: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  crewMembers: { fontSize: 14, color: '#64748B', marginTop: 2 },
  joinBtn: { backgroundColor: '#F25C05', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8 },
  joinBtnText: { color: '#FFF', fontWeight: 'bold' },
});