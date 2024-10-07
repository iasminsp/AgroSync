import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const ListaRelatorios = () => {
  const relatorios = [
    { id: '1', titulo: 'Relatório 1' },
    { id: '2', titulo: 'Relatório 2' },
    { id: '3', titulo: 'Relatório 3' },
  ];

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text style={styles.texto}>{item.titulo}</Text>
    </View>
  );

  return (
    <FlatList
      data={relatorios}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  texto: {
    fontSize: 18,
  },
});

export default ListaRelatorios;

/*
Exibe dados como relatórios ou uma coleção de itens.

Como usar:
<ListaRelatorios />
*/