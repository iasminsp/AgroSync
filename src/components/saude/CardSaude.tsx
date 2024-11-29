import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Modalfiltro from './modalFiltro';

interface CardProps {
  id: string;
  titulo: string;
  descricao: string;
  selectedDate: Date | null;
  onDateSelected: (date: Date) => void;
  deleteCard: (id: string) => void;
}

const CardSaude: React.FC<CardProps> = ({ id, titulo, descricao, selectedDate, onDateSelected, deleteCard }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateSelection = () => {
    const date = new Date();
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
          justifyContent: "space-between",
          padding: 18, 
          margin: 25, 
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: "#1E4034",
          width: '90%',
          minHeight: "80%",
          maxHeight: showDetails ? 140 : 120,
        }}
      >
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 0}}>
          <TouchableOpacity>
            <Feather name="edit-2" size={20} color="#1E4034" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => deleteCard(id)}>
            <MaterialIcons name="delete-outline" size={24} color='#10A4EE' />
          </TouchableOpacity>
        </View>

        {/* Título do card */}
        <View style={{ position: 'absolute', left: '50%', top: '30%' }}>
          <Text style={{ color: '#d5d5d5', fontSize: 18 }}>{titulo}</Text>
        </View>

        {/* Descrição do card, exibida somente se showDetails estiver ativo */}
        {showDetails && (
          <View style={{ position: 'absolute', left: '48%', top: '68%' }}>
            <Text style={{ color: '#d5d5d5', fontSize: 14 }}>{descricao}</Text>
            {selectedDate && (
              <Text style={{ color: '#d5d5d5', fontSize: 14 }}>
                {selectedDate.toLocaleDateString()}
              </Text>
            )}
          </View>
        )}
        {/* Ícone de vaca */}
        <View style={{ marginLeft: '4%', marginTop: '4%' }}>
          <FontAwesome6 name="cow" size={60} color="white" />
        </View>
      </View>
      {showDetails}
    </TouchableOpacity>
    
  );
};

export default CardSaude;
