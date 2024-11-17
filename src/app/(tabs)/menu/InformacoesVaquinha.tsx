import React, { useState } from 'react'; // Importando React e o hook useState
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native'; // Importando componentes do React Native
import { Ionicons } from '@expo/vector-icons'; // Importando ícones do Expo
import { updateVaquinha } from '@/src/services/vaquinhaService'; // Importando a função de atualização do serviço

interface InformacoesVaquinhaProps {
    route: {
        params: {
            id: string; // Parâmetro de rota que contém o ID da vaquinha
        };
    };
    navigation: any; // Objeto de navegação
}

const InformacoesVaquinha: React.FC<InformacoesVaquinhaProps> = ({ route, navigation }) => {
    const { id } = route.params; // Desestruturando o ID da vaquinha dos parâmetros da rota
    const [nome, setNome] = useState(''); // Estado para o nome da vaquinha
    const [descricao, setDescricao] = useState(''); // Estado para a descrição da vaquinha

    // Função para salvar as alterações da vaquinha
    const handleSave = async () => {
        const updatedData = { nome, descricao }; // Dados atualizados da vaquinha
        await updateVaquinha(id, updatedData); // Chama a função de atualização com o ID e os dados atualizados
        navigation.goBack(); // Navega de volta para a tela anterior
    };

    return (
        // SafeAreaView para evitar sobreposição com a barra de status e o notch
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}> 
                    <Ionicons name="arrow-back" size={24} color="black" /> 
                </TouchableOpacity>
                <Text style={styles.title}>Detalhes da Vaquinha</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.label}>ID da Vaquinha: {id}</Text>
                <Text style={styles.label}>Nome da Vaquinha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff', // Cor de fundo da tela
    },
    header: {
        flexDirection: 'row', // Layout horizontal
        alignItems: 'center', // Alinhamento central vertical dos itens
        marginBottom: 20, // Margem inferior
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10, // Margem à esquerda
    },
    content: {
        flex: 1, // O conteúdo ocupa o espaço restante
    },
    label: {
        fontSize: 18,
        marginVertical: 10, // Margem vertical
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc', // Cor da borda
        borderRadius: 5, // Borda arredondada
        padding: 10, // Espaçamento interno
        marginBottom: 20, // Margem inferior
    },
    footer: {
        flexDirection: 'row', // Layout horizontal
        justifyContent: 'center', // Alinhamento central horizontal dos itens
    },
    button: {
        backgroundColor: '#1E4034', // Cor de fundo do botão
        padding: 15, // Espaçamento interno
        borderRadius: 5, // Borda arredondada
    },
    buttonText: {
        color: '#fff', // Cor do texto
        fontSize: 18,
        fontWeight: 'bold', // Peso da fonte
    },
});

export default InformacoesVaquinha;
