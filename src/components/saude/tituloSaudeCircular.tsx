import React from 'react';
import { View, Text } from 'react-native';

interface SuperiorProps {
  titulo: string;
}

const SuperiorCircular: React.FC<SuperiorProps> = ({ titulo }) => {
  return (
    <View
      style={{
        position: 'relative',
        backgroundColor: '#1E4034',
        width: '100%',
        height: '18%',
        borderBottomLeftRadius: 150, // Mantido para efeito circular
        borderBottomRightRadius: 150, // Mantido para efeito circular
        shadowColor: '#000',
        marginBottom: '5%', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 0,
      }}
    >
      <View style={{ position: 'absolute', marginLeft: '35%', marginTop: '10%' }}>
        <Text style={{ color: 'white', fontSize: 26, fontStyle: 'italic' }}>{titulo}</Text>
      </View>
    </View>
  );
};

export default SuperiorCircular;
