import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface TituloProps {
  titulo: string;
}

const SuperiorR: React.FC<TituloProps> = ({ titulo }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '15%', 
        marginBottom: '8%', 
        backgroundColor: '#c6c6c6',
        padding: 5,
        width: '80%', 
        height: 45, 
        shadowColor: '#1E4034',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {/* Botão de Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color='#1E4034' />
      </TouchableOpacity>

      {/* Título da Tela */}
      <Text
        style={{
          color: '#1E4034',
          fontSize: 18,
          marginLeft: 25,
        }}
      >
        {titulo}
      </Text>

      {/* Seta no final do quadrado */}
      <View
        style={{
          position: 'absolute',
          right: '-5%',
          top: 0,
          width: 0,
          height: 0,
          borderTopWidth: 30,
          borderTopColor: '#c6c6c6',
          borderRightWidth: 20,
          borderRightColor: 'transparent',
          borderLeftWidth: 20,
          borderLeftColor: 'transparent',
        }}
      />

      <View
        style={{
          position: 'absolute',
          right: '-5%',
          bottom: 0,
          width: 0,
          height: 0,
          borderBottomWidth: 30,
          borderBottomColor: '#c6c6c6',
          borderRightWidth: 20,
          borderRightColor: 'transparent',
          borderLeftWidth: 20,
          borderLeftColor: 'transparent',
        }}
      />
    </View>
  );
};

export default SuperiorR;
