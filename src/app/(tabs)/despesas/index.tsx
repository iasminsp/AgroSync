import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { db } from "../../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import FormularioDia from '../../../components/despesas/FormularioDia'
const GraficoVaquinhas = () => {
  const [dadosGrafico, setDadosGrafico] = useState<any[]>([]);
  const [estaCarregando, setEstaCarregando] = useState<boolean>(true);

  useEffect(() => {
    carregarVaquinhas();
  }, []);

  const carregarVaquinhas = async () => {
    try {
      console.log("Carregando dados das vaquinhas...");
      const querySnapshot = await getDocs(collection(db, "vaquinhas"));
      const vaquinhas = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nome: doc.data().nome || "Sem Nome",
        descricao: doc.data().descricao || "0", // Prevenir valores não numéricos
      }));

      const dadosFormatados = vaquinhas.map((vaquinha, index) => ({
        value: parseInt(vaquinha.descricao.replace(/\D/g, "")) || 0, // Apenas números
        label: vaquinha.nome || `Item ${index + 1}`,
      }));

      setDadosGrafico(dadosFormatados);
    } catch (e) {
      console.error("Erro ao carregar vaquinhas:", e);
    } finally {
      setEstaCarregando(false);
    }
  };

  if (estaCarregando) {
    return (
      <View style={styles.container}>
        <Text>Carregando gráfico...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfico de Vaquinhas</Text>
      <BarChart
        data={dadosGrafico}
        width={350}
        height={250}
        barWidth={25}
        barBorderRadius={4}
        frontColor="#4CAF50"
        yAxisTextStyle={{ color: "gray", fontSize: 12 }}
        xAxisLabelTextStyle={{ color: "gray", fontSize: 12 }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <FormularioDia titulo={"formulatorio dia a dia"} rota={"formularioDia"}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
});

export default GraficoVaquinhas;
