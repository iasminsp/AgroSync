import { View, Text } from "react-native";
import BotomSaude from "src/app/components/botaoSaude";
import Calendar from "src/app/components/Calendar";
import SuperiorSaude from "src/app/components/superiorSaude";

export default function saude() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#d7d7d7",
                
            }} 
            
        >
            <View>
                <SuperiorSaude titulo={"Saude"}/>
                <Calendar/>
                <BotomSaude titulo={"previsao"} rota={"Previsao"}/>
                <BotomSaude titulo={"doentes"} rota={"Doentes"}/>
            </View>
        </View>    
    )
}