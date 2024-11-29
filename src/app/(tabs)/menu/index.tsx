import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, SafeAreaView, Modal, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getVaquinhas, addVaquinha, deleteVaquinha } from '@/src/services/vaquinhaService';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import SuperiorSaude from '@/src/components/saude/superiorSaude';

interface Vaquinha {
  id: string;
  nome: string;
  descricao: string;
  peso: string;
  tipo: string;
  raca: string;
  setor: string;
  dataNascimento: string;
  sexo: string;
  caracteristicasFisicas: string;
  dataAquisicao: string;
  registroPedigree: string;
  origem: string;
  tratamentosMedicos: string;
  examesDiagnosticos: string;
  numeroCrias: string;
  custosAssociados: string;
}

const Index: React.FC = () => {
  const [vaquinhas, setVaquinhas] = useState<Vaquinha[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newVaquinha, setNewVaquinha] = useState<Omit<Vaquinha, 'id'>>({
    nome: '',
    descricao: '',
    peso: '',
    tipo: '',
    raca: '',
    setor: '',
    dataNascimento: '',
    sexo: '',
    caracteristicasFisicas: '',
    dataAquisicao: '',
    registroPedigree: '',
    origem: '',
    tratamentosMedicos: '',
    examesDiagnosticos: '',
    numeroCrias: '',
    custosAssociados: ''
  });

  const navigation = useNavigation();

  const fetchVaquinhas = async () => {
    const data = await getVaquinhas();
    setVaquinhas(data);
  };

  useEffect(() => {
    fetchVaquinhas();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteVaquinha(id);
      setVaquinhas((prevVaquinhas) => prevVaquinhas.filter((item) => item.id !== id));
    } catch (e) {
      console.error('Erro ao excluir vaquinha:', e);
    }
  };

  const handleAdd = async () => {
    try {
      const docRef = await addVaquinha(
        newVaquinha.nome, newVaquinha.descricao, newVaquinha.peso, newVaquinha.tipo, newVaquinha.raca, newVaquinha.setor, 
        newVaquinha.dataNascimento, newVaquinha.sexo, newVaquinha.caracteristicasFisicas, newVaquinha.dataAquisicao, newVaquinha.registroPedigree, 
        newVaquinha.origem, newVaquinha.tratamentosMedicos, newVaquinha.examesDiagnosticos, newVaquinha.numeroCrias, newVaquinha.custosAssociados
      );
      setVaquinhas((prevVaquinhas) => [...prevVaquinhas, { ...newVaquinha, id: docRef.id }]);
      setModalVisible(false);
      setNewVaquinha({
        nome: '',
        descricao: '',
        peso: '',
        tipo: '',
        raca: '',
        setor: '',
        dataNascimento: '',
        sexo: '',
        caracteristicasFisicas: '',
        dataAquisicao: '',
        registroPedigree: '',
        origem: '',
        tratamentosMedicos: '',
        examesDiagnosticos: '',
        numeroCrias: '',
        custosAssociados: ''
      });
    } catch (e) {
      console.error('Erro ao adicionar vaquinha:', e);
    }
  };

  const handleInputChange = (field: keyof Omit<Vaquinha, 'id'>, value: string) => {
    setNewVaquinha((prevVaquinha) => ({ ...prevVaquinha, [field]: value }));
  };

  const handleNavigate = (id: string) => {
    navigation.navigate('InformacoesVaquinha', { id, updateVaquinhaList: fetchVaquinhas });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E4034' }}>
      <SuperiorSaude titulo={"Vaquinhas"}/>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="add-circle" size={30} color="#1E4034" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={vaquinhas}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Ionicons name="trash-bin" size={20} color="#000" />
                </TouchableOpacity>
                <Image source={require('../../../../assets/images/vaquinha.png')} style={styles.image} />
                <Text style={styles.cardTitle}>{item.nome || 'Sem nome'}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleNavigate(item.id)}
                >
                  <Text style={styles.buttonText}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          numColumns={2} // define o número de colunas
        />
      </View>
      <StatusBar style="light" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalTitle}>Adicionar Vaquinha</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da vaquinha"
              value={newVaquinha.nome}
              onChangeText={(text) => handleInputChange('nome', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Descricao"
              value={newVaquinha.descricao}
              onChangeText={(text) => handleInputChange('descricao', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Raça da vaquinha"
              value={newVaquinha.raca}
              onChangeText={(text) => handleInputChange('raca', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Peso da vaquinha"
              value={newVaquinha.peso}
              onChangeText={(text) => handleInputChange('peso', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Setor"
              value={newVaquinha.setor}
              onChangeText={(text) => handleInputChange('setor', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Data de Nascimento"
              value={newVaquinha.dataNascimento}
              onChangeText={(text) => handleInputChange('dataNascimento', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Sexo"
              value={newVaquinha.sexo}
              onChangeText={(text) => handleInputChange('sexo', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Características Físicas"
              value={newVaquinha.caracteristicasFisicas}
              onChangeText={(text) => handleInputChange('caracteristicasFisicas', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Data de Aquisição"
              value={newVaquinha.dataAquisicao}
              onChangeText={(text) => handleInputChange('dataAquisicao', text)}
            />
                        <TextInput
              style={styles.input}
              placeholder="Registro de Pedigree"
              value={newVaquinha.registroPedigree}
              onChangeText={(text) => handleInputChange('registroPedigree', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Origem"
              value={newVaquinha.origem}
              onChangeText={(text) => handleInputChange('origem', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tratamentos Médicos"
              value={newVaquinha.tratamentosMedicos}
              onChangeText={(text) => handleInputChange('tratamentosMedicos', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Exames/Diagnósticos"
              value={newVaquinha.examesDiagnosticos}
              onChangeText={(text) => handleInputChange('examesDiagnosticos', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Número de Crias"
              value={newVaquinha.numeroCrias}
              onChangeText={(text) => handleInputChange('numeroCrias', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Custos Associados"
              value={newVaquinha.custosAssociados}
              onChangeText={(text) => handleInputChange('custosAssociados', text)}
            />
            <TouchableOpacity style={styles.button1} onPress={handleAdd}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#d4d4d4",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft:"90%",
    marginTop:'-15%'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 16,
  },
  cardContainer: {
    flex: 1,
    marginBottom: 27,
    marginHorizontal: 5,
  },
  card: {
    backgroundColor: '#1E4034',
    height: 160,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0E5959',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    padding: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0, height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button1: {
    backgroundColor: '#1E4034',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button2: {
    backgroundColor: '#1E4034',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Index;
