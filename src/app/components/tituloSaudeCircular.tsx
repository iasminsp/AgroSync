import React from 'react';
import { View, Text } from 'react-native';

interface SuperiorProps {
    titulo: string;
}

const SuperiorCircular: React.FC<SuperiorProps> = ({ titulo }) => {
    return (
        <View style={{
            position: 'relative',
            backgroundColor: '#1E4034',
            width: "100%",
            height: 90, // Ajustei a altura para um efeito mais visível
            borderBottomLeftRadius: 150, // Faz o efeito circular na parte inferior esquerda
            borderBottomRightRadius: 150, // Faz o efeito circular na parte inferior direita
            shadowColor: "#000",
            marginBottom:10,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 0,
        }}>
            

            <View style={{ position: 'absolute', margin: 145, marginTop: 25 }}>
                <Text style={{ color: "white", fontSize: 26, fontStyle: "italic" }}>
                    {titulo}
                </Text>
            </View>
        </View>
    );
}

export default SuperiorCircular;
