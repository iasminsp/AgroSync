import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 
import { updateVaquinha, getVaquinhaById } from '@/src/services/vaquinhaService'; 

interface InformacoesVaquinhaProps {
    route: {
        params: {
            id: string; 
        };
    };
    navigation: any; 
}

const InformacoesVaquinha: React.FC<InformacoesVaquinhaProps> = ({ route, navigation }) => {
    const { id } = route.params; 
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [peso, setPeso] = useState('');
    const [tipo, setTipo] = useState('');
    const [raca, setRaca] = useState('');

    // Carregar dados da vaquinha ao inicializar o componente
    useEffect(() => {
        const fetchVaquinhaData = async () => {
            const vaquinha = await getVaquinhaById(id);
            setNome(vaquinha.nome);
            setDescricao(vaquinha.descricao);
            setPeso(vaquinha.peso);
            setTipo(vaquinha.tipo);
            setRaca(vaquinha.raca);
        };

        fetchVaquinhaData();
    }, [id]);

    const handleSave = async () => {
        const updatedData = { nome, descricao, peso, tipo, raca }; 
        await updateVaquinha(id, updatedData); 
        navigation.goBack(); 
    };

    return (
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
                <Text style={styles.label}>Peso</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o peso"
                    value={peso}
                    onChangeText={setPeso}
                />
                <Text style={styles.label}>Tipo (leiteira, de corte, reprodução)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o tipo"
                    value={tipo}
                    onChangeText={setTipo}
                />
                <Text style={styles.label}>Raça</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a raça"
                    value={raca}
                    onChangeText={setRaca}
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
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20, 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10, 
    },
    content: {
        flex: 1, 
    },
    label: {
        fontSize: 18,
        marginVertical: 10, 
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc', 
        borderRadius: 5, 
        padding: 10, 
        marginBottom: 20, 
    },
    footer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
    },
    button: {
        backgroundColor: '#1E4034', 
        padding: 15, 
        borderRadius: 5, 
    },
    buttonText: {
        color: '#fff', 
        fontSize: 18,
        fontWeight: 'bold', 
    },
});

export default InformacoesVaquinha;
