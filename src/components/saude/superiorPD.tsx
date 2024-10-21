import React from 'react';
import { View } from 'react-native';

interface SuperiorProps {}

const SuperiorPD: React.FC<SuperiorProps> = () => {
  return (
    <View
      style={{
        position: 'relative',
        backgroundColor: '#1E4034',
        width: '100%',
        height: 75,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {/* Elemento sobreposto para criar o efeito de borda côncava */}
      <View
        style={{
          position: 'absolute',
          bottom: '-30%', // Move a borda arredondada mais para baixo, em porcentagem
          width: '100%',
          height: '100%',
          borderTopLeftRadius: 100, // Mantém o arredondamento
          borderTopRightRadius: 88,
          backgroundColor: '#d7d7d7', // Cor de fundo para combinar
        }}
      />
    </View>
  );
};

export default SuperiorPD;
