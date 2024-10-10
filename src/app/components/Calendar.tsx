import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Calendar = () => {
  const [selectedWeek, setSelectedWeek] = useState<number[] | null>(null);

  const daysOfMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleWeekPress = (day: number, daysToSelect: number = 7) => {
    const startDay = day;
    const endDay = Math.min(day + daysToSelect - 1, daysOfMonth.length);
    const weekDays = Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i);
    setSelectedWeek(weekDays);
  };

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
        width: '90%',  // Ajuste da largura do calendário
        height: '45%', // Ajuste da altura do calendário
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: '2%',
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
              width: '15%',
              height: '14%',
              margin: '1%',
              borderRadius: 15,
              backgroundColor: selectedWeek && selectedWeek.includes(day) ? '#24C0C0' : '#1E4034',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => handleWeekPress(day)}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedWeek && (
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            marginTop: '4%',
          }}
        >
          Semana selecionada: {selectedWeek.join(', ')}
        </Text>
      )}
    </View>
  );
};

export default Calendar;
