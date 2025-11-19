import { View, Text, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/Header'
import { COLORS } from '@/constants/colors'
import { Link } from 'expo-router'
import { EyeClosed, Eye } from 'lucide-react-native'
import { SIZES } from '@/constants/sizes'

const Login = () => {
    // const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  return (
            
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
        <Header identification={false} />
      
        <View style={{ flex: 1, paddingTop: 30, gap: 54, paddingHorizontal: 15, backgroundColor: COLORS.white }}>
            <Text style={{ fontSize: 25, fontFamily: 'bold', color: COLORS.text }}>
                Log in to access your account
            </Text>
            
            <View style={{ flex: 1, alignItems: 'center', marginBottom: 54 }}>
                <Image
                    source={require('../../assets/images/appImages/login.png')} 
                    style={{ width: 322, height: 198, resizeMode: 'contain', marginTop: 20 }}
                />
            </View>
            
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ flex: 1, gap: 40, padding: 10, marginTop: 54, backgroundColor: COLORS.white, position: 'relative' }}>
                    <View
                          style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.secondary, borderColor: COLORS.primary, borderWidth: 0.5, borderRadius: 6, paddingHorizontal: 15, paddingVertical: 8 }}
                      >
                        <TextInput
                            placeholder='Email Address'
                            keyboardType='email-address'
                            placeholderTextColor={COLORS.inputPlaceholder}
                            style={{ width: '90%', color: COLORS.primary, fontFamily: "medium", fontSize: SIZES.font }}
                        />
                    </View>
                    <View
                          style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.secondary, borderColor: COLORS.primary, borderWidth: 0.5, borderRadius: 6, paddingHorizontal: 15, paddingVertical: 8 }}
                      >
                        <TextInput
                            placeholder='Confirm Password'
                            keyboardType='default'
                            placeholderTextColor={COLORS.inputPlaceholder}
                            secureTextEntry={!showPassword}
                            style={{ width: '90%', color: COLORS.primary, fontFamily: "medium", fontSize: SIZES.font }}
                        />
                        <TouchableOpacity 
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeClosed size={20} color={COLORS.primary}/> : <Eye size={20} color={COLORS.primary}/>}
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={{ backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: 6, alignItems: 'center' }}>
                        <Text style={{ color: COLORS.white, fontFamily: "medium", fontSize: SIZES.font }}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 12, fontFamily: 'bold', color: COLORS.textLight}}>You are not a member? <Link href={'/(auth)/register'} style={{color: COLORS.primary}}>Register</Link> instead</Text>
                </View>
            </ScrollView>
            
        </View>
    </KeyboardAvoidingView>
  )
}

export default Login