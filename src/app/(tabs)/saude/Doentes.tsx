// doentes.tsx
import React from 'react';
import { View, Text } from 'react-native';
import CardSaude from 'src/app/components/CardSaude';
import SuperiorPD from 'src/app/components/superiorPD';
import TituloPD from 'src/app/components/TituloPD';

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
