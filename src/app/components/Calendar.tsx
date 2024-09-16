import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysOfMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleDatePress = (day: number) => {
    setSelectedDate(`Dia selecionado: ${day}`);
  }

  return (
    <View
      style={{
        backgroundColor: '#1E4034',
        padding: 20,
        borderRadius: 15,
        marginTop: 50,
        marginBottom: 60,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
        }}
      >
        Calendário
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {daysOfMonth.map((day) => (
          <TouchableOpacity
            key={day}
            style={{
              width: 40,
              height: 40,
              margin: 5,
              borderRadius: 20,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => handleDatePress(day)}
          >
            <Text
              style={{
                color: '#1E4034',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {day} {/* Certifique-se de que o texto está dentro de <Text> */}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedDate && (
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            marginTop: 10,
          }}
        >
          {selectedDate} {/* Certifique-se de que o texto está dentro de <Text> */}
        </Text>
      )}
    </View>
  )
}

export default Calendar;