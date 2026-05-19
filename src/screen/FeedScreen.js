import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Datos de prueba para tu Feed
const POSTS = [
  {
    id: '1',
    user: 'Guillermo Morera',
    location: 'Bogotá',
    time: 'Hace 4 horas',
    content: '¡Lista la máquina para la rodada de hoy! 🏍️💨',
    likes: 12,
  },
  {
    id: '2',
    user: 'Rider Anónimo',
    location: 'Chía',
    time: 'Hace 5 horas',
    content: '¿Alguien para salir a almorzar a Cajicá este domingo?',
    likes: 8,
  },
];

export default function FeedScreen() {
  
  // Esta función crea cada "tarjeta" del feed
  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.user.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.postMeta}>{item.time} • {item.location}</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.interactionBtn}>
          <Ionicons name="heart-outline" size={20} color="#64748B" />
          <Text style={styles.interactionText}>{item.likes} Me gusta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.interactionBtn}>
          <Ionicons name="chatbubble-outline" size={20} color="#64748B" />
          <Text style={styles.interactionText}>Comentar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riders Crew</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={26} color="#1A2E44" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={POSTS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#1A2E44' },
  listContent: { padding: 15 },
  postCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F25C05',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#1E293B' },
  postMeta: { fontSize: 12, color: '#64748B' },
  postContent: { fontSize: 15, color: '#334155', lineHeight: 22, marginBottom: 15 },
  postFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  interactionBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 25 },
  interactionText: { marginLeft: 5, color: '#64748B', fontSize: 14 },
});