import React from 'react';
import { Stack } from 'expo-router';

const LayoutMenu = () => {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="informacoesVaquinha"
        options={{ headerShown: true }}
      />
    </Stack>
  );
};

export default LayoutMenu;
