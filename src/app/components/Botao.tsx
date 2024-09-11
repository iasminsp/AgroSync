import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BotaoProps {
  titulo: string;
  onPress: () => void;
}

const Botao: React.FC<BotaoProps> = ({ titulo, onPress }) => {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  texto: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Botao;
