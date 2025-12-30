import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// This grabs the IP address Expo is using to bundle the app
const debuggerHost = Constants.expoConfig?.hostUri?.split(':').shift();

// Set the API URL based on the platform
const API_URL = Platform.OS === 'android' ? `http://${debuggerHost}:3000` : 'http://localhost:3000';

console.log("Connecting to:", API_URL);

export const apiClient = async (endpoint, options = {}) => {
  const token = await AsyncStorage.getItem('userToken');

  // default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // If token exists, add the Bearer prefix for your authMiddleware
  if (token) {
    headers['Authorization'] = `${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  // Fetch doesn't throw on 404 or 500, so we handle it manually
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Network response was not ok');
  }
    
  return data;
};

export default apiClient;