import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text, SafeAreaView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../../../../firebaseConfig';
import { router } from 'expo-router';
import VaquinhaCard from '@/src/components/menu/VaquinhaCard';
import { Ionicons } from '@expo/vector-icons';
import { addVaquinha, getVaquinhas, deleteVaquinha } from '@/src/services/vaquinhaService';

const Menu = () => {
  // Função para deslogar o usuário
  const signUp = async () => {
    auth.signOut().then(() => {
      router.push('/')
    });
  };

  // Estados para pesquisa, lista de vaquinhas, visibilidade do modal e novos dados da vaquinha
  const [searchQuery, setSearchQuery] = useState('');
  const [vaquinhas, setVaquinhas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newVaquinhaName, setNewVaquinhaName] = useState('');
  const [newVaquinhaDesc, setNewVaquinhaDesc] = useState('');

  // useEffect para buscar vaquinhas ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      const data = await getVaquinhas();
      setVaquinhas(data);
    };
    fetchData();
  }, []);

  // Função para filtrar vaquinhas com base na pesquisa
  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  // Função para adicionar uma nova vaquinha
  const handleAddVaquinha = async () => {
    await addVaquinha(newVaquinhaName, newVaquinhaDesc);
    setVaquinhas(await getVaquinhas());
    setModalVisible(false); // Fecha o modal após adicionar
  };

  // Filtra as vaquinhas de acordo com a pesquisa
  const filteredVaquinhas = vaquinhas.filter(vaquinha =>
    vaquinha.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Função para deletar uma vaquinha
  const handleDeleteVaquinha = async (id) => {
    await deleteVaquinha(id);
    setVaquinhas(await getVaquinhas());
  };

  // Função para navegar para a tela de detalhes da vaquinha
  const handleNavigate = (id) => {
    router.push({
      pathname: 'informacoesVaquinha',
      params: { id }
    });
  };

  return (
    // SafeAreaView para evitar sobreposição com a barra de status e o notch
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1E4034' }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
        <TouchableOpacity 
            onPress={() => signUp()}
            style={styles.logoutButton} 
        >
            <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>  
      </View>

      <View style={styles.container}>
        <View style={styles.colorBar} />
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#1E4034" style={styles.searchIcon} />
          <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar vaquinhas"
              value={searchQuery}
              onChangeText={handleSearch}
          />
        </View>

        <View style={styles.addButtonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add-circle" size={50} color="#1E4034" />
            </TouchableOpacity>
        </View>

        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
              data={filteredVaquinhas}
              keyExtractor={item => item.id}
              numColumns={2}
              renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleNavigate(item.id)}>
                    <VaquinhaCard 
                        nome={item.nome} 
                        onDelete={() => handleDeleteVaquinha(item.id)}
                    />
                  </TouchableOpacity>
              )}
              contentContainerStyle={styles.flatListContainer}
          />
        </SafeAreaView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Adicionar Nova Vaquinha</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Nome da Vaquinha"
            value={newVaquinhaName}
            onChangeText={setNewVaquinhaName}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Descrição da Vaquinha"
            value={newVaquinhaDesc}
            onChangeText={setNewVaquinhaDesc}
          />
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={handleAddVaquinha}
          >
            <Text style={styles.textStyle}>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#FF0000' }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1E4034',
    // paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 40,
    color: '#D9D9D9',
    fontWeight: '700',
    textAlign: 'center',
  },
  logoutButton: {
    width: 100,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#1E4034',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutButtonText: {
    color: '#D9D9D9',
    fontWeight: 'bold',
    fontSize: 20
  },
  container: {
      flex: 1,
      backgroundColor: '#d7d7d7',
      padding: 20,
  },
  colorBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 80,
      backgroundColor: '#1E4034',
      zIndex: -1,
  },
  searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 30,
      paddingHorizontal: 10,
      marginBottom: 20,
      zIndex: 1,
  },
  searchInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
      borderRadius: 30,
  },
  searchIcon: {
      marginRight: 10,
  },
  addButtonContainer: {
      alignItems: 'flex-end',
      marginRight: 50,
      marginTop: 10,
  },
  addButton: {
      zIndex: 2,
  },
  flatListContainer: {
      paddingBottom: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    top: '25%',
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5
  }
});
