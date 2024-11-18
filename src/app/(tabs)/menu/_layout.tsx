import { Slot, Stack, Tabs } from 'expo-router'; // Importando o componente Tabs do expo-router para navegação por abas
import React from 'react'; // Importando o React
import { SafeAreaView } from 'react-native'; // Importando o componente SafeAreaView para evitar sobreposição com a barra de status e o notch

const LayoutMenu = () => {
  return (
    // // SafeAreaView para evitar sobreposição com a barra de status e o notch, garantindo que o conteúdo esteja dentro de uma área segura
    // <SafeAreaView style={{ flex: 1 }}>
    //   <Tabs>
    //     <Tabs.Screen 
    //       name="index" // Nome da tela inicial (Menu)
    //       options={{ headerShown: false, title: 'Menu' }} // Opções para a tela inicial: esconde o cabeçalho e define o título como 'Menu'
    //     />
    //     <Tabs.Screen 
    //       name="informacoesVaquinha" // Nome da tela de detalhes da vaquinha
    //       options={{ title: 'Detalhes da Vaquinha' }} // Opções para a tela de detalhes: define o título como 'Detalhes da Vaquinha'
    //     />
    //   </Tabs>
    // </SafeAreaView>
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="InformacoesVaquinha" 
        options={{ headerShown: false }} 
      />
    </Stack>
    // <Slot />
  );
};

export default LayoutMenu;
