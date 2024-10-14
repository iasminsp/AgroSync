// InformacoesVaquinha.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InformacoesVaquinhaProps {
    route: {
        params: {
            id: string;
        };
    };
}

const InformacoesVaquinha: React.FC<InformacoesVaquinhaProps> = ({ route }) => {
    const { id } = route.params; // Obtendo o id passado na navegação

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Informações da Vaquinha</Text>
            <Text>ID da Vaquinha: {id}</Text>
            {/* Aqui você pode adicionar mais informações sobre a vaquinha */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d7d7d7',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default InformacoesVaquinha;
