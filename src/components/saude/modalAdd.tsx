import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, FlatList, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getVaquinhas } from "@/src/services/vaquinhaService";
import React from "react";

interface Props {
  addCard: (titulo: string, descricao: string, data: Date) => void;
  closeModal: () => void;
  onDateSelected: (date: Date) => void;
  eventType: "previsao" | "tratamento"; // Definido externamente
}

export default function ModalAdd({ addCard, closeModal, onDateSelected, eventType }: Props) {
  const [date, setDate] = useState(new Date());
  const [descricao, setDescricao] = useState("");
  const [titulo, setTitulo] = useState("");
  const [show, setShow] = useState(false);
  const [vaquinhas, setVaquinhas] = useState<string[]>([]);
  const [showVaquinhas, setShowVaquinhas] = useState(false);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const fetchVaquinhas = async () => {
      try {
        const data = await getVaquinhas();
        setVaquinhas(data.map((vaquinha) => vaquinha.nome));
      } catch (error) {
        console.error("Erro ao buscar vaquinhas:", error);
      }
    };
    fetchVaquinhas();
  }, []);

  const handleSalvar = () => {
    // Ajusta a data apenas se for "previsao"
    const adjustedDate =
      eventType === "previsao" ? new Date(date.getTime() + 283 * 24 * 60 * 60 * 1000) : date;

    addCard(titulo, descricao, adjustedDate);
    onDateSelected(adjustedDate);
    closeModal();
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleVaquinhaSelect = (nome: string) => {
    setTitulo(nome);
    setShowVaquinhas(false);
  };

  const vaquinhasFiltradas = vaquinhas.filter((nome) =>
    nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View
      style={{
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        margin: "5%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 50,
        backgroundColor: "#1E4034",
        width: "95%",
        height: "85%",
      }}
    >
      <TouchableOpacity onPress={closeModal}>
        <MaterialIcons
          name="arrow-back"
          size={22}
          color="#10A4EE"
          style={{ marginRight: "75%", marginTop: 2 }}
        />
      </TouchableOpacity>

      <Text style={{ color: "white", fontSize: 16, fontStyle: "italic", marginBottom: 10 }}>
        Escolha uma Data
      </Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{ marginBottom: 30, padding: 10, backgroundColor: "#10A4EE", borderRadius: 5 }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker value={date} mode="date" display="default" onChange={onChange} />
      )}

      <Text style={{ color: "white", fontSize: 16, fontStyle: "italic", marginBottom: 10 }}>
        Selecione ou Busque uma Vaca
      </Text>
      <View style={{ width: "80%" }}>
        <TextInput
          style={{
            padding: 10,
            backgroundColor: "#d9d9d9",
            borderRadius: 5,
            marginBottom: 10,
            borderColor: "#ccc",
            borderWidth: 1,
          }}
          placeholder="Buscar ou selecionar vaquinha..."
          placeholderTextColor="black"
          value={busca || titulo} // Mostra o título selecionado ou o valor da busca
          onChangeText={setBusca} // Atualiza a busca dinamicamente
          onFocus={() => setShowVaquinhas(true)} // Mostra a lista ao focar no campo
        />
        {showVaquinhas && (
          <View style={{ maxHeight: 200, backgroundColor: "#f0ffff", borderRadius: 8 }}>
            <FlatList
              data={vaquinhasFiltradas}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    handleVaquinhaSelect(item);
                    setBusca(""); // Limpa o campo de busca ao selecionar
                    setShowVaquinhas(false); // Fecha a lista
                  }}
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: "#ccc",
                  }}
                >
                  <Text style={{ fontSize: 16, color: "black" }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <Text style={{ color: "white", fontSize: 16, fontStyle: "italic", marginBottom: 20 }}>
        Descrição
      </Text>
      <TextInput
        style={{
          width: "80%",
          height: 40,
          backgroundColor: "#d9d9d9",
          borderRadius: 8,
          paddingHorizontal: 10,
          marginBottom: 2,
        }}
        placeholder="Descrição..."
        placeholderTextColor="black"
        onChangeText={setDescricao}
        value={descricao}
      />

      <TouchableOpacity onPress={handleSalvar} style={{ marginTop: 25, marginLeft: "70%" }}>
        <MaterialIcons name="check" size={24} color="#10A4EE" />
      </TouchableOpacity>
    </View>
  );
}
