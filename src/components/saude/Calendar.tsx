import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CalendarProps {
  selectedDate?: Date | null; // Tornando a propriedade opcional
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate }) => {
  const [highlightedWeek, setHighlightedWeek] = useState<number[] | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [daysOfMonth, setDaysOfMonth] = useState<number[]>([]);

  useEffect(() => {
    // Função para calcular os dias do mês atual
    const calculateDaysInMonth = (month: number, year: number) => {
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Último dia do mês
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    // Atualiza os dias do mês
    setDaysOfMonth(calculateDaysInMonth(currentMonth, currentYear));
  }, [currentMonth, currentYear]);

  useEffect(() => {
    if (selectedDate) {
      // Adiciona 3 meses à data selecionada
      const futureDate = new Date(selectedDate);
      futureDate.setMonth(futureDate.getMonth() + 3);
      
      // Calcula a semana a partir dessa data futura
      const startDay = futureDate.getDate();
      const endDay = Math.min(startDay + 6, daysOfMonth.length);
      const weekDays = Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i);
      setHighlightedWeek(weekDays);
    }
  }, [selectedDate, daysOfMonth]);

  // Funções para navegar entre meses
  const goToNextMonth = () => {
    if (currentMonth === 11) { // Se for dezembro
      setCurrentMonth(0); // Volta para janeiro
      setCurrentYear(currentYear + 1); // Aumenta o ano
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) { // Se for janeiro
      setCurrentMonth(11); // Volta para dezembro
      setCurrentYear(currentYear - 1); // Diminui o ano
    } else {
      setCurrentMonth(currentMonth - 1);
    }
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
        width: '92%',  // Ajuste da largura do calendário
        height: '46%', // Ajuste da altura do calendário
      }}
    >
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: '5%' }}>
        Calendário - {currentMonth + 1}/{currentYear}
      </Text>
      
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TouchableOpacity onPress={goToPreviousMonth} style={{ marginRight: 10 }}>
          <Text style={{ color: '#24C0C0', fontSize: 16 }}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={{ color: '#24C0C0', fontSize: 16 }}>Próximo</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {daysOfMonth.map((day) => (
          <TouchableOpacity
            key={day}
            style={{
              width: '12%',
              height: '18%',
              margin: '1%',
              borderRadius: 15,
              backgroundColor: highlightedWeek && highlightedWeek.includes(day) ? '#24C0C0' : '#1E4034',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {highlightedWeek && (
        <Text style={{ color: '#fff', fontSize: 16, marginTop: '4%' }}>
          Semana em destaque: {highlightedWeek.join(', ')}
        </Text>
      )}
    </View>
  );
}

export default Calendar;
