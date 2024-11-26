import React from 'react';
import { SafeAreaView } from 'react-native';
import { Tabs } from 'expo-router'; // Importando apenas Tabs

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
