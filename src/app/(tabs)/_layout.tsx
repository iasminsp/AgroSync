import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
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
                    tabBarIcon: () => <MaterialIcons name="home" size={30} color="#1E4034"
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
                    tabBarIcon: () => <MaterialIcons name="circle" size={30} color="#1E4034"
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
                    tabBarIcon: () => <MaterialIcons name="money" size={30} color="#1E4034"
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
                    tabBarIcon: () => <MaterialIcons name="add-task" size={30} color="#1E4034"
                        style={{
                            borderRadius: 200,
                            backgroundColor: route === 'relatorio' ? '#FFFFFF' : '#FFFFFF00',
                        }} />
                }} />
        </Tabs>
    )

}
