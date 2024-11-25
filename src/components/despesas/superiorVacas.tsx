import React from 'react';
import { View, Text } from 'react-native';

interface SuperiorProps {
  titulo: string;
}

const SuperiorVacas: React.FC<SuperiorProps> = ({ titulo }) => {
  return (
    <View
      style={{
        position: 'absolute', // Fixar no topo da tela
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1E4034',
        height: '15%', // Altura ajustável
        zIndex: 10, // Garantir que fique acima dos outros elementos
        elevation: 6, // Para sombra em dispositivos Android
      }}
    >
      <View
      />
      <View style={{ position: 'absolute', left: '10%', top: '55%' }}>
        <Text style={{ color: 'white', fontSize: 22, fontStyle: 'italic' }}>
          {titulo}
        </Text>
      </View>
    </View>
  );
};

export default SuperiorVacas;
