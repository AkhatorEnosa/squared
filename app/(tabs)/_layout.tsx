import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#019874',
        // tabBarStyle: {
        //   backgroundColor: COLORS.white,
        //   borderTopColor: COLORS.border,
        //   borderTopWidth: 1,
        //   height: 60,
        //   paddingTop: 8,
        // },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: '600'
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} /> 
        }} />
      <Tabs.Screen
        name='write'
        options={{
          title: "Write",
          tabBarIcon: ({ color, size }) => <FontAwesome name="pencil" size={size} color={color} /> 
        }} />
      <Tabs.Screen
        name='notifications'
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="notifications" size={size} color={color} /> 
        }} />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> 
        }} />
    </Tabs>
  )
}

export default TabsLayout