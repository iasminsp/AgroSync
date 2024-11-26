import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from "../../../firebaseConfig";
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function RelatorioDiario() {
  const [dados, setDados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarRelatorio();
  }, []);

  const carregarRelatorio = async () => {
    setCarregando(true);
    try {
      const hoje = new Date();
      const dataInicio = new Date(hoje.setHours(0, 0, 0, 0)).toISOString();
      const dataFim = new Date(hoje.setHours(23, 59, 59, 999)).toISOString();

      const q = query(
        collection(db, 'vacas'),
        where('dataRegistro', '>=', dataInicio),
        where('dataRegistro', '<=', dataFim)
      );

      const querySnapshot = await getDocs(q);
      const dadosFormatados = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDados(dadosFormatados);
    } catch (error) {
      console.error('Erro ao carregar relatório diário:', error);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return (
      <View style={styles.container}>
        <Text>Carregando relatório...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório Diário</Text>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>ID da Vaca: {item.idVaca}</Text>
            <Text>Litros de Leite: {item.litrosLeite}</Text>
            <Text>Vacina: {item.vacina || 'Não informado'}</Text>
            <Text>Alimentação: {item.alimentacao || 'Não informado'}</Text>
            <Text>Peso: {item.peso} kg</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
});
