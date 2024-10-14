import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
<<<<<<< HEAD
import VaquinhaCard from 'src/app/components/menu/VaquinhaCard'; // Verifique se o caminho está correto
import { useRouter } from 'expo-router'; // Importando useRouter
=======
import VaquinhaCard from '../../components/menu/VaquinhaCard';
>>>>>>> 45a30080818c66e53438f5c5aad435c67d01256c

const Menu = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [vaquinhas, setVaquinhas] = useState([
        { id: '1', nome: 'Vaquinha 1' },
        { id: '2', nome: 'Vaquinha 2' },
        { id: '3', nome: 'Vaquinha 3' },
        { id: '4', nome: 'Vaquinha 4' },
        { id: '5', nome: 'Vaquinha 5' },
        { id: '6', nome: 'Vaquinha 6' },
    ]);

<<<<<<< HEAD
    const router = useRouter(); // Usando o router

=======
>>>>>>> 45a30080818c66e53438f5c5aad435c67d01256c
    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    const filteredVaquinhas = vaquinhas.filter(vaquinha =>
        vaquinha.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

<<<<<<< HEAD
    const handleDeleteVaquinha = (id: string) => {
        console.log(`Excluindo vaquinha com id: ${id}`);
        setVaquinhas(vaquinhas.filter(vaquinha => vaquinha.id !== id));
    };

    const handlePressVaquinha = (id: string) => {
        router.push(`/menu/informacoes/${id}`); // Navega para a tela de informações com o id
    };

    return (
        <View style={styles.container}>
            <View style={styles.colorBar} />
=======
    // Função de exclusão de vaquinhas
    const handleDeleteVaquinha = (id: string) => {
        console.log(`Excluindo vaquinha com id: ${id}`); // Para verificar a exclusão
        setVaquinhas(vaquinhas.filter(vaquinha => vaquinha.id !== id));
    };

    return (
        <View style={styles.container}>
            <View style={styles.colorBar} /> {/* Barra colorida */}
>>>>>>> 45a30080818c66e53438f5c5aad435c67d01256c
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={24} color="#1E4034" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar vaquinhas"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

<<<<<<< HEAD
=======
            {/* Botão de adicionar vaquinhas */}
>>>>>>> 45a30080818c66e53438f5c5aad435c67d01256c
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add-circle" size={50} color="#1E4034" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredVaquinhas}
                keyExtractor={item => item.id}
<<<<<<< HEAD
                numColumns={2}
                renderItem={({ item }) => (
                    <VaquinhaCard 
                        nome={item.nome} 
                        id={item.id} // Adicionando o id aqui
                        onDelete={() => handleDeleteVaquinha(item.id)} // Passando a função de exclusão
                        onPress={() => handlePressVaquinha(item.id)} // Passando a função de navegação
=======
                numColumns={2} // Para 2 por fileira
                renderItem={({ item }) => (
                    <VaquinhaCard 
                        nome={item.nome} 
                        onDelete={() => handleDeleteVaquinha(item.id)} // Passando a função de exclusão
>>>>>>> 45a30080818c66e53438f5c5aad435c67d01256c
                    />
                )}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
};

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
<<<<<<< HEAD
        alignItems: 'flex-end',
=======
        alignItems: 'flex-end', // Para alinhar o botão à direita
>>>>>>> 45a30080818c66e53438f5c5aad435c67d01256c
        marginRight: 50,
        marginTop: 10,
    },
    addButton: {
        zIndex: 2,
    },
    flatListContainer: {
<<<<<<< HEAD
        paddingBottom: 100,
=======
        paddingBottom: 100, // Espaçamento extra no final para evitar sobreposição
>>>>>>> 45a30080818c66e53438f5c5aad435c67d01256c
    },
});

export default Menu;
