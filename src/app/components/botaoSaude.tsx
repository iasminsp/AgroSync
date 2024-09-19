import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';

interface botomProps {
    titulo: string;
  }

const BotomSaude: React.FC<botomProps> = ({titulo }) => {
  return (
    <View style={{
      borderRadius: 30,
      padding: 0,
      justifyContent: "space-between",
      margin: 6,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 500,
      marginBottom:35,
      backgroundColor: '#0E5959',
      width: 400,
      height: 90,
    }}>
        <View style={{ position: 'absolute', marginLeft: 34, marginTop: 34 }}>
      <Text style={{color:"#d5d5d5",fontSize:18}}>{titulo}</Text>

    </View>
      <TouchableOpacity onPress={() => (true)} style={{ position: 'absolute', marginLeft: 340, marginTop: 35 }}>
      <AntDesign name="rightcircleo" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default BotomSaude;
