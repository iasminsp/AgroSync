import { GestureHandlerRootView, TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { FontProvider } from "@/src/components/fonts"
import { MaterialIcons } from "@expo/vector-icons"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from "@/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { useState, useRef } from "react"
import { router } from "expo-router"

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nome, setNome] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Referências para os campos
    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)

    const handleSignUp = async () => {
        setLoading(true)
        setError(null)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Adiciona os dados do usuário no Firestore
            await setDoc(doc(firestore, 'users', user.uid), {
                nome: nome,
                email: email
            })

            Alert.alert('Cadastro realizado com sucesso!', `Bem-vindo ao AgroSync, ${nome}!`)
            console.log('Usuário cadastrado com sucesso:', user)

            router.push('/menu')
        } catch (error: any) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('Este email já está em uso.')
                    break
                case 'auth/invalid-email':
                    setError('Insira um email válido.')
                    break
                case 'auth/missing-password':
                    setError('Digite uma senha.')
                    break
                case 'auth/weak-password':
                    setError('A senha deve ter pelo menos 6 caracteres.')
                    break
                default:
                    setError('Erro ao cadastrar. Tente novamente.')
                    break
            }
            console.log('Erro de cadastro:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <FontProvider>
            <GestureHandlerRootView style={styles.gestureHandlerRootView}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingView}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <SafeAreaView style={styles.safeAreaView}>
                        <View style={styles.viewGeral}>
                            <Text style={styles.textCadastro}>
                                Cadastro
                            </Text>

                            <View style={styles.viewInput}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Nome"
                                    placeholderTextColor={'#1E4034'}
                                    selectionColor={'#1E4034'}
                                    value={nome}
                                    onChangeText={setNome}
                                    returnKeyType="next"  // Define que o próximo campo será focado ao pressionar Enter
                                    onSubmitEditing={() => emailInputRef.current?.focus()} // Move para o próximo campo
                                />
                                <MaterialIcons name="drive-file-rename-outline" size={24} color="#1E4034" style={{ marginVertical: 'auto', margin: 5 }} />
                            </View>

                            <View style={styles.viewInput}>
                                <TextInput
                                    ref={emailInputRef} // Adiciona a referência aqui
                                    style={styles.textInput}
                                    placeholder="Email"
                                    placeholderTextColor={'#1E4034'}
                                    selectionColor={'#1E4034'}
                                    keyboardType='email-address'
                                    value={email}
                                    onChangeText={setEmail}
                                    returnKeyType="next" // Define que o próximo campo será focado ao pressionar Enter
                                    onSubmitEditing={() => passwordInputRef.current?.focus()} // Move para o próximo campo
                                />
                                <MaterialIcons name="email" size={24} color="#1E4034" style={{ marginVertical: 'auto', margin: 5 }} />
                            </View>

                            <View style={styles.viewInput}>
                                <TextInput 
                                    ref={passwordInputRef} // Adiciona a referência aqui
                                    style={styles.textInput}
                                    placeholder="Senha"
                                    placeholderTextColor={'#1E4034'}
                                    selectionColor={'#1E4034'}
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                    returnKeyType="done" // Define que a tecla Enter fecha o teclado
                                    onSubmitEditing={handleSignUp} // Aciona a função de cadastro ao pressionar Enter
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
                                onPress={handleSignUp}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#FFF" />
                                ) : (
                                    <Text style={styles.textOpacityCadastrar}>
                                        Cadastrar
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => router.push('/')}>
                                <Text>
                                    fechar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </GestureHandlerRootView>
        </FontProvider>
    )
}

export default SignUp

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    gestureHandlerRootView: {
        flex: 1,
        backgroundColor: 'trasnparent'
    },
    safeAreaView: {
        flex: 1,
    },
    viewGeral: {
        paddingVertical: 35,
        marginVertical: 'auto',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        borderRadius: 25
    },
    textCadastro: {
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
    textError: {
        borderWidth: 1,
        borderColor: 'red',
        color: 'red', 
        padding: 2,
        marginTop: 10,
    },
    touchableOpacity: {
        backgroundColor: '#1E4034',
        padding: 10,
        margin: 15,
        borderRadius: 10,
        width: 126,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textOpacityCadastrar: {
        fontSize: 25,
        color: '#FFF',
    }
})
