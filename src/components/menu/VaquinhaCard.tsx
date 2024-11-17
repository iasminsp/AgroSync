import React from 'react'; // Importando React
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'; // Importando componentes do React Native
import { Ionicons } from '@expo/vector-icons'; // Importando ícones do Ionicons

// Definindo a interface para as propriedades do componente
interface VaquinhaCardProps {
    nome: string; // Nome da vaquinha
    onDelete: () => void; // Função a ser chamada ao deletar a vaquinha
}

// Componente funcional VaquinhaCard
const VaquinhaCard: React.FC<VaquinhaCardProps> = ({ nome, onDelete }) => {
    const displayName = nome || "Sem nome"; // Definindo o nome a ser exibido, com um padrão "Sem nome" se não houver nome

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Ionicons name="trash" size={40} color="black" /> // Ícone de lixeira para deletar
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <Image 
                    source={require('../../../assets/images/vaquinha.png')} // Certifique-se de que o caminho para a logo esteja correto
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.bottomPart}>
                <Text style={styles.cardText}>{displayName}</Text>
            </View>
        </View>
    );
};

// Estilos para o componente VaquinhaCard
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1E4034',
        borderRadius: 40,
        margin: 10,
        width: '45%',
        aspectRatio: 2 / 3,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'transparent',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    bottomPart: {
        backgroundColor: '#116D6D',
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        paddingVertical: 10,
    },
    cardText: {
        color: '#E0FFD1',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default VaquinhaCard;
