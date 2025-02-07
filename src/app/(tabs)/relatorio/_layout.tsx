import { Stack } from 'expo-router'
import React from 'react'

const LayoutRelatorio = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen
          name="relatorioDia"
          options={{ headerShown: false }}
        />
    </Stack>
  )
}

export default LayoutRelatorio