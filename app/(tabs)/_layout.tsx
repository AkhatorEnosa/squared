import React, { useContext, useEffect, useState } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { BlurView } from 'expo-blur';
import { AuthContext } from '@/context/AuthContext';
import { useGetUser } from '@/hooks/useGetUser';
import { SvgUri } from 'react-native-svg';
import { View } from 'react-native';
import { ProfileModal } from '@/components/ProfileModal';
import ErrorScreen from '@/components/ErrorScreen';

const TabsLayout = () => {
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);

  const { userToken, logout } = useContext(AuthContext)
  const router = useRouter();

  const { useUser, invalidateUser } = useGetUser();

  const { data: user, isFetching, isLoading, isError, error } = useUser();
  
  useEffect(() => {
    if (!userToken) {
      // Redirect to the login page if the user is not authenticated
      router.replace('/(auth)/login');
    }
  }, [userToken, router]);
  
  // Handle error state
  if (isError) {
    console.log('Error fetching user', error)
    return (<ErrorScreen error={error.message} onRetry={() => invalidateUser()} />)
  }
  
  
  return (
    <>
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
        isFetching || isLoading ? null : user &&
        <Tabs.Screen
          name='profile'
          options={{
            title: user?.name ? user?.name.split(' ')[0] : 'profile',
            tabBarIcon: ({ focused, color, size }) => (
              !user || isFetching || isLoading ? 
                <FontAwesome name="user-circle"  size={size} color={color} />
                   :
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
                    uri={user?.profile?.userImageUrl || 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=' + user?.name}
                  />
              </View>
            )
          }}
          listeners={{
            tabPress: (e) => {
              // Prevent default navigation
              e.preventDefault();
              setProfileModalVisible(true); 
            },
          }}
        />
      }
    </Tabs>

    {/* profile modal  */}
    <ProfileModal 
        visible={profileModalVisible} 
        onClose={() => setProfileModalVisible(false)} 
        onLogout={logout}
        user={user}
      />
    </>
  )
}

export default TabsLayout