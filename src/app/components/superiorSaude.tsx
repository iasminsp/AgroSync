import React from 'react';
import { View, Text } from 'react-native';

interface SuperiorProps {
    titulo: string;
  }
  const SuperiorSaude: React.FC<SuperiorProps> = ({ titulo }) => {
    return (
        <View style={{
            position: 'relative',
            backgroundColor: '#1E4034',
            width: '100%',
            height: 90,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }}>
            {/* Elemento sobreposto para criar o efeito de borda côncava */}
            <View style={{
                position: 'absolute',
                bottom: -15, // Move a borda arredondada para baixo
                width: '100%',
                height: 50,
                borderTopLeftRadius: 100, // Arredonda para "dentro"
                borderTopRightRadius: 90,
                backgroundColor: "#d7d7d7", // Cor de fundo para combinar
            }} />
            <View style={{ position: 'absolute', margin:50,  marginTop:20 }}>
            <Text style={{color:"white",fontSize:22, fontStyle:"italic"}}>{titulo}</Text>
            </View>
        </View>
    )}
  
  export default SuperiorSaude;
