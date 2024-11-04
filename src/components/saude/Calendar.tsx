import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

const CalendarAgenda: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Reunião', description: 'Discussão de projeto', date: '2024-11-15' },
    { id: '2', title: 'Consulta médica', description: 'Consulta geral', date: '2024-11-20' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const renderEventItem = ({ item }: { item: Event }) => (
    <View
      style={{
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#24C0C0',
        borderRadius: 8,
        width: '100%',
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{item.title}</Text>
      <Text style={{ fontSize: 14, color: '#fff' }}>{item.description}</Text>
    </View>
  );

  // Constrói o objeto markedDates com as datas dos eventos
  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = { marked: true, dotColor: '#24C0C0' };
    return acc;
  }, {} as Record<string, any>);
  //const [marked, setMarked] = useState({});
  //useEffect(() => {
  //  const newMarkedDates = {};
  //  events.forEach((item) => {
  //    newMarkedDates[item.date] = { marked: true, dotColor: '#000' };
  //  });
  //  setMarked(newMarkedDates);
  //}, [events]);
  console.log(markedDates);

  // Adiciona a data selecionada com destaque
  if (selectedDate) {
    markedDates[selectedDate] = { selected: true, selectedColor: '#24C0C0', marked: true };
  }

  return (
    <View
      style={{
        backgroundColor: '#1E4034',
        padding: '1%',
        margin: '4%',
        borderRadius: 20,
        marginTop: '5%',
        marginBottom: '4%',
        alignItems: 'center',
        width: '92%',
        height: '46%',
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: '5%',
        }}
      >
        Calendário - {new Date().getMonth() + 1}/{new Date().getFullYear()}
      </Text>

      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        //markedDates={marked}
        theme={{
          calendarBackground: '#1E4034',
          textSectionTitleColor: '#fff',
          selectedDayBackgroundColor: '#24C0C0',
          selectedDayTextColor: '#fff',
          todayTextColor: '#24C0C0',
          dayTextColor: '#fff',
          textDisabledColor: '#2d4150',
          arrowColor: '#24C0C0',
          monthTextColor: '#fff',
          indicatorColor: '#fff',
        }}
        style={{ width: '100%', height: '60%', marginBottom: 10 }}
      />

      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: '#1E4034',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, color: '#fff', marginBottom: 20 }}>Eventos de {selectedDate}</Text>

          <FlatList
            data={events.filter(event => event.date === selectedDate)}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={{ color: '#fff' }}>Sem eventos para esta data.</Text>}
          />

          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: '#24C0C0',
              borderRadius: 8,
            }}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarAgenda;
