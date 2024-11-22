import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, FlatList, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getVaquinhas } from "@/src/services/vaquinhaService"; // Certifique-se de que este serviço está configurado

interface Props {
  addCard: (titulo: string, descricao: string, data: Date) => void;
  closeModal: () => void;
  onDateSelected: (date: Date) => void;
}

export default function ModalAdd({ addCard, closeModal, onDateSelected }: Props) {
  const [date, setDate] = useState(new Date());
  const [descricao, setDescricao] = useState("");
  const [titulo, setTitulo] = useState("");
  const [show, setShow] = useState(false);
  const [vaquinhas, setVaquinhas] = useState<string[]>([]); // Lista de nomes do banco
  const [showVaquinhas, setShowVaquinhas] = useState(false); // Controla a exibição da lista
  const [busca, setBusca] = useState(""); // Texto do campo de busca

  useEffect(() => {
    const fetchVaquinhas = async () => {
      try {
        const data = await getVaquinhas();
        setVaquinhas(data.map((vaquinha) => vaquinha.nome)); // Extrai apenas os nomes
      } catch (error) {
        console.error("Erro ao buscar vaquinhas:", error);
      }
    };
    fetchVaquinhas();
  }, []);

  const handleSalvar = () => {
    addCard(titulo, descricao, date);
    onDateSelected(date);
    closeModal();
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const handleVaquinhaSelect = (nome: string) => {
    setTitulo(nome); // Define o nome da vaquinha selecionada
    setShowVaquinhas(false); // Esconde a lista
  };

  // Filtrar as vaquinhas com base no texto de busca
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
        Selecione uma Vaca
      </Text>
      <TouchableOpacity
        onPress={() => setShowVaquinhas(!showVaquinhas)}
        style={{
          padding: 10,
          backgroundColor: "#d9d9d9",
          borderRadius: 5,
          marginBottom: 10,
          width: "80%",
        }}
      >
        <Text style={{ color: "black", fontSize: 16 }}>
          {titulo || "Selecione uma vaquinha"}
        </Text>
      </TouchableOpacity>

      {showVaquinhas && (
        <View style={{ width: "80%", maxHeight: 200, backgroundColor: '#f0ffff', borderRadius: 8 }}>
          <TextInput
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderColor: "#ccc",
              backgroundColor: "#f0f0f0",
            }}
            placeholder="Buscar vaquinha..."
            value={busca}
            onChangeText={setBusca}
          />
          <FlatList
            data={vaquinhasFiltradas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleVaquinhaSelect(item)}
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
