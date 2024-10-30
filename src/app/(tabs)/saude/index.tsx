import { View, Text, TouchableOpacity,Image, Modal } from 'react-native'
import React, { useState } from 'react'
import SuperiorSaude from '@/src/components/saude/superiorSaude'
import Calendar from '@/src/components/saude/Calendar'
import BotomSaude from '@/src/components/saude/botaoSaude'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import Modalfiltro from '@/src/components/saude/modalFiltro'
import CalendarAgenda from '@/src/components/saude/Calendar'

const Saude = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <AntDesign name="filter" size={35} color="#1E4034"style={{ marginLeft:-80, marginTop: 5}}/>
        </TouchableOpacity>
        <Text style={{color:'#1E4034' ,fontSize:20,alignContent: "center", fontStyle:"italic"}}>Previsoes do mes</Text>
        </View>
        <CalendarAgenda/> 
        <BotomSaude titulo={"previsao"} rota={"Previsao"}/>
        <BotomSaude titulo={"doentes"} rota={"Doentes"}/>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
          }}>
            <View style={{
              width: '90%',
              height: '80%',
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
            }}>
              <Modalfiltro closeModal={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
        
      </View>
    </View>    
  )
}

export default Saude