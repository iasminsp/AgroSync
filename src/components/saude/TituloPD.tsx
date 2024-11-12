import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface TituloProps {
  titulo: string;
}

const TituloPD: React.FC<TituloProps> = ({ titulo }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '1%', 
        marginBottom: '3%', 
        backgroundColor: '#1E4034',
        padding: 10,
        width: '80%', 
        height: 49, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {/* Botão de Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#d5d5d5" />
      </TouchableOpacity>

      {/* Título da Tela */}
      <Text
        style={{
          color: '#d5d5d5',
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
          borderTopColor: '#1E4034',
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
          borderBottomColor: '#1E4034',
          borderRightWidth: 20,
          borderRightColor: 'transparent',
          borderLeftWidth: 20,
          borderLeftColor: 'transparent',
        }}
      />
    </View>
  );
};

export default TituloPD;
