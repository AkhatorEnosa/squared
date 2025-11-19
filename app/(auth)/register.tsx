import { View, Text, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { COLORS } from '@/constants/colors'
import { Link } from 'expo-router'

const Register = () => {
  return (
            
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
        <Header identification={false} />
      
        <View style={{ flex: 1, paddingTop: 30, gap: 54, paddingHorizontal: 15, backgroundColor: COLORS.white }}>
            <Text style={{ fontSize: 25, fontWeight: 'semibold', color: COLORS.text }}>
                Be a member to give you access to all the features available.
            </Text>
            
            {/* <View style={{ flex: 1, alignItems: 'center', marginBottom: 54 }}>
                <Image
                    source={require('../../assets/images/appImages/login.png')} 
                    style={{ width: 322, height: 198, resizeMode: 'contain', marginTop: 20 }}
                />
            </View> */}
            
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ flex: 1, gap: 40, padding: 10, backgroundColor: COLORS.secondary, position: 'relative' }}>
                    {/* <View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: COLORS.primary }}></View> */}
                    <TextInput
                        placeholder='Full Name'
                        keyboardType='default'
                        placeholderTextColor={COLORS.inputPlaceholder}
                        style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.primary, borderWidth: 0.5, borderRadius: 6, paddingHorizontal: 15, paddingVertical: 18, color: COLORS.primary }}
                    />
                    
                    <TextInput
                        placeholder='Email'
                        keyboardType='email-address'
                        placeholderTextColor={COLORS.inputPlaceholder}
                        style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.primary, borderWidth: 0.5, borderRadius: 6, paddingHorizontal: 15, paddingVertical: 18, color: COLORS.primary }}
                    />
                    
                    <TextInput
                        placeholder='Password'
                        keyboardType='default'
                        placeholderTextColor={COLORS.inputPlaceholder}
                        style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.primary, borderWidth: 0.5, borderRadius: 6, paddingHorizontal: 15, paddingVertical: 18, color: COLORS.primary }}
                    />
                    
                    <TextInput
                        placeholder='Confirm Password'
                        keyboardType='default'
                        placeholderTextColor={COLORS.inputPlaceholder}
                        style={{ backgroundColor: COLORS.secondary, borderColor: COLORS.primary, borderWidth: 0.5, borderRadius: 6, paddingHorizontal: 15, paddingVertical: 18, color: COLORS.primary }}
                    />
                    
                    <TouchableOpacity style={{ backgroundColor: COLORS.primary, paddingVertical: 18, borderRadius: 6, alignItems: 'center' }}>
                        <Text style={{ color: COLORS.white }}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'medium', color: COLORS.textLight}}>You are already a member? <Link href={'/(auth)/login'} style={{color: COLORS.primary}}>Login</Link> instead</Text>
                </View>
            </ScrollView>
            
        </View>
    </KeyboardAvoidingView>
  )
}

export default Register