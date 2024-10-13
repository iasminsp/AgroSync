import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from "react";

export default function tabLayout() {
  const [route, setRoute] = useState('cadastro');
    return (
        <Tabs screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#D9D9D9',
                    borderTopWidth: 0,
                    height: '6%',  // Ajuste da altura da barra de abas
                    width: '97%',  // Ajuste da largura da barra de abas
                    alignSelf: 'center',  // Centralizar a barra
                    borderRadius: 15,  // Opcional: Adiciona cantos arredondados
                },
                tabBarItemStyle: {
                    paddingBottom: '2%',  // Ajuste de espaçamento interno
                    paddingTop: '2%',  // Ajuste de espaçamento interno
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#D9D9D9',
            }}>
            
            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('cadastro'); },
            }}
                name="cadastro"
                options={{
                    tabBarIcon: () => (
                        <AntDesign
                            name="home"
                            size={30}
                            color="#1E4034"
                            style={{
                                borderRadius: 200,
                                backgroundColor: '#FFFFFF00',  // Sem cor de fundo
                                elevation: route === 'cadastro' ? 10 : 0,  // Elevação para sombra
                            }}
                        />
                    ),
                }}
            />

            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('saude'); },
            }}
                name="saude"
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5
                            name="notes-medical"
                            size={24}
                            color="#1E4034"
                            style={{
                                borderRadius: 200,
                                backgroundColor: '#FFFFFF00',  // Sem cor de fundo
                                elevation: route === 'saude' ? 10 : 0,  // Elevação para sombra
                            }}
                        />
                    ),
                }}
            />

            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('despesasFormulario'); },
            }}
                name="despesasFormulario"
                options={{
                    tabBarIcon: () => (
                        <FontAwesome6
                            name="money-bills"
                            size={24}
                            color="#1E4034"
                            style={{
                                borderRadius: 200,
                                backgroundColor: '#FFFFFF00',  // Sem cor de fundo
                                elevation: route === 'despesasFormulario' ? 10 : 0,  // Elevação para sombra
                            }}
                        />
                    ),
                }}
            />

            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('relatorio'); },
            }}
                name="relatorio"
                options={{
                    tabBarIcon: () => (
                        <Ionicons
                            name="document-text-outline"
                            size={24}
                            color="#1E4034"
                            style={{
                                borderRadius: 200,
                                backgroundColor: '#FFFFFF00',  // Sem cor de fundo
                                elevation: route === 'relatorio' ? 10 : 0,  // Elevação para sombra
                            }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
