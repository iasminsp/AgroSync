import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface CardProps {
  titulo: string;
  descricao: string;
}

const CardSaude: React.FC<CardProps> = ({ titulo, descricao }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setShowDetails(!showDetails)}
      activeOpacity={0.8}
    >
      <View
        style={{
          borderRadius: 12,
          padding: '2%',
          justifyContent: 'space-between',
          margin: '4%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginBottom: '5%',
          backgroundColor: '#1E4034',
          width: '90%', // Ajuste da largura em porcentagem
          height: showDetails ? '52%' : '48%', // Ajuste da altura com porcentagem condicional
        }}
      >
        <View style={{ position: 'absolute', left: '50%', top: '30%' }}>
          <Text style={{ color: '#d5d5d5', fontSize: 18 }}>{titulo}</Text>
        </View>
        {showDetails && (
          <View style={{ position: 'absolute', left: '48%', top: '60%' }}>
            <Text style={{ color: '#d5d5d5', fontSize: 14 }}>{descricao}</Text>
          </View>
        )}
        <View style={{ marginLeft: '5%', marginTop: '10%' }}>
          <FontAwesome6 name="cow" size={60} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardSaude;
