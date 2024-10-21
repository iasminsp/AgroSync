import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Calendar from './Calendar';

interface CardProps {
  titulo: string;
  descricao: string;
  selectedDate: Date | null;
  onDateSelected: (date: Date) => void;
}

const CardSaude: React.FC<CardProps> = ({ titulo, descricao, selectedDate, onDateSelected }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDateSelection = () => {
    const date = new Date(); // Lógica para escolher uma data, pode ser do Modal ou outra função
    onDateSelected(date);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setShowDetails(!showDetails);
        handleDateSelection(); // Simula a escolha de uma data
      }}
      activeOpacity={0.8}
    >
      <View
        style={{
          borderRadius: 12,
          justifyContent:"space-between",
          padding: '1%',
          margin: '3%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          marginBottom: '1%',
          backgroundColor: '#1E4034',
          width: '90%', // Ajuste da largura em porcentagem
          height: showDetails ? '92%' : '89%', // Ajuste da altura com porcentagem condicional
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
        <View style={{ marginLeft: '5%', marginTop: '4%' }}>
          <FontAwesome6 name="cow" size={60} color="white" />
        </View>
      </View>
      {showDetails}
    </TouchableOpacity>
  );
};

export default CardSaude;
