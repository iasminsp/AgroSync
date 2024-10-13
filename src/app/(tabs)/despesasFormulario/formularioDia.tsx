import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';

export default function FormularioDia() {
  const [idVaca, setIdVaca] = useState('');
  const [litrosLeite, setLitrosLeite] = useState('');
  const [vacina, setVacina] = useState('');
  const [alimentacao, setAlimentacao] = useState('');
  const [peso, setPeso] = useState('');

  const registrarDados = () => {
    if (!idVaca || !litrosLeite || !peso) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    Alert.alert(
      'Sucesso',
      `Dados da vaca ID ${idVaca} registrados com sucesso!`,
      [{ text: 'OK', onPress: () => limparFormulario() }]
    );
  };

  const limparFormulario = () => {
    setIdVaca('');
    setLitrosLeite('');
    setVacina('');
    setAlimentacao('');
    setPeso('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro Diário da Vaca</Text>

      <Text style={styles.label}>ID da Vaca</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o ID da vaca"
        keyboardType="numeric"
        value={idVaca}
        onChangeText={setIdVaca}
      />

      <Text style={styles.label}>Litros de Leite Produzidos</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade em litros"
        keyboardType="numeric"
        value={litrosLeite}
        onChangeText={setLitrosLeite}
      />

      <Text style={styles.label}>Vacina</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a vacina aplicada (opcional)"
        value={vacina}
        onChangeText={setVacina}
      />

      <Text style={styles.label}>Alimentação</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva a alimentação"
        value={alimentacao}
        onChangeText={setAlimentacao}
      />

      <Text style={styles.label}>Peso (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o peso em kg"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <Button title="Registrar Dados" onPress={registrarDados} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#0E5959',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: "#ffff",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: "#ffff",
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
