import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const TabsLayout = () => {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBarStyles],
        tabBarActiveTintColor: '#1E4034',
      }}
    >
      <Tabs.Screen
        name='menu'
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size, focused }) => {
            if(focused){
              return <Ionicons name="home-sharp"  size={size} color={color} />
            }
            return <Ionicons name="home-outline"  size={size} color={color} />
          }
        }}
      />
      <Tabs.Screen 
        name='saude'
        options={{
          title: 'Saude',
          tabBarIcon: ({ color, size, focused }) => {
            if(focused){
              return <Ionicons name="medical-sharp"  size={size} color={color} />
            }
            return <Ionicons name="medical-outline"  size={size} color={color} />
          }
        }}
      />
      <Tabs.Screen 
        name='despesas'
        options={{
          title: 'Despesas',
          tabBarIcon: ({ color, size, focused }) => {
            if(focused){
              return <Ionicons name="cash-sharp"  size={size} color={color} />
            }
            return <Ionicons name="cash-outline"  size={size} color={color} />
          }
        }}
      />
      <Tabs.Screen 
        name='relatorio'
        options={{
          title: 'Relatorio',
          tabBarIcon: ({ color, size, focused }) => {
            if(focused){
              return <Ionicons name="document-text"  size={size} color={color} />
            }
            return <Ionicons name="document-text-outline"  size={size} color={color} />
          }
        }}
      />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({
  tabBarStyles: {
    backgroundColor: '#D9D9D9',
    position: 'absolute',
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
    shadowColor: '#1E4034',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  }
})