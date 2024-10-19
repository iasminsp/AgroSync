import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View, Platform, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
    onInputChange: (texto: string) => void;
    salvarVaca: () => void;
}

export default function ModalAdd({ onInputChange, salvarVaca }: Props) {
    const [date, setDate] = useState(new Date()); // Estado para armazenar a data
    const [show, setShow] = useState(false); // Estado para mostrar ou esconder o DatePicker
    const [texto, setTexto] = useState(''); 

    const OnInputChange = (texto: string) => {
        setTexto(texto);
        onInputChange(texto); // Chama a função de retorno de chamada do pai com o novo texto
      };
    // Função para lidar com a mudança de data
    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios'); // Em iOS, o picker continua visível
        setDate(currentDate); // Atualiza a data selecionada
        onInputChange(currentDate.toLocaleDateString()); // Retorna a data no formato local
    };

    // Função para mostrar o DatePicker
    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View style={{
            borderRadius: 30,
            borderWidth: 2, // Espessura da borda
            borderColor: '#fff', // Cor da borda branca
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
            <TouchableOpacity onPress={showDatepicker} style={{
                width: '80%',
                height: "10%",
                backgroundColor: '#1E4034',
                borderRadius: 10,
                paddingHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
            }}>
                <Text style={{ color: 'white' }}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {/* DateTimePicker (só aparece quando show é true) */}
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
            
            <Text style={{ color: "black", fontSize: 16, fontStyle: 'italic', marginBottom: 10 }}>Escolha uma vaquinha</Text>
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
                    placeholder="id vaca.."
                    placeholderTextColor="white"
                    onChangeText={(text) => setTexto(text)}
                    value={texto} 
                    
                />

                <Text style={{ color: "black", fontSize: 16, fontStyle: 'italic', marginBottom: 10 }}>Escolha uma vaquinha</Text>
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
                        placeholder="descriçao.."
                        placeholderTextColor="white"
                        onChangeText={(text) => setTexto(text)}
                        value={texto} 
                    
                />

            {/* Botão para salvar */}
            <TouchableOpacity onPress={salvarVaca} style={{ marginTop: "55%", marginLeft: "70%" }}>
                <MaterialIcons name="check" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}
