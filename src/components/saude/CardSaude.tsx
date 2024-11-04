import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Feather, MaterialIcons } from '@expo/vector-icons';

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
          padding: 10, 
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10}}>
          <TouchableOpacity onPress={() => deleteCard(id)}>
            <MaterialIcons name="delete-outline" size={20} color='#10A4EE' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="edit-2" size={20} color='#10A4EE' />
          </TouchableOpacity>
        </View>

        {/* Título do card */}
        <View style={{ position: 'absolute', left: '50%', top: '30%' }}>
          <Text style={{ color: '#d5d5d5', fontSize: 18 }}>{titulo}</Text>
        </View>

       
        {showDetails && (
          <View style={{ position: 'absolute', left: '48%', top: '60%' }}>
            <Text style={{ color: '#d5d5d5', fontSize: 14 }}>{descricao}</Text>
            {selectedDate && (
              <Text style={{ color: '#d5d5d5', fontSize: 14 }}>
                {selectedDate.toLocaleDateString()}
              </Text>
            )}
          </View>
        )}
      
        <View style={{ marginLeft: '4%', marginTop: '5%' }}>
          <FontAwesome6 name="cow" size={60} color="white" />
        </View>
      </View>
      {showDetails}
    </TouchableOpacity>
  );
};

export default CardSaude;
