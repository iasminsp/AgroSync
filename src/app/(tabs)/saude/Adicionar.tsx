import React from 'react';
import { View, Text } from 'react-native';
import BotomAdd from 'src/app/components/botaoAddSaude';
import SuperiorCircular from 'src/app/components/tituloSaudeCircular';

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
            </View>
        </View>    
    )
}