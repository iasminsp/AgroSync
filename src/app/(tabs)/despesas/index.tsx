import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { db } from "../../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import FormularioDia from "../../../components/despesas/FormularioDia";
import SuperiorVacas from "@/src/components/despesas/superiorVacas";
const GraficoVaquinhas = () => {
  const [dadosGrafico, setDadosGrafico] = useState<any[]>([]);
  const [estaCarregando, setEstaCarregando] = useState<boolean>(true);

  useEffect(() => {
    carregarVaquinhas();
  }, []);

  const carregarVaquinhas = async () => {
    setEstaCarregando(true);
    try {
      console.log("Carregando dados das vaquinhas...");
      const querySnapshot = await getDocs(collection(db, "vaquinhas"));
      const vaquinhas = querySnapshot.docs.map((doc) => ({
        nome: doc.data().nome || "Sem Nome",
        descricao: parseInt(doc.data().descricao.replace(/\D/g, "")) || 0,
      }));

      const agrupadoPorNome = vaquinhas.reduce((acc, vaquinha) => {
        if (!acc[vaquinha.nome]) {
          acc[vaquinha.nome] = { total: 0 };
        }
        acc[vaquinha.nome].total += vaquinha.descricao;
        return acc;
      }, {});

      const totalGeral = Object.values(agrupadoPorNome).reduce(
        (soma, item: any) => soma + item.total,
        0
      );

      const dadosFormatados = Object.keys(agrupadoPorNome).map((nome) => {
        const total = agrupadoPorNome[nome].total;
        const porcentagem =
          totalGeral > 0 ? ((total / totalGeral) * 100).toFixed(2) : "0.00";
        return {
          label: nome,
          value: parseFloat(porcentagem),
        };
      });

      setDadosGrafico(dadosFormatados);
    } catch (e) {
      console.error("Erro ao carregar vaquinhas:", e);
      alert("Erro ao carregar dados. Tente novamente.");
    } finally {
      setEstaCarregando(false);
    }
  };

  if (estaCarregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Carregando gráfico...</Text>
      </View>
    );
  }

  if (dadosGrafico.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nenhum dado encontrado!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1E4034'}}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <SuperiorVacas titulo="Grafico" />
          <Text style={styles.title}>Gráfico de Vaquinhas (Porcentagens)</Text>
          <BarChart
            data={dadosGrafico}
            width={350}
            height={250}
            barWidth={25}
            barBorderRadius={4}
            frontColor="#4CAF50"
            yAxisTextStyle={{ color: "gray", fontSize: 12 }}
            xAxisLabelTextStyle={{ color: "gray", fontSize: 12 }}
            yAxisLabelFormatter={(value) => `${value}%`}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <TouchableOpacity
            onPress={carregarVaquinhas}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Atualizar Gráfico</Text>
          </TouchableOpacity>
          <FormularioDia titulo={"Formulário Dia a Dia"} rota={"formularioDia"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: '0%', // Compensar a altura do cabeçalho
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#0E5959",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GraficoVaquinhas;