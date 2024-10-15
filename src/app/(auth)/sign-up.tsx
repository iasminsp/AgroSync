import React, { useState } from 'react'
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
  TextInput,
  Platform,
  Keyboard,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native'
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../../../firebaseConfig'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { doc, setDoc } from 'firebase/firestore'

const SignUp = ({ onSignUpSuccess }: { onSignUpSuccess: () => void }) => {
  const [nome, setNome] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const colorScheme = useColorScheme()
  const keyboard = useAnimatedKeyboard()

  // Função para capitalizar a primeira letra de cada palavra
  const capitalizeWords = (text: string) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Função para criar a conta
  const register = async () => {
    setLoading(true);
    setError(null); // Resetar o erro
    try {
      const formattedNome = capitalizeWords(nome)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user // Captura o usuário criado

      // Salva as informações do usuário no Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        nome: formattedNome,
        email: email,
        createdAt: new Date(),
      }) 

      Alert.alert('Cadastro com sucesso!', `Bem-vindo ao AgroSync, ${formattedNome}!`)
      onSignUpSuccess() // Fecha o modal ao concluir o cadastro
      console.log(email, '*logou*') 
      console.log(password, '*logou*')
      router.push('/menu')

    } catch (error: any) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            // Alert.alert('Endereço de e-mail já está em uso.')
            setError('Endereço de e-mail já está em uso.')
            console.log('Erro: e-mail já está em uso')
            break
          case 'auth/invalid-email':
            // Alert.alert('Endereço de e-mail inválido.')
            setError('Endereço de e-mail inválido.')
            console.log('Erro: e-mail inválido')
            break
          case 'auth/missing-password':
            // Alert.alert('Insira sua senha.')
            setError('Insira sua senha.')
            console.log('Erro: senha não inserida')
            break
          case 'auth/weak-password':
            // Alert.alert('A senha deve ter pelo menos 6 caracteres.')
            setError('A senha deve ter pelo menos 6 caracteres.')
            console.log('Erro: Senha fraca')
            break
          default:
            // Alert.alert('Erro ao criar conta. Tente novamente.')
            setError('Erro ao criar conta. Tente novamente.')
            console.log('Erro: criação de conta', error.message)
            break
        }
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  // Função para fechar o modal
  const dismissModal = () => {
    Keyboard.dismiss()
    console.log('Fechou o modal')
    onSignUpSuccess(); // Fecha o modal quando necessário
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.state.value }],
    }
  })

  return (
    <TouchableWithoutFeedback onPress={dismissModal}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <View style={styles.viewGeralBorda}>
            <Animated.View style={[
              animatedStyles,
              { backgroundColor: colorScheme === 'light' ? 'transparent' : 'transparent' }
            ]}>
              <TouchableWithoutFeedback>
                <View style={styles.viewGeral}>
                  <View style={styles.viewUp}>
                    <Text style={styles.textEntrar}>Cadastro</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Nome"
                      placeholderTextColor={'#6B6B6B'}
                      textAlign="center"
                      autoCapitalize="words"
                      onChangeText={(value) => setNome(value)}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Email"
                      placeholderTextColor={'#6B6B6B'}
                      keyboardType="email-address"
                      textAlign="center"
                      onChangeText={(value) => setEmail(value)}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Senha"
                      placeholderTextColor={'#6B6B6B'}
                      secureTextEntry={true}
                      textAlign="center"
                      onChangeText={(value) => setPassword(value)}
                    />
                  </View>
                  <View style={styles.viewDown}>
                    <TouchableOpacity
                      onPress={() => register()}
                      style={styles.touchable}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator size="small" color="#1E4034" />
                      ) : (
                        <Text style={styles.textTouchable}>
                          Entrar
                        </Text>
                      )}
                    </TouchableOpacity>
                    {error && <Text style={styles.textError}>{error}</Text>}
                  </View>
                  <StatusBar 
                    backgroundColor="#1E4034"
                    style="light"
                  />
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
    top: 0,
    left: 0,
  },
  keyboardAvoid: {
    // flex: 1,
  },
  viewGeralBorda: {
    backgroundColor: '#D9D9D9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: '1.5%',
    paddingTop: '1.5%',
  },
  viewGeral: {
    backgroundColor: '#1E4034',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 0,
  },
  viewUp: {
    alignItems: 'center',
  },
  viewDown: {
    alignItems: 'center',
    padding: '10%',
  },
  textEntrar: {
    color: '#D9D9D9',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    padding: '12%',
  },
  textInput: {
    backgroundColor: '#D9D9D9',
    marginBottom: '2%',
    padding: '4.5%',
    color: '#1E4034',
    width: '60%',
    borderRadius: 15,
  },
  touchable: {
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 150,
    borderRadius: 15,
  },
  textTouchable: {
    color: '#1E4034',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textError: {
    marginTop: '10%',
    color: '#fff',
  },
});
