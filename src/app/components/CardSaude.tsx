import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
        <View style={{
            borderRadius: 12,
            padding: 0,
            justifyContent: "space-between",
            margin: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 500,
            marginBottom:35,
            backgroundColor: '#1E4034',
            width: 380,
            height: showDetails ? 120 : 100,
        }}>
            <View style={{ position: 'absolute', marginLeft: 170, marginTop: 30 }}>
            <Text style={{color:"#d5d5d5",fontSize:18}}>{titulo}</Text>
            </View>
            {showDetails && (
            <View style={{ position: 'absolute', marginLeft: 160, marginTop: 68 }}>
            <Text style={{color:"#d5d5d5",fontSize:14}}>{descricao}</Text>
            </View>
            )}
            <View style={{ marginLeft: 34, marginTop: 25 }}>
            <FontAwesome6 name="cow" size={60} color="white" />
            </View>
        </View>
        </TouchableOpacity>
    )
  }
  
  export default CardSaude;
