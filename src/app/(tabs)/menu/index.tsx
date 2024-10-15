import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../../../../firebaseConfig';
import { router } from 'expo-router';
import VaquinhaCard from '@/src/components/menu/VaquinhaCard';
import { Ionicons } from '@expo/vector-icons';

const Menu = () => {
  // Logout
  const signUp = async () => {
    auth.signOut().then((value) => {
      router.push('/')
    })
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [vaquinhas, setVaquinhas] = useState([
      { id: '1', nome: 'Vaquinha 1' },
      { id: '2', nome: 'Vaquinha 2' },
      { id: '3', nome: 'Vaquinha 3' },
      { id: '4', nome: 'Vaquinha 4' },
      { id: '5', nome: 'Vaquinha 5' },
      { id: '6', nome: 'Vaquinha 6' },
  ]);

  const handleSearch = (text: string) => {
      setSearchQuery(text);
  };

  const filteredVaquinhas = vaquinhas.filter(vaquinha =>
      vaquinha.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Função de exclusão de vaquinhas
  const handleDeleteVaquinha = (id: string) => {
      console.log(`Excluindo vaquinha com id: ${id}`); // Para verificar a exclusão
      setVaquinhas(vaquinhas.filter(vaquinha => vaquinha.id !== id));
  };

  return ( 
  //   <View style={{ backgroundColor: '#1E4034', height: '100%', width: '100%'}}>
  //   <Text style={{ fontSize: 40, color: '#D9D9D9', fontWeight: '700', textAlign: 'center', marginTop: '70%' }}>
  //     Menu
  //   </Text>
  //   <TouchableOpacity 
  //       onPress={() => signUp()}
  //       style={{ 
  //           width: 100, 
  //           height: 50, 
  //           borderRadius: 15, 
  //           backgroundColor: '#1E4034', 
  //           alignItems: 'center', 
  //           justifyContent: 'center' 
  //       }} 
  //   >
  //       <Text style={{ color: '#D9D9D9', fontWeight: 'bold', fontSize: 20 }}>Logout</Text>
  //   </TouchableOpacity>  
  // </View>
    
    
    //editar dentro do return
    <View style={styles.container}>
      <View style={styles.colorBar} /> {/* Barra colorida */}
        <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} color="#1E4034" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar vaquinhas"
                value={searchQuery}
                onChangeText={handleSearch}
            />
        </View>

      {/* Botão de adicionar vaquinhas */}
      <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add-circle" size={50} color="#1E4034" />
          </TouchableOpacity>
      </View>

    <FlatList
        data={filteredVaquinhas}
        keyExtractor={item => item.id}
        numColumns={2} // Para 2 por fileira
        renderItem={({ item }) => (
            <VaquinhaCard 
                nome={item.nome} 
                onDelete={() => handleDeleteVaquinha(item.id)} // Passando a função de exclusão
            />
        )}
        contentContainerStyle={styles.flatListContainer}
    />
    </View>
  )
}

export default Menu


const styles = StyleSheet.create({
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
      alignItems: 'flex-end', // Para alinhar o botão à direita
      marginRight: 50,
      marginTop: 10,
  },
  addButton: {
      zIndex: 2,
  },
  flatListContainer: {
      paddingBottom: 100, // Espaçamento extra no final para evitar sobreposição
  },
});
