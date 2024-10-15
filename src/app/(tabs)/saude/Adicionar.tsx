import React from 'react';
import { View, Text, Image } from 'react-native';
import BotomAdd from '../../../components/saude/botaoAddSaude';
import SuperiorCircular from '../../../components/saude/tituloSaudeCircular';

export default function Adicionar() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#d7d7d7",   
            }} 
            
        >
            <View>
                <SuperiorCircular titulo={'Adicionar:'}/>
                <BotomAdd titulo={'Animais em ciclo de reproduçao'} rota={'Previsao'}/>
                <BotomAdd titulo={'Animais em tratamento veterinario'} rota={'Doentes'}/>
                <Image source={require("../../../assets/saude/vaquinha.png")} style={{position:"static", marginTop:"6%"}} />
            </View>
        </View>    
    )
}