import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importando os ícones

interface VaquinhaCardProps {
    nome: string;
    onDelete: () => void;
}

const VaquinhaCard: React.FC<VaquinhaCardProps> = ({ nome, onDelete }) => {
    // Garantindo que o nome sempre seja uma string válida
    const displayName = nome || "Sem nome";

    return (
        <View style={styles.card}>
            {/* Botão de exclusão à esquerda */}
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Ionicons name="trash" size={40} color="black" /> {/* Ícone de lixeira com cor preta */}
            </TouchableOpacity>

            {/* Logo da vaquinha no centro */}
            <View style={styles.imageContainer}>
                <Image 
                    source={require('assets/vaquinha.png')} // Certifique-se de que o caminho para a logo esteja correto
                    style={styles.logoImage}
                />
            </View>

            {/* Barra inferior do card apenas com o nome */}
            <View style={styles.bottomPart}>
                <Text style={styles.cardText}>{displayName}</Text> {/* Texto com o nome da vaquinha */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1E4034',
        borderRadius: 40,
        margin: 10,
        width: '45%',
        aspectRatio: 2 / 3,
        justifyContent: 'space-between', // Ajustado para que a logo e a barra inferior tenham espaço
        alignItems: 'center',
        padding: 10,
    },
    deleteButton: {
        position: 'absolute', // Para posicionar o botão no canto superior esquerdo
        top: 10, // Ajustado para mais perto do topo
        left: 10, // Posicionado à esquerda
        backgroundColor: 'transparent', // Removendo fundo para apenas mostrar o ícone
    },
    imageContainer: {
        flex: 1, // Preenche o espaço disponível
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: '100%', // Ajuste dinâmico baseado na largura do card
        height: undefined, // Deixa o height automático para manter a proporção da imagem
        aspectRatio: 1, // Define uma proporção 1:1 (quadrado)
        resizeMode: 'contain', // Redimensiona a imagem sem cortar
    },
    bottomPart: {
        backgroundColor: '#116D6D',
        width: '100%', // Corrigido para 100% para evitar transbordo
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        paddingVertical: 10, // Espaçamento para a barra inferior
    },
    cardText: {
        color: '#E0FFD1',
        fontSize: 18, // Tamanho da fonte do nome
        fontWeight: 'bold',
    },
});

export default VaquinhaCard;
