// doentes.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import CardSaude from '../../../components/saude/CardSaude';
import SuperiorPD from '../../../components/saude/superiorPD';
import TituloPD from '../../../components/saude/TituloPD';
import ModalAdd from '@/src/components/saude/modalAdd';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

interface Card {
    id: string;
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
      const adicionarCard = (id: string, descricao: string, data: string) => {
        const novoCartao: Card = { id, descricao, data };
        setCards((prevCards) => [...prevCards, novoCartao]);
      };
    
      const salvarVaca = () => {
        if (novoCard) {
          adicionarCard(novoCard.id, novoCard.descricao, novoCard.data);
          setModalVisible(false); 
          setNovoCard(null); 
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

            <ScrollView>
            {/* Renderiza os cartões dinamicamente */}
            {cards.map((card, index) => (
            <CardSaude 
                key={index} 
                titulo={card.id} 
                descricao={card.descricao} 
                selectedDate={new Date()} // Passe a data se necessário
                onDateSelected={(date) => console.log('Data selecionada:', date)} // Função para lidar com a seleção de data
            />
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
              <ModalAdd 
                onInputChange={(id, descricao, data) => setNovoCard({ id, descricao, data })} 
                salvarVaca={salvarVaca} 
              />
            </View>
          </View>
        </Modal>
        </View>
        </View>
    )
}
