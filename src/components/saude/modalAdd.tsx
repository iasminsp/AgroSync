import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View, Platform, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  addCard: (Titulo: string, descricao: string, data: string) => void;
  closeModal: () => void;
}

export default function ModalAdd({ addCard, closeModal }: Props) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate); 
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleSalvar = () => {
    // Format the date as a string for Firestore
    const formattedDate = date.toLocaleDateString();
    addCard(titulo, descricao, formattedDate);
    closeModal(); // Close the modal after saving
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
      backgroundColor: '#c3c3c3',
      width: '95%',
      height: '80%',
    }}>
      <Text style={{ color: "black", fontSize: 16, fontStyle: 'italic', marginBottom: 10 }}>Escolha uma Data</Text>

      {/* Botão para abrir o DatePicker */}
      <TouchableOpacity onPress={showDatepicker}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker 
        value={date} 
        mode="date" 
        display="default" 
        onChange={onChange} />
      )}

      <Text style={{ color: "black", fontSize: 16, fontStyle: 'italic', marginBottom: 10 }}>ID da Vaca</Text>
      <TextInput
        style={{
          width: '80%',
          height: "10%",
          backgroundColor: '#1E4034',
          borderRadius: 8,
          paddingHorizontal: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2,
        }}
        placeholder="ID vaca.."
        placeholderTextColor="white"
        value={titulo} 
        onChangeText={setTitulo}
      />

      <Text style={{ color: "black", fontSize: 16, fontStyle: 'italic', marginBottom: 10 }}>Descrição</Text>
      <TextInput
        style={{
          width: '80%',
          height: "10%",
          backgroundColor: '#1E4034',
          borderRadius: 8,
          paddingHorizontal: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2,
        }}
        placeholder="descrição.."
        placeholderTextColor="white"
        onChangeText={setDescricao}
        value={descricao}
      />

      {/* Botão para salvar */}
      <TouchableOpacity onPress={handleSalvar} style={{ marginTop: "55%", marginLeft: "70%" }}>
        <MaterialIcons name="check" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
