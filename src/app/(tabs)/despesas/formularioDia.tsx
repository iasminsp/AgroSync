import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "../../../../firebaseConfig";
import { getVaquinhas } from "@/src/services/vaquinhaService";

export default function FormularioDia() {
  const [idVaca, setIdVaca] = useState('');
  const [litrosLeite, setLitrosLeite] = useState('');
  const [vacina, setVacina] = useState('');
  const [alimentacao, setAlimentacao] = useState('');
  const [peso, setPeso] = useState('');
  const [vaquinhas, setVaquinhas] = useState<string[]>([]);
  const [busca, setBusca] = useState('');
  const [mostrarVaquinhas, setMostrarVaquinhas] = useState(false);

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

  const registrarDados = async () => {
    if (!idVaca || !litrosLeite || !peso) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await addDoc(collection(db, 'vacas'), {
        idVaca,
        litrosLeite: parseFloat(litrosLeite),
        vacina: vacina || null,
        alimentacao: alimentacao || null,
        peso: parseFloat(peso),
        dataRegistro: new Date().toISOString(),
      });

      Alert.alert(
        'Sucesso',
        `Dados da vaca ID ${idVaca} registrados com sucesso!`,
        [{ text: 'OK', onPress: () => limparFormulario() }]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registrar os dados. Tente novamente.');
      console.error('Erro ao registrar dados:', error);
    }
  };

  const limparFormulario = () => {
    setIdVaca('');
    setLitrosLeite('');
    setVacina('');
    setAlimentacao('');
    setPeso('');
    setBusca('');
  };

  const vaquinhasFiltradas = vaquinhas.filter((nome) =>
    nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleVaquinhaSelect = (nome: string) => {
    setIdVaca(nome);
    setBusca('');
    setMostrarVaquinhas(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro Diário da Vaca</Text>

      <Text style={styles.label}>ID da Vaca</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o ID da vaca ou busque..."
        value={idVaca}
        onChangeText={(text) => {
          setIdVaca(text);
          setBusca(text);
          setMostrarVaquinhas(true);
        }}
      />

      {mostrarVaquinhas && vaquinhasFiltradas.length > 0 && (
        <FlatList
          style={styles.vaquinhasContainer}
          data={vaquinhasFiltradas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleVaquinhaSelect(item)}
              style={styles.vaquinhaItem}
            >
              <Text style={styles.vaquinhaText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text style={styles.label}>Litros de Leite Produzidos</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade em litros"
        keyboardType="numeric"
        value={litrosLeite}
        onChangeText={setLitrosLeite}
      />

      <Text style={styles.label}>Vacina</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a vacina aplicada (opcional)"
        value={vacina}
        onChangeText={setVacina}
      />

      <Text style={styles.label}>Alimentação</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva a alimentação"
        value={alimentacao}
        onChangeText={setAlimentacao}
      />

      <Text style={styles.label}>Peso (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o peso em kg"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <Button title="Registrar Dados" onPress={registrarDados} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 28,
    backgroundColor: '#0E5959',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: '15%',
    color: "#fff",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: "#fff",
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  vaquinhasContainer: {
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  vaquinhaItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  vaquinhaText: {
    fontSize: 16,
    color: '#333',
  },
});
