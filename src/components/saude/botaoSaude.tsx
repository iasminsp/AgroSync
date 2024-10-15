import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface botomProps {
  titulo: string;
  rota: string;
}

const BotomSaude: React.FC<botomProps> = ({ titulo, rota }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate(rota);
  };

  return (
    <View style={{
      borderRadius: 30,
      padding: 0,
      justifyContent: "space-between",
      margin: '5%',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 500,
      marginBottom: '5%',
      backgroundColor: '#0E5959',
      width: '90%', // Largura em % da tela
      height: '12%', // Altura em % da tela
    }}>
      <View style={{ position: 'absolute', marginLeft: '8%', marginTop: '10%' }}>
        <Text style={{ color: "#d5d5d5", fontSize: 18 }}>{titulo}</Text>
      </View>
      <TouchableOpacity onPress={handlePress} style={{ position: 'absolute', marginLeft: '85%', marginTop: '10%' }}>
        <AntDesign name="rightcircleo" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default BotomSaude;
