import React from 'react';
import { View, Text } from 'react-native';

interface SuperiorProps {
  titulo: string;
}

const SuperiorM: React.FC<SuperiorProps> = ({ titulo }) => {
  return (
    <View
      style={{
        position: 'static',
        backgroundColor: '#c6c6c6',
        width: '100%',
        height: '30%', // Ajuste de altura para porcentagem
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 0,
        borderTopStartRadius:26,
        borderTopEndRadius:26,
      }}
    >
      {/* Elemento sobreposto para criar o efeito de borda côncava */}
      <View
        style={{
          position: 'absolute',
          bottom: '-15%', // Ajustado para porcentagem
          width: '100%',
          height: '70%', // Ajustado para porcentagem
          borderTopLeftRadius: 0,
          borderTopRightRadius: 80,
          backgroundColor: '#1E4034',
        }}
      />
      <View style={{ position: 'absolute', left: '12%', top: '15%' }}>
        <Text style={{ color: 'white', fontSize: 22, fontStyle: 'italic' }}>
          {titulo}
        </Text>
      </View>
    </View>
  );
};

export default SuperiorM;
