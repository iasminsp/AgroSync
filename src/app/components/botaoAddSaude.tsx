import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface addProps {
    titulo: string;
    rota: string;
  }

const BotomAdd: React.FC<addProps> = ({titulo , rota}) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate(rota);
    }
  return (
    <View style={{
      borderRadius: 30,
      padding: 0,
      justifyContent: "center",
      margin: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 500,
      marginBottom:20,
      backgroundColor: '#0E5959',
      width: 400,
      height: 130,
    }}>
        <View style={{ position: 'absolute', marginLeft: 34, marginTop: 34 }}> 
      <Text style={{color:"#d5d5d5",fontSize:18}}>{titulo}</Text>

    </View>
      <TouchableOpacity onPress={handlePress} style={{ position: 'absolute', marginLeft: 340, marginTop: 35}}>
      <AntDesign name="right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default BotomAdd;
