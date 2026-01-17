import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);

    // Load token from storage on startup
    useEffect(() => {
        const loadToken = async () => {
            try {
                // check SecureStore for existing token
                const token = await AsyncStorage.getItem('userToken');

                if (token) {
                    setUserToken(token);
                } else {
                    console.log('No token found')
                }
            } catch (err) {
                console.log('Failed to load token', err);
            }
        };
        loadToken();
    }, []);

    const login = async (token) => {
        // console.log('Logging in with token:', token);
        setUserToken(token);
        await AsyncStorage.setItem('userToken', token);
    };

    const logout = async () => {
        setUserToken(null);
        await AsyncStorage.removeItem('userToken');
    };

    return (
        <AuthContext.Provider
            value={{ userToken, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}