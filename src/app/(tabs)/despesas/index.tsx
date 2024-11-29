import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
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
      const vaquinhas = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          nome: data?.nome || "Sem Nome",
          descricao: data?.descricao || "Sem Descrição",
        };
      });

      const agrupadoPorDescricao = vaquinhas.reduce((acc, vaquinha) => {
        const descricao = vaquinha.descricao;
        if (!acc[descricao]) {
          acc[descricao] = { total: 0 };
        }
        acc[descricao].total += 1;
        return acc;
      }, {});

      const dadosFormatados = Object.keys(agrupadoPorDescricao).map((descricao) => ({
        label: descricao,
        value: agrupadoPorDescricao[descricao].total,
      }));

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
        <ActivityIndicator size="large" color="black" />
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
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <SuperiorVacas titulo="Gráfico" />
        <Text style={styles.title}>Distribuição de Vacas por Tipo</Text>
        <BarChart
          data={dadosGrafico}
          width={350}
          height={250}
          barWidth={25}
          barBorderRadius={4}
          frontColor="#0E5959"
          yAxisTextStyle={{ color: "#000", fontSize: 13 }}
          xAxisLabelTextStyle={{ color: "#000", fontSize: 13 }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <TouchableOpacity onPress={carregarVaquinhas} style={styles.button}>
          <Text style={styles.buttonText}>Atualizar Gráfico</Text>
        </TouchableOpacity>
        <FormularioDia titulo={"Formulário Dia a Dia"} rota={"formularioDia"} vacas={{
          uid: ""
        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#D3D3D3",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
