import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Carregando = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Carregando;

/*
Indica que uma ação está em progresso, como o carregamento de dados.

Como usar:
<Carregando />
*/