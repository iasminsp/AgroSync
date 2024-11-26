import React from 'react';
import { View, Text } from 'react-native';

interface SuperiorProps {
  titulo: string;
}

const SuperiorSaude: React.FC<SuperiorProps> = ({ titulo }) => {
  return (
    <View
      style={{
        position: 'relative',
        backgroundColor: '#1E4034',
        width: '100%',
        height: '15%', // Ajuste de altura para porcentagem
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        elevation: 0,
      }}
    >
      {/* Elemento sobreposto para criar o efeito de borda côncava */}
      <View
        style={{
          position: 'absolute',
          bottom: '-15%', // Ajustado para porcentagem
          width: '100%',
          height: '50%', // Ajustado para porcentagem
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: '#d7d7d7',
        }}
      />
      <View style={{ position: 'absolute', left: '10%', top: '40%' }}>
        <Text style={{ color: 'white', fontSize: 22, fontStyle: 'italic' }}>
          {titulo}
        </Text>
      </View>
    </View>
  );
};

export default SuperiorSaude;
