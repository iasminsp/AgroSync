import { View } from "react-native";
import BotomSaude from "src/app/components/botaoSaude";
import Calendar from "src/app/components/Calendar";

export default function saude() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#d7d7d7",
                
            }} 
            
        >
            <View>
                <Calendar/>
                <BotomSaude titulo={"previsao"}/>
                <BotomSaude titulo={"doentes"}/>
            </View>
        </View>    
    )
}