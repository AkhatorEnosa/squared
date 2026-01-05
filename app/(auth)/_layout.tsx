import React, { useContext, useEffect } from 'react'
import { Redirect, Stack, useRouter } from 'expo-router'
import { AuthContext } from '@/context/AuthContext';

const AuthRoutesLayout = () => {
  const { userToken } = useContext(AuthContext)
  const router = useRouter();

  useEffect(() => {
    
    if (userToken) {
      // Redirect to the main app if the user is authenticated
      router.replace('/(tabs)');
    }
  }, [userToken]);

  return (
    <Stack screenOptions={{
      headerShown: false
    }} />
  )
}

export default AuthRoutesLayout