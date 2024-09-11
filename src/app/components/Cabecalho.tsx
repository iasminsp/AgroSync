import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  titulo: string;
}

const Header: React.FC<HeaderProps> = ({ titulo }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    color: '#FFF',
  },
});

export default Header;

/*
Exibe o título da página e botões de navegação.

Como usar:
<Header titulo="Tela de Relatórios" />
*/