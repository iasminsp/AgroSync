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
  }

  return (
    <View
      style={{
        backgroundColor: '#1E4034',
        padding: 35,
        margin:10,
        borderRadius: 20,
        marginTop: 30,
        marginBottom: 40,
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
              borderRadius: 15,
              backgroundColor: selectedWeek && selectedWeek.includes(day) ? '#24C0C0' : '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => handleWeekPress(day)}
          >
            <Text
              style={{
                color: '#1E4034',
                fontSize: 16,
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
            marginTop: 10,
          }}
        >
          Semana selecionada: {selectedWeek.join(', ')}
        </Text>
      )}
    </View>
  );
}

export default Calendar;
