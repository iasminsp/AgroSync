import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface VaquinhaCardProps {
    nome: string;
    onDelete: () => void;
}

const VaquinhaCard: React.FC<VaquinhaCardProps> = ({ nome, onDelete }) => {
    const displayName = nome || "Sem nome";

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Ionicons name="trash" size={40} color="black" />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <Image 
                    source={require('../../../assets/images/vaquinha.png')}// Certifique-se de que o caminho para a logo esteja correto
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.bottomPart}>
                <Text style={styles.cardText}>{displayName}</Text>
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
