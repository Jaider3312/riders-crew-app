import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Platform, 
  StatusBar 
} from 'react-native';
// Importamos la versión moderna para evitar el WARN de deprecated
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logoText}>Riders Crew</Text>
        <Text style={styles.subtitle}>¡Bienvenido de nuevo, motero!</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Correo electrónico" 
          placeholderTextColor="#94A3B8" 
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Contraseña" 
          secureTextEntry={true} 
          placeholderTextColor="#94A3B8" 
        />

        <TouchableOpacity 
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.loginBtnText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1A2E44', 
    justifyContent: 'center' 
  },
  content: { 
    padding: 30, 
    alignItems: 'center' 
  },
  logoText: { 
    fontSize: 35, 
    fontWeight: 'bold', 
    color: '#F25C05', 
    marginBottom: 10 
  },
  subtitle: { 
    color: '#FFF', 
    marginBottom: 30, 
    fontSize: 16 
  },
  input: { 
    backgroundColor: '#FFF', 
    width: '100%', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15 
  },
  loginBtn: { 
    backgroundColor: '#F25C05', 
    width: '100%', 
    padding: 15, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10 
  },
  loginBtnText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  forgotText: { 
    color: '#94A3B8', 
    marginTop: 20 
  }
});