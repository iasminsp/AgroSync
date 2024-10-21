import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SuperiorSaude from '@/src/components/saude/superiorSaude'
import Calendar from '@/src/components/saude/Calendar'
import BotomSaude from '@/src/components/saude/botaoSaude'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Saude = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigation = useNavigation();
  const rota = "Adicionar";
  const handlePress = () => {
      navigation.navigate(rota);
  }

  return (
    <View
        style={{
            flex: 1,
            backgroundColor: "#d4d4d4",
            
        }}      
    >
      <View>
        <SuperiorSaude titulo={"Saude"}/>
        <View style={{ flexDirection: "row",  marginVertical: 0, justifyContent: "center", marginTop: "-3%"  }}>
        <Text style={{color:'#1E4034',marginLeft:85 ,fontSize:20, fontStyle:"italic"}}>Previsoes do mes</Text>
        <TouchableOpacity onPress={handlePress} >
        <MaterialIcons name="add-circle" size={30} color="#1E4034"style={{ marginLeft:"60%", marginTop: 10}}/>
        </TouchableOpacity>
        </View>
        <Calendar selectedDate={selectedDate} />
        <BotomSaude titulo={"previsao"} rota={"Previsao"}/>
        <BotomSaude titulo={"doentes"} rota={"Doentes"}/>
      </View>
    </View>    
  )
}

export default Saude