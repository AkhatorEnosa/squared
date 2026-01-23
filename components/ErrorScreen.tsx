import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { SIZES } from '@/constants/sizes';
import Header from './Header';

interface ErrorScreenProps {
  error?: string;
  onRetry?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ 
  error = "Something went wrong", 
  onRetry
}) => {
    const router = useRouter();
    
    // retry state
    const [isRetrying, setIsRetrying] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
        <Header icon={false} identification/>
        <View style={styles.content}>
            {/* Animated-like Icon Container */}
            <View style={styles.iconCircle}>
                <Ionicons name="alert-circle-outline" size={80} color={COLORS.error} />
            </View>

            <Text style={styles.title}>Oops!</Text>
            
            <Text style={styles.message}>
                {error || "We encountered an unexpected error. Please try again or head back to the home screen."}
            </Text>

            <View style={styles.buttonContainer}>
                {onRetry && (
                    <TouchableOpacity 
                          style={[styles.button, { backgroundColor: COLORS.primary }]}
                          onPress={() => {
                            setIsRetrying(true);
                            onRetry();
                            
                            setTimeout(() => {
                                setIsRetrying(false);
                            }, 5000);
                          }}
                    >
                    <Text style={styles.buttonText}>
                        {
                            isRetrying ? 
                            <ActivityIndicator color={COLORS.white} size={'small'} />
                            :
                            'Try Again' 
                        }
                    </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity 
                    style={[styles.button, styles.secondaryButton]} 
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text style={[styles.buttonText, { color: COLORS.primary }]}>
                        Back to Home
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 100,
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.secondary, // Light shade of primary/error
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    fontFamily: 'regular',
    color: COLORS.inputPlaceholder,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontSize: SIZES.font,
    fontFamily: 'medium',
    color: COLORS.white,
  },
});

export default ErrorScreen;