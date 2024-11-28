import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { updateVaquinha, getVaquinhas } from '@/src/services/vaquinhaService';
import { useRouter } from 'expo-router';

interface InformacoesVaquinhaParams {
  id: string;
}

const InformacoesVaquinha: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as unknown as InformacoesVaquinhaParams;
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [peso, setPeso] = useState('');
  const [tipo, setTipo] = useState('');
  const [raca, setRaca] = useState('');

  useEffect(() => {
    const fetchVaquinhaData = async () => {
      try {
        const allVaquinhas = await getVaquinhas();
        const vaquinha = allVaquinhas.find((item) => item.id === id);

        if (vaquinha) {
          setNome(vaquinha.nome);
          setDescricao(vaquinha.descricao);
          setPeso(vaquinha.peso);
          setTipo(vaquinha.tipo);
          setRaca(vaquinha.raca);
        } else {
          console.error('Vaquinha não encontrada');
        }
      } catch (e) {
        console.error('Erro ao buscar vaquinha:', e);
      }
    };

    fetchVaquinhaData();
  }, [id]);

  const handleSave = async () => {
    const updatedData = { nome, descricao, peso, tipo, raca };
    try {
      await updateVaquinha(id, updatedData);
      router.push('/(tabs)/menu'); // Navega de volta para a tela inicial
    } catch (e) {
      console.error('Erro ao salvar dados da vaquinha:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/menu')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes da Vaquinha</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>ID da Vaquinha: {id}</Text>
        <Text style={styles.label}>Nome da Vaquinha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={nome}
          onChangeText={setNome}
        />
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a descrição"
          value={descricao}
          onChangeText={setDescricao}
        />
        <Text style={styles.label}>Peso</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o peso"
          value={peso}
          onChangeText={setPeso}
        />
        <Text style={styles.label}>Tipo (leiteira, de corte, reprodução)</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o tipo"
          value={tipo}
          onChangeText={setTipo}
        />
        <Text style={styles.label}>Raça</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a raça"
          value={raca}
          onChangeText={setRaca}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(tabs)/menu')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#1E4034',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InformacoesVaquinha;
