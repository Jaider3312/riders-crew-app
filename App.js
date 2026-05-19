import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importamos todas tus pantallas
import LoginScreen from './src/screen/LoginScreen';
import FeedScreen from './src/screen/FeedScreen';
import EventosScreen from './src/screen/EventosScreen';
import CrewsScreen from './src/screen/CrewsScreen';
import PerfilScreen from './src/screen/PerfilScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Esta función contiene todo el menú de abajo que ya arreglamos
function MainTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2E5077',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Feed') iconName = 'home-outline';
          else if (route.name === 'Eventos') iconName = 'calendar-outline';
          else if (route.name === 'Crews') iconName = 'people-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Eventos" component={EventosScreen} />
      <Tab.Screen name="Crews" component={CrewsScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

// El componente principal ahora maneja el flujo de entrada
export default function App() {
  return (
    <NavigationContainer>
      {/* Forzamos a que 'Login' sea la ruta inicial */}
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}