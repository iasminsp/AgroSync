import { Stack } from "expo-router";


export default function saudeLayout() {
    return    (
        <Stack screenOptions={{headerShown: false,}}>
            <Stack.Screen name="index" />
            <Stack.Screen name="Previsao" />
            <Stack.Screen name="Doentes" />
        </Stack>
    )
}