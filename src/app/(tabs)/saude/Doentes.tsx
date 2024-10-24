// doentes.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import CardSaude from '../../../components/saude/CardSaude';
import SuperiorPD from '../../../components/saude/superiorPD';
import TituloPD from '../../../components/saude/TituloPD';
import ModalAdd from '@/src/components/saude/modalAdd';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

interface Card {
    id: string;
    titulo:string;
    descricao: string;
    data: string;
  }

export default function Doentes() {
    const route = useRoute();
    const [modalVisible, setModalVisible] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);
    const [novoCard, setNovoCard] = useState<Card | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    useEffect(() => {
        if (route.params?.modalAtivo) {
          setModalVisible(true);
        }
      }, [route.params]);
    
      // Função para adicionar um novo card
      const addCard = async (titulo: string, descricao: string, data: string) => {
        if (titulo && data && descricao) {
          try {
            const docRef = await addDoc(collection(db, "tratamentos"), { titulo, descricao, data });
            setCards([...cards, { id: docRef.id, titulo, descricao, data }]);
            setModalVisible(false);
          } catch (error) {
            console.error("Error adding document: ", error );
          }
        } else {
          alert("All fields are required!");
        }
      };
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#d7d7d7",      
            }}   
        >
        <View>
            <SuperiorPD />
            <TituloPD titulo={'em tratamentos'}/>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialIcons name="add-circle" size={30} color="#1E4034"style={{ marginLeft:"85%", marginTop: 10}}/>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Renderiza os cartões dinamicamente */}
            {cards.map((card, index) => (
            <CardSaude 
                key={index}
                titulo={card.titulo}
                descricao={card.descricao}
                selectedDate={new Date()} // Passe a data se necessário
                onDateSelected={(date) => console.log('Data selecionada:', date)} // Função para lidar com a seleção de data
                id={card.id}            />
            ))}
            </ScrollView>
            {/* Modal para adicionar o card */}
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
              <ModalAdd addCard={addCard} closeModal={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
        </View>
        </View>
    )
}
