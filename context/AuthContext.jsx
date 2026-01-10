import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter()

    // Load token from storage on startup
    useEffect(() => {
        const loadToken = async () => {
            try {
                // check SecureStore for existing token
                const token = await AsyncStorage.getItem('userToken');

                if (token) {
                    setUserToken(token);
                    router.replace('/(auth)/login');
                }
            } catch (err) {
                console.log('Failed to load token', err);
            } finally {
                setLoading(false);
            }
        };
        loadToken();
    }, []);

    const login = async (token) => {
        console.log('Logging in with token:', token);
        setUserToken(token);
        await AsyncStorage.setItem('userToken', token);
    };

    const logout = async () => {
        setUserToken(null);
        await AsyncStorage.removeItem('userToken');
    };

    return (
        <AuthContext.Provider
            value={{ userToken, login, logout, loading, setLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
}