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
  ActivityIndicator,
  Alert, 
} from 'react-native'
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../../../firebaseConfig'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { doc, getDoc } from 'firebase/firestore'

const SignIn = ({ onSignInSuccess }: { onSignInSuccess: () => void }) => {
  
  // Firebase config
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Modal config
  const colorScheme = useColorScheme()
  const keyboard = useAnimatedKeyboard()

  // Firebase arrow function
  const Login = async () => {
    setLoading(true)
    setError(null); // Reset error
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Recupera as informações do usuário no Firestore
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userNome = userData.nome; // Supondo que o nome esteja armazenado como 'name'

        Alert.alert('Login com sucesso!', `Bem-vindo ao AgroSync, ${userNome}!`);
        onSignInSuccess(); // Chama a função para fechar o modal
        console.log(email, '*logou*') 
        console.log(password, '*logou*')
        console.log(userNome)
        router.push('/menu');
      } else {
        Alert.alert('Erro', 'Dados do usuário não encontrados.');
      }
    } catch (error: any) {
        switch (error.code) {
          case 'auth/invalid-email':
            // Alert.alert('Endereço de e-mail inválido.')
            setError('Insira um email válido.')
            console.log('Erro: e-mail inválido')
            break;
          case 'auth/invalid-credential':
            // Alert.alert('Endereço de e-mail inválido.')
            setError('Email ou senha inválidos.')
            console.log('Erro: e-mail inválido')
            break;
          case 'auth/missing-password':
            // Alert.alert('Insira sua senha.')
            setError('Insira sua senha.')
            console.log('Erro: senha não inserida')
            break;
          case 'auth/wrong-password':
            // Alert.alert('Email ou senha inválidos.')
            setError('Email ou senha inválidos.')
            console.log('Erro: email ou senha inválidos')
            break;
          case 'auth/user-not-found':
            // Alert.alert('Nenhum usuário encontrado com esse e-mail.')
            setError('Nenhum usuário encontrado com esse e-mail.')
            console.log('Erro: nenhum usuário encontrado')
            break;
          default:
            // Alert.alert('Erro ao fazer login. Tente novamente.')
            setError('Erro ao fazer login. Tente novamente.')
            console.log('Outro erro:', error.code)
            break;
        }
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  // Modal arrow function open
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.state.value }]
    }
  })

  // Modal arrow function close
  const dismissModal = () => {
    Keyboard.dismiss(); // Area para fechar o modal
    console.log('fechou o modal');
    onSignInSuccess(); // Chama a função para fechar o modal 
  }
  
  return (
    <TouchableWithoutFeedback onPress={dismissModal}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <View style={styles.viewGeralBorda}>
            <Animated.View style={[animatedStyles, { backgroundColor: colorScheme === 'light' ? 'transparent' : 'transparent' }]}>
              <TouchableWithoutFeedback>
                <View style={styles.viewGeral}>
                  <View style={styles.viewUp}>
                    <Text style={styles.textEntrar}>
                      Entrar
                    </Text>
                    <TextInput 
                      style={styles.textInput}
                      placeholder='Email'
                      placeholderTextColor={'#6B6B6B'}
                      keyboardType='email-address'
                      textAlign='center'
                      onChangeText={(value) => setEmail(value)}
                    />
                    <TextInput 
                      style={styles.textInput}
                      placeholder='Senha'
                      placeholderTextColor={'#6B6B6B'}
                      secureTextEntry={true}
                      textAlign='center'
                      onChangeText={(value) => setPassword(value)}
                      onSubmitEditing={Login}
                    />
                  </View>
                  <View style={styles.viewDown}>
                    <TouchableOpacity 
                      onPress={() => Login()}
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
                    {error && 
                      <Text style={styles.textError}>
                        {error}
                      </Text>
                    }                 
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
  )
}

export default SignIn

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
    width: 120, 
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
  }
})
