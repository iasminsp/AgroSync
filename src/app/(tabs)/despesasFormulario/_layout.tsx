
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from "expo-router";


export default function despesasFormularioLayout() {
    return    (
        <Stack screenOptions={{headerShown: false,}}>
            <Stack.Screen name="index" />
            <Stack.Screen name="Previsao" />
            <Stack.Screen name="Doentes" />
        </Stack>
    )
}