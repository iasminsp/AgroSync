import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as Font from 'expo-font';
import { ActivityIndicator, View } from 'react-native';

// Cria um contexto para o carregamento das fontes
const FontContext = createContext(false);

interface FontProviderProps {
  children: ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'EncodeSans': require('../assets/fontes/Encode_Sans_SC/EncodeSansSC-VariableFont_wdth,wght.ttf'),
        'EncodeSansMedium': require('../assets/fontes/Encode_Sans_SC/static/EncodeSansSC-Medium.ttf'),
        'EncodeSansRegular': require('../assets/fontes/Encode_Sans_SC/static/EncodeSansSC-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FontContext.Provider value={fontsLoaded}>
      {children}
    </FontContext.Provider>
  );
};

// Hook para acessar o estado das fontes carregadas
export const useFontsLoaded = () => {
  return useContext(FontContext);
};
