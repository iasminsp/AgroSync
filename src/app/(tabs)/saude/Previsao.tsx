import React, { useState, useEffect } from 'react';
import { View, Modal, Text, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CardSaude from '../../../components/saude/CardSaude';
import SuperiorPD from '../../../components/saude/superiorPD';
import TituloPD from '../../../components/saude/TituloPD';
import ModalAdd from '../../../components/saude/modalAdd';

export default function Previsao() {
    const route = useRoute(); // Obtém o parâmetro passado pela navegação
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // Verifica se o modal deve estar ativo com base no parâmetro passado
        if (route.params?.modalAtivo) {
            setModalVisible(true);
        }
    }, [route.params]);

    // Função para salvar a vaca (você pode implementá-la conforme necessário)
    const salvarVaca = () => {
        console.log('Vaca salva!');
        setModalVisible(false); // Fechar o modal após salvar
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#d7d7d7" }}>
            <View>
                <SuperiorPD/>
                <TituloPD titulo={'Ciclo Reprodutivo'}/>
                <CardSaude titulo={'id vaquinha'} descricao={'prenha de 3 meses'}/>

                {/* Modal para adicionar o card */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 5,
                    }}>
                        <View style={{
                            width: '90%',
                            height: '80%',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center',
                        }}>
                            <ModalAdd onInputChange={(texto) => console.log(texto)} salvarVaca={salvarVaca} />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}
