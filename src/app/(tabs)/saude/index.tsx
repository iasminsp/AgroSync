import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import BotomSaude from "src/app/components/botaoSaude";
import Calendar from "src/app/components/Calendar";
import SuperiorSaude from "src/app/components/superiorSaude";
import { useNavigation } from '@react-navigation/native';


export default function saude() {
    const navigation = useNavigation();
    const rota = "Adicionar";
    const handlePress = () => {
        navigation.navigate(rota);
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#d7d7d7",
                
            }} 
            
        >
            
            <View>
                <SuperiorSaude titulo={"Saude"}/>
                <View style={{ flexDirection: "row",  marginVertical: 0, justifyContent: "center", marginTop: "-3%"  }}>
                <Text style={{color:'#1E4034',marginLeft:85 ,fontSize:20, fontStyle:"italic"}}>Previsoes do mes</Text>
                <TouchableOpacity onPress={handlePress} >
                <MaterialIcons name="add-circle" size={30} color="#1E4034"style={{ marginLeft:60, marginTop: 10}}/>
                </TouchableOpacity>
                </View>
                <Calendar/>
                <BotomSaude titulo={"previsao"} rota={"Previsao"}/>
                <BotomSaude titulo={"doentes"} rota={"Doentes"}/>
            </View>
        </View>    
    )
}