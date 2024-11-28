import { Platform, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, Modal } from "react-native"
import { GestureHandlerRootView, TextInput,  } from "react-native-gesture-handler"
import { FontProvider } from "@/src/components/fonts"
import { MaterialIcons } from "@expo/vector-icons"
import { useState } from "react"
import { router } from "expo-router"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from "@/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import SignUp from "./sign-up"


const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [modalVisible, setModalVisible] = useState(false);
    
    const handleLogin = async () => {
        setLoading(true)
        setError(null)
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        // Recupera as informações do usuário no Firestore
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data()
            const userNome = userData.nome

            Alert.alert('Login com sucesso!', `Bem-vindo ao AgroSync, ${userNome}!`)
            console.log(email, '*logou*') 
            console.log(password, '*logou*')
            console.log(userNome)
            router.push('/menu')
        } else {
            Alert.alert('Erro', 'Dados do usuário não encontrados.')
        }
        } catch (error: any) {
        switch (error.code) {
            case 'auth/invalid-email':
                setError('Insira um email válido.')
                console.log('Erro: e-mail inválido')
                break;
            case 'auth/invalid-credential':
                setError('Email ou senha inválidos.')
                console.log('Erro: e-mail inválido')
                break;
            case 'auth/missing-password':
                setError('Insira sua senha.')
                console.log('Erro: senha não inserida')
                break;
            case 'auth/wrong-password':
                setError('Email ou senha inválidos.')
                console.log('Erro: email ou senha inválidos')
                break;
            case 'auth/user-not-found':
                setError('Nenhum usuário encontrado com esse e-mail.')
                console.log('Erro: nenhum usuário encontrado')
                break;
            default:
                setError('Erro ao fazer login. Tente novamente.')
                console.log('Outro erro:', error.code)
                break;
            }
        console.log(error)
        } 
        finally {
            setLoading(false);
        }
    }

    return (
        <FontProvider>
            <GestureHandlerRootView style={styles.gestureHandlerRootView}>
                <SafeAreaView style={styles.safeAreaView}>
                    <View style={styles.viewGeral}>
                        <Text style={styles.textEntrar}>
                            Entrar
                        </Text>

                        <View style={styles.viewInput}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                placeholderTextColor={'#1E4034'}
                                selectionColor={'#1E4034'}
                                keyboardType='email-address'
                                value={email}
                                onChangeText={setEmail}
                            />
                            <MaterialIcons name="email" size={24} color="#1E4034" style={{ marginVertical: 'auto', margin: 5 }} />
                        </View>

                        <View style={styles.viewInput}>
                            <TextInput 
                                style={styles.textInput}
                                placeholder="Senha"
                                placeholderTextColor={'#1E4034'}
                                selectionColor={'#1E4034'}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                            <MaterialIcons name="lock" size={24} color="#1E4034" style={{ marginVertical: 'auto', margin: 5 }} />
                        </View>

                        {error && 
                            <Text style={styles.textError}>
                            {error}
                            </Text>
                        }   

                        <TouchableOpacity
                            style={styles.touchableOpacity}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <Text style={styles.textOpacityEntrar}>
                                    Entrar
                                </Text>
                            )}
                        </TouchableOpacity>
                        
                        <View style={styles.viewCriarConta}>
                            <Text style={styles.textDescricao}>
                                Não tem uma conta?
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text style={styles.textCriarConta}>
                                    Criar conta
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>

                {/* Modal para SignUp */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <SignUp />
                    </View>
                </Modal>
            </GestureHandlerRootView>
        </FontProvider>
    )
}

export default SignIn

const styles = StyleSheet.create({
    gestureHandlerRootView: {
        flex: 1,
        backgroundColor: Platform.select({
            ios: '#D9D9D9',
            android: 'transparent',
            web: '#D9D9D9',
        }),
        borderTopRightRadius: 120,
        borderTopLeftRadius: 120,
    },
    safeAreaView: {
        flex: 1,
        width: "100%",
    },
    viewGeral: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        alignItems: 'center',
        borderTopRightRadius: 120,
        borderTopLeftRadius: 120,
        paddingVertical: 42,
    },
    textEntrar: {
        fontFamily: 'EncodeSans',
        color: '#1E4034',
        letterSpacing: 3,
        fontSize: 35,
        margin: 20,
    },
    viewInput: {
        flexDirection: 'row'
    },
    textInput: {
        color: '#1E4034',
        width: '60%',
        margin: 5,
        borderBottomWidth: 1,
        fontSize: 18,
        padding: 5,
        borderColor: '#1E4034',
    },
    touchableOpacity: {
        backgroundColor: '#1E4034',
        padding: 10,
        margin: 15,
        borderRadius: 10,
        width: '22%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textOpacityEntrar: {
        fontSize: 25,
        color: '#FFF',
    },
    viewCriarConta: {
        flexDirection: 'row', 
        margin: 10, 
        gap: 5, 
    },
    textDescricao: {
        color: '#1E4034',
    },
    textCriarConta: {
        color: '#1E4034',
        textDecorationLine: 'underline',
    },
    textError: {
        borderWidth: 1,
        borderColor: 'red',
        color: 'red', 
        padding: 2,
        marginTop: 10,
    },
    modalView: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        padding: 20,
    }
})