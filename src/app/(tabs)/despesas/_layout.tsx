import { Stack } from 'expo-router'
import React from 'react'

const LayoutDespesas = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="formularioDia" 
        options={{ headerShown: false }} 
      />
    </Stack>
  )
}

export default LayoutDespesas