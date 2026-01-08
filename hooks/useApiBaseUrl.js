import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const useApiBaseUrl = () => {
    // This grabs the IP address Expo is using to bundle the app
    const debuggerHost = Constants.expoConfig?.hostUri?.split(':').shift();

    const getApiBaseUrl = () => {
        if (__DEV__) {
            return Platform.OS === 'android' ? `http://${debuggerHost}:3000` : 'http://localhost:3000';
        }
        return 'https://my-production-api.com';
    };

    return { getApiBaseUrl };
}