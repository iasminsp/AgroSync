import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,Image
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Relatorio: React.FC = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleGerarRelatorio = () => {
    navigation.navigate("relatorioDia");
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Relatórios</Text>
        <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.dateButton}
      >
        <AntDesign name="calendar" size={20} color="#fff" />
      </TouchableOpacity>

      {show && (
        <DateTimePicker value={date} mode="date" display="default" onChange={onChange} />
      )}
      </View>
      <TouchableOpacity
        style={styles.gerarRelatorioButton}
        onPress={handleGerarRelatorio}
      >
        <Text style={styles.buttonText}>Gerar Relatório</Text>
      </TouchableOpacity>
      <Text style={{ color: "#0E5959", fontSize: 18,marginLeft:'65%', }}>{date.toLocaleDateString()}</Text>
      <Image source={require('../../../../assets/images/Manchinha.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4d4d4",
  },
  header: {
    backgroundColor: "#0E5959",
    height: 150,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
    position: "relative",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  dateButton: {
    position: "absolute",
    top: 37,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 50,
  },
  gerarRelatorioButton: {
    marginTop: '50%',
    backgroundColor: '#1E4034',
    borderRadius: 10,
    padding: 15,
    marginLeft:'10%',
    width:'80%',
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image:{
    marginTop: '52%',
    borderRadius: 10,
    padding: 0,
    alignItems: 'flex-end',
  }
});

export default Relatorio;
