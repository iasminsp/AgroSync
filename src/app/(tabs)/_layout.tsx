import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState, useContext } from "react";

export default function TabLayout() {
  const [route, setRoute] = useState('menu');
    return (
        <Tabs screenOptions={
            {
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#D9D9D9',
                    borderTopWidth: 0,
                    minHeight: 74,
                },
                tabBarItemStyle: {
                    paddingBottom: 25,
                    paddingTop: 14,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFFF00',
                tabBarInactiveTintColor: '#D9D9D9',
            }
        }>
            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('menu'); },
            }}
                name="menu"
                options={{
                    tabBarIcon: () => <AntDesign name="home"  size={30} color="#1E4034" 
                        style={{
                            borderRadius: 200,
                            backgroundColor: route === 'menu' ? '#FFFFFF' : '#FFFFFF00',
                        }} />
                }} />


            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('saude'); },
            }}
                name="saude"
                options={{
                    tabBarIcon: () => <FontAwesome5 name="notes-medical" size={24} color="#1E4034"
                        style={{
                            borderRadius: 200,
                            backgroundColor: route === 'saude' ? '#FFFFFF' : '#FFFFFF00',
                        }} />
                }} />

            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('despesasFormulario'); },
            }}
                name="despesasFormulario"
                options={{
                    tabBarIcon: () => <FontAwesome6 name="money-bills" size={24}  color="#1E4034"
                        style={{
                            borderRadius: 200,
                            backgroundColor: route === 'despesasFormulario' ? '#FFFFFF' : '#FFFFFF00',
                        }} />
                }} />

            <Tabs.Screen listeners={{
                tabPress: (e) => { setRoute('relatorio'); },
            }}
                name="relatorio"
                options={{
                    tabBarIcon: () => <Ionicons name="document-text-outline" size={24} color="#1E4034"
                        style={{
                            borderRadius: 200,
                            backgroundColor: route === 'relatorio' ? '#FFFFFF' : '#FFFFFF00',
                        }} />
                }} />
        </Tabs>
    )

}
