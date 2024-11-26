import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getVaquinhas } from '@/src/services/vaquinhaService';
import { useNavigation } from "@react-navigation/native";

interface Vaquinha {
    id: string;
    nome: string;
    descricao: string;
    peso: string;
    tipo: string;
    raca: string;
}

const Index: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [vaquinhas, setVaquinhas] = useState<Vaquinha[]>([]);

    useEffect(() => {
        const fetchVaquinhas = async () => {
            const data = await getVaquinhas();
            setVaquinhas(data);
        };

        fetchVaquinhas();
    }, []);
    
    

    const renderItem = ({ item }: { item: Vaquinha }) => (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <Image source={require('../../../../assets/images/vaquinha.png')} style={styles.image} />
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handle}
                >
                    <Text style={styles.buttonText}>Ver Detalhes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    const handle = () => {
        navigation.navigate("informacoesVaquinha");
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Vaquinhas</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AdicionarVaquinha')}>
                    <Ionicons name="add-circle" size={30} color="#1E4034" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={vaquinhas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
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
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 16, // Reduzi o espaçamento inferior da lista
    },
    cardContainer: {
        width: '100%', // Ajusta dois cards por linha
        marginBottom: 27, // Reduz o espaço entre os cards verticais
    },
    card: {
        backgroundColor: '#1E4034',
        height: 160, // Altura ajustada para centralizar o botão
        borderRadius: 10,
        justifyContent: 'center', // Centraliza os itens no card
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
        marginBottom: 10, // Espaçamento entre o título e o botão
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
});


export default Index;
