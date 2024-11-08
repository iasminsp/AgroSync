import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';

const LayoutMenu = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs>
        <Tabs.Screen 
          name="index" 
          options={{ headerShown: false, title: 'Menu' }} 
        />
        <Tabs.Screen 
          name="informacoesVaquinha" 
          options={{ title: 'Detalhes da Vaquinha' }} 
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default LayoutMenu;
