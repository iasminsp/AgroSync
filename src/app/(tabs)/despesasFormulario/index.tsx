import { View, Text , Image} from "react-native";
import Formulario from "src/app/components/FormularioMensal";
import { useNavigation } from '@react-navigation/native';


export default function index() {
    return (
        <View 
         >

            
            <View>
            <Formulario titulo={"formularios"} rota={"telaFormulario"}/>
            </View>
        </View>    
    )
}
