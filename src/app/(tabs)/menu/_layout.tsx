import { Stack } from 'expo-router'
import React from 'react'

const LayoutMenu = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
    </Stack>
  )
}

export default LayoutMenu