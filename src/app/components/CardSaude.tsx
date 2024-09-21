import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface CardProps {
  titulo: string;
  descricao: string;
}
const CardSaude: React.FC<CardProps> = ({ titulo, descricao }) => {
    return (
        <View style={{
            borderRadius: 12,
            padding: 0,
            justifyContent: "space-between",
            margin: 6,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 500,
            marginBottom:35,
            backgroundColor: '#1E4034',
            width: 400,
            height: 110,
        }}>
            <View style={{ position: 'absolute', marginLeft: 160, marginTop: 20 }}>
            <Text style={{color:"#d5d5d5",fontSize:18}}>{titulo}</Text>
            </View>
            <View style={{ position: 'absolute', marginLeft: 160, marginTop: 58 }}>
            <Text style={{color:"#d5d5d5",fontSize:14}}>{descricao}</Text>
            </View>
            <View style={{ marginLeft: 34, marginTop: 20 }}>
            <FontAwesome6 name="cow" size={60} color="white" />
            </View>
        </View>
    )
  }
  
  export default CardSaude;
