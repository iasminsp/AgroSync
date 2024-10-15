// previsao.tsx
import React from 'react';
import { View, Text } from 'react-native';
import CardSaude from '../../../components/saude/CardSaude';
import SuperiorPD from '../../../components/saude/superiorPD';
import TituloPD from '../../../components/saude/TituloPD';

export default function Previsao() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#d7d7d7",
            }}   
        >
        <View>
            <SuperiorPD/>
            <TituloPD titulo={'ciclo reprodutivo'}/>
            <CardSaude titulo={'id vaquinha'} descricao={'prenha de 3 meses'}/>
        </View>
        </View>
    );
}
