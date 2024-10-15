// doentes.tsx
import React from 'react';
import { View, Text } from 'react-native';
import CardSaude from '../../../components/saude/CardSaude';
import SuperiorPD from '../../../components/saude/superiorPD';
import TituloPD from '../../../components/saude/TituloPD';

export default function Doentes() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#d7d7d7",      
            }}   
        >
        <View>
            <SuperiorPD />
            <TituloPD titulo={'em tratamentos'}/>
            <CardSaude titulo={'id vaquinha'} descricao={'dodoi na pata'}/>
        </View>
        </View>
    )
}
