import { View, Text, TouchableOpacity,Image, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import SuperiorSaude from '@/src/components/saude/superiorSaude'
import Calendar from '@/src/components/saude/Calendar'
import BotomSaude from '@/src/components/saude/botaoSaude'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import Modalfiltro from '@/src/components/saude/modalFiltro'
import CalendarAgenda from '@/src/components/saude/Calendar'
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from "../../../../firebaseConfig";


interface Card {
  id: string;
  titulo: string;
  descricao: string;
  data: Date | null;
}

const Saude: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Função para escutar a coleção 'previsao'
    const unsubscribePrevisao = onSnapshot(collection(db, "previsao"), (snapshot) => {
      const previsaoData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          titulo: data.titulo,
          descricao: data.descricao,
          data: data.data ? new Date(data.data.seconds * 1000) : null,
        };
      });
      setCards(prevCards => [...prevCards, ...previsaoData]); // Adiciona ao array existente
    });

    // Função para escutar a coleção 'tratamentos'
    const unsubscribeTratamentos = onSnapshot(collection(db, "tratamentos"), (snapshot) => {
      const tratamentosData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          titulo: data.titulo,
          descricao: data.descricao,
          data: data.data ? new Date(data.data.seconds * 1000) : null,
        };
      });
      setCards(prevCards => [...prevCards, ...tratamentosData]); // Adiciona ao array existente
    });

    // Limpeza dos listeners
    return () => {
      unsubscribePrevisao();
      unsubscribeTratamentos();
    };
  }, []);

  const events = cards.map(card => ({
    id: card.id,
    title: card.titulo,
    description: card.descricao,
    date: card.data ? card.data.toISOString().split('T')[0] : '',
  }));

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
        <CalendarAgenda events={events} /> 
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