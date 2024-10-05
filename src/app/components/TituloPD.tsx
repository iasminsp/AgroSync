import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface TituloProps {
    titulo: string;
}
const TituloPD: React.FC<TituloProps> = ({ titulo }) => {
    return (
        <View style={{
            position: 'relative', // Permite a posição absoluta da seta
            flexDirection: 'row',
            alignItems: 'center',
            marginTop:20,
            marginBottom:15,
            backgroundColor: '#1E4034',
            padding: 15,
            width: 270,
            height: 50,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }}>
            {/* Botão de Voltar */}
            <TouchableOpacity>
                <MaterialIcons name="arrow-back" size={24} color="#d5d5d5" />
            </TouchableOpacity>

            {/* Título da Tela */}
            <Text style={{
                color: '#d5d5d5',
                fontSize: 18,
                marginLeft: 10, // Espaço entre a seta e o texto
            }}>
                {titulo}
            </Text>

            {/* Seta no final do quadrado */}
            <View style={{
                position: 'absolute',
                right: -20, // Posiciona fora da borda direita
                top: 0,
                width: 0,
                height: 0,
                borderTopWidth: 30,
                borderTopColor: '#1E4034', // Mesma cor do fundo do componente
                borderRightWidth: 20,
                borderRightColor: 'transparent',
                borderLeftWidth: 20,
                borderLeftColor: 'transparent',
            }} />
            
            <View style={{
                position: 'absolute',
                right: -20, // Posiciona fora da borda direita
                bottom: 0,
                width: 0,
                height: 0,
                borderBottomWidth: 30,
                borderBottomColor: '#1E4034', // Mesma cor do fundo do componente
                borderRightWidth: 20,
                borderRightColor: 'transparent',
                borderLeftWidth: 20,
                borderLeftColor: 'transparent',
            }} />
        </View>
    )
}

export default TituloPD;
