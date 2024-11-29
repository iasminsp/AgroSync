import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './screens/Index';
import InformacoesVaquinha from './screens/InformacoesVaquinha';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="InformacoesVaquinha" component={InformacoesVaquinha} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
