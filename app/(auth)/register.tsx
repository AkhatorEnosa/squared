import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants';
import React, { useContext, useState } from 'react'
import Header from '@/components/Header'
import { COLORS } from '@/constants/colors'
import { Link } from 'expo-router'
import { Eye, EyeClosed } from 'lucide-react-native'
import { SIZES } from '@/constants/sizes'
import { AuthContext } from '@/context/AuthContext';

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { login } = useContext(AuthContext);  



    // This grabs the IP address Expo is using to bundle the app
    const debuggerHost = Constants.expoConfig?.hostUri?.split(':').shift();
    
    const getApiBaseUrl = () => {
        if (__DEV__) {
            return Platform.OS === 'android' ? `http://${debuggerHost}:3000` : 'http://localhost:3000';
        }
        return 'https://my-production-api.com';
    };

    const API_BASE_URL = getApiBaseUrl();

    // Handle registration logic here
    const handleRegister = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, confirmPassword }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.message || 'Registration failed. Please try again.';
                setIsLoading(false);
                setMessage(errorMessage)
                return { success: false, error: errorMessage };
            }

            setMessage('Registration successful!');
            login(data.token);
        } catch (error) {
            console.error('Registration error:', error);
            setIsLoading(false);
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }

    }
    

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <Header identification={false} />
            <ScrollView
                contentContainerStyle={{
                flexGrow: 1,
                maxWidth: Platform.OS === 'web' ? 800 : undefined,
                alignSelf: Platform.OS === 'web' ? 'center' : undefined,
                paddingHorizontal: 15,
                paddingTop: 20,
                backgroundColor: COLORS.white,
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                
                <Text style={{ fontSize: 25, marginBottom: 54, color: COLORS.text, fontFamily: 'bold' }}>
                    Be a member to give you access to all the features available.
                </Text>

                {/* Form Section */}
                <View style={{ gap: 20, paddingHorizontal: 10 }}>
                    {/* Full name Input */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.secondary,
                            borderColor: COLORS.primary,
                            borderWidth: 0.5,
                            borderRadius: 6,
                            paddingHorizontal: 15,
                            paddingVertical: 12,
                        }}
                    >
                        <TextInput
                            placeholder="Full Name"
                            keyboardType="default"
                            placeholderTextColor={COLORS.inputPlaceholder}
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="none"
                            style={{
                                flex: 1,
                                color: COLORS.primary,
                                fontFamily: 'medium',
                                fontSize: SIZES.font,
                            }}
                            readOnly={isLoading}
                        />
                    </View>

                    {/* Email Input */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.secondary,
                            borderColor: COLORS.primary,
                            borderWidth: 0.5,
                            borderRadius: 6,
                            paddingHorizontal: 15,
                            paddingVertical: 12,
                        }}
                    >
                        <TextInput
                            placeholder="Email Address"
                            keyboardType="email-address"
                            placeholderTextColor={COLORS.inputPlaceholder}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            style={{
                                flex: 1,
                                color: COLORS.primary,
                                fontFamily: 'medium',
                                fontSize: SIZES.font,
                            }}
                            readOnly={isLoading}
                        />
                    </View>

                    {/* Password Input */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.secondary,
                            borderColor: COLORS.primary,
                            borderWidth: 0.5,
                            borderRadius: 6,
                            paddingHorizontal: 15,
                            paddingVertical: 12,
                        }}
                    >
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor={COLORS.inputPlaceholder}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            style={{
                                flex: 1,
                                color: COLORS.primary,
                                fontFamily: 'medium',
                                fontSize: SIZES.font,
                            }}
                            readOnly={isLoading}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <EyeClosed size={20} color={COLORS.primary} />
                            ) : (
                                <Eye size={20} color={COLORS.primary} />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/*Confirm  Password Input */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.secondary,
                            borderColor: COLORS.primary,
                            borderWidth: 0.5,
                            borderRadius: 6,
                            paddingHorizontal: 15,
                            paddingVertical: 12,
                        }}
                    >
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor={COLORS.inputPlaceholder}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showPassword}
                            style={{
                                flex: 1,
                                color: COLORS.primary,
                                fontFamily: 'medium',
                                fontSize: SIZES.font,
                            }}
                            readOnly={isLoading}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <EyeClosed size={20} color={COLORS.primary} />
                            ) : (
                                <Eye size={20} color={COLORS.primary} />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.primary,
                            paddingVertical: 18,
                            borderRadius: 6,
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={COLORS.white} size={'small'} />
                        ) : (
                            <Text style={{ color: COLORS.white, fontFamily: 'medium', fontSize: SIZES.font}}>
                                Register
                            </Text>
                        )}
                    </TouchableOpacity>

                    {/* Message */}
                    {message !== '' && (
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: 'medium',
                                color:
                                message === 'Login successful!'
                                    ? COLORS.primary
                                    : COLORS.error,
                                textAlign: 'center',
                                marginTop: 10,
                            }}
                        >
                            {message}
                        </Text>
                    )}
                </View>

                {/* Register Link */}
                <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 40 }}>
                    <Text style={{ fontSize: 12, fontFamily: 'bold', color: COLORS.textLight, textAlign: 'center'}}>
                        Already a member?{' '}
                        <Link href="/(auth)/login" style={{ color: COLORS.primary }}>Login</Link>{' '}instead
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
  )
}

export default Register