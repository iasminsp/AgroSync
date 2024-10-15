import { 
    ImageBackground, 
    ScrollView, 
    TouchableOpacity, 
    View, 
    Text, 
    Modal, 
    StyleSheet 
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import SignIn from "./(auth)/sign-in";
import SignUp from "./(auth)/sign-up";
import 'react-native-gesture-handler';
import React from "react";

export default function App() {
    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<'signIn' | 'signUp'>('signIn')
    const openSignIn = () => {
        setModalContent('signIn')
        setIsModalVisible(true);
    };
    const openSignUp = () => {
        setModalContent('signUp');
        setIsModalVisible(true);
    };
    const handleSignInSuccess = () => {
        setIsModalVisible(false);
    };

    return (
        <GestureHandlerRootView style={styles.handleRoot}>       
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                        {/* Parte de cima */}
                        <View style={styles.viewUp}>
                            <ImageBackground 
                                source={require('../assets/images/SignIn/logoSemFundo.png')}
                                style={styles.imagemLogo}/>
                            <Text style={styles.agroSync}>
                                AgroSync
                            </Text>
                        </View>
                        {/* Parte de baixo */}
                        <View style={styles.viewDown}>
                            <TouchableOpacity onPress={openSignIn} style={styles.touchable}>
                                <Text style={styles.touchableText}>
                                    Entrar
                                </Text>
                            </TouchableOpacity>  
                            <TouchableOpacity onPress={openSignUp} style={styles.touchable} >
                                <Text style={styles.touchableText}>
                                    Cadastrar
                                </Text>
                            </TouchableOpacity>  
                            <Text style={styles.textMark}>
                                Seu sistema de controle na palma da sua mão!
                            </Text>
                        </View>
                        {/* Modal responsável por abrir a parte do Entrar/Cadastrar*/}
                        <Modal 
                            visible={isModalVisible} 
                            onRequestClose={
                                () => setIsModalVisible(false)
                            } 
                            animationType="slide"
                            transparent
                        >
                            {modalContent === 'signIn' ? (
                                <SignIn onSignInSuccess={handleSignInSuccess}/>
                            ) : (
                                <SignUp onSignUpSuccess={handleSignInSuccess}/>
                            )}
                        </Modal>
                </ScrollView>
                <StatusBar 
                    backgroundColor="#1E4034"
                    style="light"
                    /> 
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    handleRoot: {
        height: '100%',
    },
    safeArea: {
        backgroundColor: '#1E4034',
    },
    scrollView: {
        alignItems: 'center',
        height: '100%', 
    },
    viewUp: {
        backgroundColor: '#1E4034',
        height: '55%', 
        width: '100%', 
    },
    viewDown: {
        backgroundColor: '#D9D9D9', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: '2%',  
        height: '40%', 
        width: '85%', 
        borderRadius: 50, 
        padding: 70, 
        gap: 10, 
    },
    imagemLogo: {
        position: 'absolute', 
        marginTop: '8%',
        height: '65%', 
        width: '100%', 
    },
    agroSync: {
        textAlign: 'center', 
        fontWeight: '700', 
        marginTop: '70%', 
        color: '#D9D9D9', 
        fontSize: 40, 
    },
    touchable: {
        backgroundColor: '#1E4034', 
        justifyContent: 'center',
        alignItems: 'center', 
        width: '85%', 
        height: '37%', 
        borderRadius: 15, 
    },
    touchableText: {
        fontWeight: 'bold', 
        color: '#D9D9D9', 
        fontSize: 20, 
    },
    textMark: {
        textAlign: 'center', 
        fontWeight: '400', 
        color: '#1E4034', 
        top: '15%', 
    }
})