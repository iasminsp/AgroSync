import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const Formulario: React.FC = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = () => {
    alert(`Nome enviado: ${nome}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Formulario;
