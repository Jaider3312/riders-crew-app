import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const PostCard = ({ user, image, description }) => {
  return (
    <View className="bg-white mb-4 rounded-lg shadow-sm">
      {/* Cabecera: Usuario */}
      <View className="flex-row items-center p-3">
        <View className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
        <Text className="font-bold text-gray-800">{user}</Text>
      </View>

      {/* Imagen del Post */}
      <Image 
        source={{ uri: image }} 
        className="w-full h-72 object-cover"
      />

      {/* Pie de Post: Descripción y Botones */}
      <View className="p-3">
        <Text className="text-gray-700 mb-2">
          <Text className="font-bold">{user} </Text> {description}
        </Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity><Text>❤️ Like</Text></TouchableOpacity>
          <TouchableOpacity><Text>💬 Comentar</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};