import { View, Text , Image, StyleSheet } from "react-native";
import Formulario from "src/app/components/FormularioMensal";
import { useNavigation } from '@react-navigation/native';
import FormularioDia from "src/app/components/formularioDia";

export default function index() {
    return (
        <View 
         >
             <Text style={styles.titulo}>FORMULÁRIOS</Text>
            
            
            <View>
            <FormularioDia titulo={"formulatorio dia a dia"} rota={"formularioDia"}/>
            <Formulario titulo={"formulatorio Mensal"} rota={"formulario"}/>
            </View>
            <Image source={require("assets/vaquinha.png")} />
        </View>    
    )
}

const styles = StyleSheet.create({
   
    titulo: {
      fontSize: 32, 
      fontWeight: "bold", 
      color: "#0E5959",
      marginTop: 40, 
   
    },
    image: {
      width: 50, // Tamanho da imagem
      height: 200,
      resizeMode: "contain", // Ajusta a imagem proporcionalmente
      marginBottom: 20, // Espaço entre a imagem e o final da tela
    },
  });
