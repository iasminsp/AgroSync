import { View, Text , Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import FormularioDia from "src/app/components/FormularioDia";
import SuperiorSaude from "src/app/components/superiorSaude";


export default function index () {
    return (
        <View 
             style={{
                flex: 900,
                backgroundColor: "#d7d7d7",
                
            }}>
            
            <View>
            
            <FormularioDia titulo={"formulatorio dia a dia"} rota={"formularioDia"}/>
            
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
      position: 'absolute',
    },
  });
