import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import React = require('react')


const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name='sign-in'
          options={{
            headerShown: false,
            
          }}
        />
        <Stack.Screen 
          name='sign-up'
          options={{
            headerShown: false,     
          }}
        />
      </Stack>

      <StatusBar 
        backgroundColor='#1E4034'
        style='light'
      />
    </>
  )
}

export default AuthLayout