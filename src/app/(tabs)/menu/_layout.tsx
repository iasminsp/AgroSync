import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const LayoutMenu = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
        />
      <Stack.Screen
          name="relatorioDia"
          options={{ headerShown: true }}
          />
    </Stack>
  );
};

export default LayoutMenu;
