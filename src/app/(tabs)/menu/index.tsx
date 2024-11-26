import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getVaquinhas } from '@/src/services/vaquinhaService';

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
        <View style={styles.card}>
            <Image source={require('../../../../assets/images/vaquinha.png')} style={styles.image} />
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text style={styles.cardText}>{item.descricao}</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('InformacoesVaquinha', { id: item.id })} 
            >
                <Text style={styles.buttonText}>Ver Detalhes</Text>
            </TouchableOpacity>
        </View>
    );

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
        padding: 20,
        backgroundColor: '#fff',
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
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    cardText: {
        fontSize: 16,
        marginVertical: 5,
        color: '#555',
    },
    button: {
        backgroundColor: '#1E4034',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Index;
