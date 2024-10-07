import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CardProps {
  titulo: string;
  descricao: string;
}

const Card: React.FC<CardProps> = ({ titulo, descricao }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descricao: {
    fontSize: 16,
    color: '#666',
  },
});

export default Card;

/*
Exibe blocos de conteúdo, como informações de saúde ou relatórios.

Como usar:
<Card titulo="Relatório de Saúde" descricao="Verifique os dados do último mês." />
*/