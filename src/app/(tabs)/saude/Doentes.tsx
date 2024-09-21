// doentes.tsx
import React from 'react';
import { View, Text } from 'react-native';
import CardSaude from 'src/app/components/CardSaude';

export default function Doentes() {
    return (
        <View>
            <Text>Esta é a tela de Doentes</Text>
            <CardSaude titulo={'id vaquinha'} descricao={'dodoi na pata'}/>
        </View>
    )
}
