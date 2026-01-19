import { QueryClient, QueryClientProvider,  } from "@tanstack/react-query";
import SafeScreen from "@/components/SafeScreen";
import { SplashScreen, Stack, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import * as Font from 'expo-font';
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { StatusBar } from "react-native";
import { COLORS } from "@/constants/colors";



// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load the custom font files from the local assets folder
        await Font.loadAsync({
          // The key ('MyCustomFont') is the name you'll use in fontFamily styles
          'regular': require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
          'medium': require('@/assets/fonts/montserrat/Montserrat-Medium.ttf'),
          'semibold': require('../assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
          'bold': require('../assets/fonts/montserrat/Montserrat-Bold.ttf'), 
        });
        setFontsLoaded(true);
      } catch (e) {
        // Handle font loading errors
        setFontError(e as Error);
        console.warn('Font loading failed:', e);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  // Handle font loading errors
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // If fonts haven't loaded yet, return null (keep the splash screen visible)
  if (!fontsLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
    </QueryClientProvider>
  )
}

function RootLayoutNav() {
  const { userToken } = useContext(AuthContext); // This will now work!
  const router = useRouter();

  useEffect(() => {
    // Logic for auth-based redirection
    if (userToken) {
      router.replace('/(tabs)');
    }
  }, [userToken, router]);

  return (
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeScreen>
  );
}
