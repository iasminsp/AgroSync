import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface CalendarAgendaProps {
  events: Event[]; // Recebe os eventos como prop
}

const CalendarAgenda: React.FC<CalendarAgendaProps> = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
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
        markedDates={{
          [selectedDate || '']: { selected: true, marked: true, selectedColor: '#24C0C0' },
        }}
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
