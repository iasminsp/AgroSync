import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { updateVaquinha, getVaquinhas } from '@/src/services/vaquinhaService';
import { useNavigation, useRoute } from '@react-navigation/native';

interface InformacoesVaquinhaParams {
  id: string;
  updateVaquinhaList: () => void; // Adicionando o callback para atualizar a lista
}

const InformacoesVaquinha: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, updateVaquinhaList } = route.params as InformacoesVaquinhaParams;
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [peso, setPeso] = useState('');
  const [tipo, setTipo] = useState('');
  const [raca, setRaca] = useState('');
  const [setor, setSetor] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [caracteristicasFisicas, setCaracteristicasFisicas] = useState('');
  const [dataAquisicao, setDataAquisicao] = useState('');
  const [registroPedigree, setRegistroPedigree] = useState('');
  const [origem, setOrigem] = useState('');
  const [tratamentosMedicos, setTratamentosMedicos] = useState('');
  const [examesDiagnosticos, setExamesDiagnosticos] = useState('');
  const [numeroCrias, setNumeroCrias] = useState('');
  const [custosAssociados, setCustosAssociados] = useState('');

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
          setSetor(vaquinha.setor);
          setDataNascimento(vaquinha.dataNascimento);
          setSexo(vaquinha.sexo);
          setCaracteristicasFisicas(vaquinha.caracteristicasFisicas);
          setDataAquisicao(vaquinha.dataAquisicao);
          setRegistroPedigree(vaquinha.registroPedigree);
          setOrigem(vaquinha.origem);
          setTratamentosMedicos(vaquinha.tratamentosMedicos);
          setExamesDiagnosticos(vaquinha.examesDiagnosticos);
          setNumeroCrias(vaquinha.numeroCrias);
          setCustosAssociados(vaquinha.custosAssociados);
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
    const updatedData = {
      nome, descricao, peso, tipo, raca, setor, dataNascimento, sexo,
      caracteristicasFisicas, dataAquisicao, registroPedigree, origem,
      tratamentosMedicos, examesDiagnosticos, numeroCrias, custosAssociados
    };
    try {
      await updateVaquinha(id, updatedData);
      updateVaquinhaList(); // Atualiza a lista de vaquinhas
      navigation.goBack(); // Navega de volta para a tela anterior
    } catch (e) {
      console.error('Erro ao salvar dados da vaquinha:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes da Vaquinha</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
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
        <Text style={styles.label}>Setor</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o setor"
          value={setor}
          onChangeText={setSetor}
        />
        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a data de nascimento"
          value={dataNascimento}
          onChangeText={setDataNascimento}
        />
        <Text style={styles.label}>Sexo</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o sexo"
          value={sexo}
          onChangeText={setSexo}
        />
        <Text style={styles.label}>Características Físicas</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite as características físicas"
          value={caracteristicasFisicas}
          onChangeText={setCaracteristicasFisicas}
        />
        <Text style={styles.label}>Data de Aquisição</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a data de aquisição"
          value={dataAquisicao}
          onChangeText={setDataAquisicao}
        />
        <Text style={styles.label}>Registro de Pedigree</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o registro de pedigree"
          value={registroPedigree}
          onChangeText={setRegistroPedigree}
        />
        <Text style={styles.label}>Origem</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a origem"
          value={origem}
          onChangeText={setOrigem}
        />
        <Text style={styles.label}>Tratamentos Médicos</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite os tratamentos médicos"
          value={tratamentosMedicos}
          onChangeText={setTratamentosMedicos}
        />
        <Text style={styles.label}>Exames/Diagnósticos</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite os exames/diagnósticos"
          value={examesDiagnosticos}
          onChangeText={setExamesDiagnosticos}
        />
        <Text style={styles.label}>Número de Crias</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o número de crias"
          value={numeroCrias}
          onChangeText={setNumeroCrias}
        />
        <Text style={styles.label}>Custos Associados</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite os custos associados"
          value={custosAssociados}
          onChangeText={setCustosAssociados}
        />
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
    justifyContent: 'space-between', // Adiciona espaço entre os elementos do cabeçalho
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
  saveButton: {
    backgroundColor: '#1E4034',
    padding: 10,
    borderRadius: 5,
  }
});

export default InformacoesVaquinha;
