import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native';
import { COLORS } from '@/constants/colors';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#019874',
        tabBarInactiveTintColor: '#5F5F5F',
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          boxShadow: `0 0 5px ${COLORS.shadow}`,
          // position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          marginTop: -2,
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
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/appImages/profilepic.png')}        // active icon
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: focused ? 2 : 0,
                borderColor: focused ? '#019874' : 'transparent',
              }}
              />
            )
        }}
        />
    </Tabs>
  )
}

export default TabsLayout