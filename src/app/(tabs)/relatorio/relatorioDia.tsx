import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { db } from "../../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const RelatorioDiario: React.FC = () => {
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
        collection(db, "vacas"),
        where("dataRegistro", ">=", dataInicio),
        where("dataRegistro", "<=", dataFim)
      );

      const querySnapshot = await getDocs(q);
      const dadosFormatados = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDados(dadosFormatados);
    } catch (error) {
      console.error("Erro ao carregar relatório diário:", error);
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>Carregando relatório...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório Diário</Text>
      {dados.length === 0 ? (
        <Text style={styles.noData}>Nenhum dado disponível para hoje.</Text>
      ) : (
        <FlatList
          data={dados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>• ID da Vaca: {item.idVaca}</Text>
              <Text style={styles.itemText}>• Litros de Leite: {item.litrosLeite}</Text>
              <Text style={styles.itemText}>• Vacina: {item.vacina || "Não informado"}</Text>
              <Text style={styles.itemText}>• Alimentação: {item.alimentacao || "Não informado"}</Text>
              <Text style={styles.itemText}>• Peso: {item.peso} kg</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E4034',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#d4d4d4",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d4d4d4",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  noData: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
  },
  item: {
    backgroundColor: "#d4d4d4",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 3,
  },
});

export default RelatorioDiario;