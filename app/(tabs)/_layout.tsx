import React, { useContext, useEffect } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { BlurView } from 'expo-blur';
import { AuthContext } from '@/context/AuthContext';
import { useGetUser } from '@/hooks/useGetUser';
import { SvgUri } from 'react-native-svg';
import { View } from 'react-native';

const TabsLayout = () => {
  const { userToken } = useContext(AuthContext)
  const router = useRouter();

  const { useUser } = useGetUser();

  const { data, isFetching, isLoading, isError, error } = useUser();
  
  useEffect(() => {
    if (!userToken) {
      // Redirect to the login page if the user is not authenticated
      router.replace('/(auth)/login');
    }
  }, [userToken, router]);
  
  // Handle error state
  if (isError) {
    console.log('Error fetching user', error)
    // return ( <Text>Error loading posts...</Text> )
  }
  
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          boxShadow: `0 0 5px ${COLORS.shadow}`,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          marginTop: -2,
          fontFamily: 'semibold'
        },
        tabBarBadgeStyle: {
          color: COLORS.white,
          backgroundColor: COLORS.primary,
          borderWidth: 1,
          borderColor: COLORS.white
        },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={100}
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
          />
        ),
        animation: "shift"
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
          tabBarIcon: ({ color, size }) => <MaterialIcons name="notifications" size={size} color={color} />,
          tabBarBadge: 3,
        }} />
      {
        isFetching || isLoading ? null : data &&
        <Tabs.Screen
          name='profile'
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <View 
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: focused ? 2 : 0,
                    borderColor: focused ? '#019874' : 'transparent',
                    backgroundColor: COLORS.border,
                  }}>
                <SvgUri
                    uri={data?.profile?.userImageUrl || 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=' + data?.name}
                  />
              </View>
            )
          }}
        />
      }
    </Tabs>
  )
}

export default TabsLayout