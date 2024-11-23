import React, { useState, useEffect } from 'react';
import { View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CardSaude from '../../../components/saude/CardSaude';
import SuperiorPD from '../../../components/saude/superiorPD';
import TituloPD from '../../../components/saude/TituloPD';
import ModalAdd from '../../../components/saude/modalAdd';
import { MaterialIcons } from '@expo/vector-icons';
import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from "../../../../firebaseConfig";

interface Card {
  id: string;
  titulo: string;
  descricao: string;
  data: Date;
}

export default function Doentes() {
  const [modalVisible, setModalVisible] = useState(false);
  const [cards, setCards] = useState<{ id: string; titulo: string; descricao: string; data: Date | null }[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Função para adicionar um novo card
  const addCard = async (titulo: string, descricao: string, data: Date) => {
    if (titulo && data && descricao) {
      try {
        const docRef = await addDoc(collection(db, "tratamentos"), { titulo, descricao, data });
        setModalVisible(false);
      } catch (error) {
        console.error("Erro ao adicionar documento: ", error);
      }
    } else {
      alert("Todos os campos são obrigatórios!");
    }
  };

  const deleteCard = async (id: string) => {
    try {
      await deleteDoc(doc(db, "tratamentos", id));
      setCards(cards.filter(card => card.id !== id));
      console.log("Documento excluído com ID: ", id);
    } catch (error) {
      console.error("Erro ao excluir documento: ", error);
    }
  };

  // UseEffect para buscar dados ao carregar a tela
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tratamentos"), (snapshot) => {
      const cardsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          titulo: data.titulo,
          descricao: data.descricao,
          data: data.data ? new Date(data.data.seconds * 1000) : null, // Converte o timestamp para Date
        };
      }) as Card[];
      setCards(cardsData);
    });

    return () => unsubscribe(); // Limpa a escuta ao desmontar o componente
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#d7d7d7" }}>
      <View>
        <SuperiorPD />
        <TituloPD titulo={'Em tratamento'} />

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons name="add-circle" size={30} color="#1E4034" style={{ marginLeft: "85%", marginTop: 10 }} />
        </TouchableOpacity>
        
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Renderiza os cartões dinamicamente */}
          {cards.map((card, index) => (
            <CardSaude 
                key={index}
                id={card.id} 
                titulo={card.titulo} 
                descricao={card.descricao} 
                selectedDate={card.data} // Passa a data para o CardSaude
                onDateSelected={(date) => console.log('Data selecionada:', date)} // Função para lidar com a seleção de data
                deleteCard={deleteCard}/>
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
              <ModalAdd addCard={addCard} closeModal={() => setModalVisible(false)} onDateSelected={setSelectedDate} eventType="tratamento" />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
