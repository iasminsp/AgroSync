import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';

const SwitchExemplo = () => {
  const [ativado, setAtivado] = useState(false);

  return (
    <View style={styles.container}>
      <Text>Notificações</Text>
      <Switch
        value={ativado}
        onValueChange={(valor) => setAtivado(valor)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default SwitchExemplo;

/*
Usado para opções como ativar/desativar notificações.

Como usar:
<SwitchExemplo />
*/