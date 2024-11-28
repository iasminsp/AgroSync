import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { firestore } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface botomProps {
    titulo: string;
    rota: string;
    vacas: { uid: string };
}

const FormularioDia: React.FC<botomProps> = ({ titulo, rota, vacas }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate(rota);
    }

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(firestore, 'vacas', vacas.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                console.log("No such document!");
            }
        };
        fetchData();
    }, [vacas.uid]);

    return (
        <View style={{
            borderRadius: 25,
            padding: 0,
            justifyContent: "space-between",
            margin: '9%',
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 500,
            marginBottom: '3%',
            backgroundColor: '#0E5959',
            width: '90%',
            height: '10%',
        }}>
            <View style={{ position: 'absolute', marginLeft: '8%', marginTop: '10%' }}>
                <Text style={{ color: "#d5d5d5", fontSize: 18 }}>{titulo}</Text>
            </View>
            <TouchableOpacity onPress={handlePress} style={{ position: 'absolute', marginLeft: '85%', marginTop: '10%' }}>
                <AntDesign name="rightcircleo" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default FormularioDia;
