import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View, Platform, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  addCard: (Titulo: string, descricao: string, data: string) => void;
  closeModal: () => void;
  onDateSelected: (date: Date) => void; // Nova propriedade para selecionar data
}

export default function ModalAdd({ addCard, closeModal, onDateSelected }: Props) {
  const [date, setDate] = useState(new Date());
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');
  const [show, setShow] = useState(false); 

  const handleSalvar = () => {
    const formattedDate = date.toLocaleDateString();
    addCard(titulo, descricao, formattedDate);
    onDateSelected(date);  // Passa a data para o componente Saude
    closeModal(); // Fecha o modal
  };
  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate); 
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={{
      borderRadius: 30,
      borderWidth: 2,
      borderColor: '#fff',
      justifyContent: "center",
      alignItems: "center",
      margin: '5%',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 50,
      backgroundColor: '#1E4034',
      width: '95%',
      height: '80%',
    }}>

        <TouchableOpacity onPress={closeModal}>
          <MaterialIcons name="arrow-back" size={22} color='#10A4EE' style={{ marginRight: '75%', marginTop: 2 }}/>
        </TouchableOpacity>

      <Text style={{ color: "white", fontSize: 16, fontStyle: 'italic', marginBottom: 10 }}>Escolha uma Data</Text>

      {/* Botão para abrir o DatePicker */}
      <TouchableOpacity onPress={showDatepicker}>
        <Text style={{ color: "white", fontSize: 16, fontStyle: 'italic', marginBottom: 30 }}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker 
        value={date} 
        mode="date" 
        display="default" 
        onChange={onChange} />
      )}

      <Text style={{ color: "white", fontSize: 16, fontStyle: 'italic', marginBottom: 30 }}>ID da Vaca</Text>
      <TextInput
        style={{
          width: '80%',
          height: "10%",
          backgroundColor: '#d9d9d9',
          borderRadius: 8,
          paddingHorizontal: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 18,
        }}
        placeholder="ID vaca.."
        placeholderTextColor="black"
        value={titulo} 
        onChangeText={setTitulo}
      />

      <Text style={{ color: "white", fontSize: 16, fontStyle: 'italic', marginBottom: 20 }}>Descrição</Text>
      <TextInput
        style={{
          width: '80%',
          height: "10%",
          backgroundColor: '#d9d9d9',
          borderRadius: 8,
          paddingHorizontal: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2,
        }}
        placeholder="descrição.."
        placeholderTextColor="black"
        onChangeText={setDescricao}
        value={descricao}
      />

      {/* Botão para salvar */}
      <TouchableOpacity onPress={handleSalvar} style={{ marginTop: "25%", marginLeft: "70%" }}>
        <MaterialIcons name="check" size={24} color='#10A4EE' />
      </TouchableOpacity>
    </View>
  );
}
