import { View } from "react-native";
import Calendar from "src/app/components/Calendar";

export default function saude() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#d7d7d7",
                alignItems: "center",
            }} 
            
        >
            <View>
                <Calendar/>
            </View>
        </View>    
    )
}