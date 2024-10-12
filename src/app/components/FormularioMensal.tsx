import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface botomProps {
    titulo: string;
    rota: string;
  }

const Formulario: React.FC<botomProps> = ({titulo , rota}) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate(rota);
    }
  return (
    <View style={{
      position: 'relative',
      borderRadius: 30,
      padding: 0,
      justifyContent: "space-between",
      margin: 6,
      marginTop: 50,
      marginBottom:35,
      backgroundColor: '#0E5959',
      width: 400,
      height: 90,
    }}>
        <View style={{ position: 'absolute', marginLeft: 34, marginTop: 34, }}>
      <Text style={{color:"#d5d5d5",fontSize:18, fontWeight: "bold",}}>{titulo}</Text>

    </View>
      <TouchableOpacity onPress={handlePress} style={{ position: 'absolute', marginLeft: 340, marginTop: 35 }}>
      <AntDesign name="rightcircleo" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default Formulario;
