import { SafeAreaView, StyleSheet, View, Image, Text, KeyboardAvoidingView, Platform } from "react-native"
import { FontProvider } from "../components/fonts"
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import assets from "../components/imagens"
import SignIn from "./(auth)/sign-in"


const App = () => {
    const logo = assets.logoAgroSync2

    return (
        <FontProvider>
            <GestureHandlerRootView style={styles.gestureHandlerRootView}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingView}
                    behavior={Platform.OS === "ios" ? "padding" : "padding"}
                >
                    <ScrollView 
                        contentContainerStyle={styles.scrollView}
                        // keyboardShouldPersistTaps="handled"
                    >
                        <SafeAreaView style={styles.safeAreaView}>
                            <View style={styles.viewGeral}>
                                <View style={{}}>
                                    <Image style={styles.logo} source={logo} resizeMode="contain" />
                                </View>
                                <Text style={styles.agroSync}>
                                    AgroSync
                                </Text>
                            </View>
                        </SafeAreaView>
                        <SignIn/>
                    </ScrollView>
                </KeyboardAvoidingView>
                <StatusBar
                    style="light"
                />
            </GestureHandlerRootView>
        </FontProvider>
    )
}

export default App

const styles = StyleSheet.create({
    gestureHandlerRootView: {
        flex: 1,
        backgroundColor: '#1E4034',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    safeAreaView: {
        flex: 1,
    },
    scrollView: {
        marginVertical: 'auto',
        height: '100%',
    },
    viewGeral: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        height: 250,
    },
    agroSync: {
        fontFamily: 'EncodeSansRegular',
        fontSize: 50,
        color: '#FFFFF7',
        letterSpacing: 5,
        textAlign: 'center',
        margin: 20,
    }
})