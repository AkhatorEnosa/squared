import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// This grabs the IP address Expo is using to bundle the app
const debuggerHost = Constants.expoConfig?.hostUri?.split(':').shift();

// Set the API URL based on the platform
const API_URL = Platform.OS === 'android' ? `http://${debuggerHost}:3000` : 'http://localhost:3000';

export const apiClient = async (endpoint, options = {}) => {
  const token = await AsyncStorage.getItem('userToken');

  await isTokenExpired(token);

  // default headers
  const headers = {
    ...options.headers,
  };

  // If token exists, add it to headers as Authorization
  if (token) {
    headers['Authorization'] = `${token}`;
  }

  // Only set 'application/json' if the body is NOT FormData.
  // If it is FormData, we delete Content-Type.
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  } else {
    // Ensure we don't accidentally have a Content-Type left over from options.headers
    delete headers['Content-Type'];
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  const contentType = response.headers.get('content-type');
  
  let data;

  // handle response parsing based on content type
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  // Fetch doesn't throw on 404 or 500, so we handle it manually
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Network response was not ok');
  }
  return data;
};

const isTokenExpired = async (token) => {
  try {
    if (!token) return

    const base64Url = token.split('.')[1]; // Get payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    const expired = payload.exp < (Date.now() / 1000);

    if (expired) {
      await AsyncStorage.removeItem('userToken');
    }
  } catch (err) {
    console.error('Failed to decode token', err);
    await AsyncStorage.removeItem('userToken');
  }
}

export default apiClient;