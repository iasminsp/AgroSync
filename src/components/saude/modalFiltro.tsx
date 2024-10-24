import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View, Platform, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import SuperiorModal from "./tituloModal";

interface Props {
  closeModal: () => void;
}

export default function Modalfiltro({closeModal }: Props) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');


  const handleSalvar = () => {
    closeModal(); // Close the modal after saving
  };

  return (
    <View style={{
      borderRadius: 30,
      borderWidth: 3,
      borderColor: '#fff',
      justifyContent: "center",
      alignItems: "center",
      margin: '3%',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 70,
      backgroundColor: '#c6c6c6',
      width: '95%',
      height: '75%',
    }}>
      <SuperiorModal titulo={"filtro"}></SuperiorModal> 

      <Text style={{ color: "black", fontSize: 16, fontStyle: 'italic', marginBottom: 20 }}>ID da Vaca</Text>
      <TextInput
        style={{
          width: '80%',
          height: "10%",
          backgroundColor: '#1E4034',
          borderRadius: 8,
          paddingHorizontal: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30,
        }}
        placeholder="ID vaca.."
        placeholderTextColor="black"
        value={titulo} 
        onChangeText={setTitulo}
      />

      <Text style={{ color: "black", fontSize: 16, fontStyle: 'italic', marginBottom: 10 }}>Tratamento/reproduçao</Text>
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
        placeholderTextColor="black"
        onChangeText={setDescricao}
        value={descricao}
      />

      {/* Botão para salvar */}
      <TouchableOpacity onPress={handleSalvar} style={{ marginTop: "30%", marginLeft: "70%", marginBottom:"6%" }}>
        <MaterialIcons name="check" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
