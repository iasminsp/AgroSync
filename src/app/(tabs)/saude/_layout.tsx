import { Stack } from 'expo-router'
import React from 'react'

const LayoutSaude = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
    </Stack>
  )
}

export default LayoutSaude