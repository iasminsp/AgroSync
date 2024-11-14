import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

const TabsLayout = () => {

  return (
    <>
      <Tabs 
        screenOptions={{
          tabBarShowLabel: false,
          tabBarIconStyle: {
            flex: 1,
            justifyContent: 'center',
            padding: 11,
          },
          tabBarStyle: { 
            backgroundColor: '#D9D9D9',
            flex: 1,
            height: 80,
            position: 'absolute',
            bottom: "0%",
            right: 0,
            left: 0,
            borderRadius: 50,
            shadowColor: '#1E4034',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.35,
            shadowRadius: 3.84,
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarActiveTintColor: '#1E4034',
        }}
      >
        <Tabs.Screen
          name='menu'
          options={{
            tabBarShowLabel: false,
            headerShown: false,
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
            headerShown: false,
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
            headerShown: false,
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
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => {
              if(focused){
                return <Ionicons name="document-text"  size={size} color={color} />
              }
              return <Ionicons name="document-text-outline"  size={size} color={color} />
            }
          }}
        />
      </Tabs>
      <StatusBar
          style="light"
      />
    </>
  )
}

export default TabsLayout