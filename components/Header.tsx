// components/CustomHeader.js
import { COLORS } from '@/constants/colors';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Platform, SafeAreaView, Image } from 'react-native';

const Header = ({ title, icon, identification }: {title?: string, icon?: boolean, identification: boolean}) => {
  return (
    // Use SafeAreaView to handle the notch and status bar area
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Link href="/(tabs)">
            <Image 
                source={require('../assets/images/appImages/logo.png')} 
                style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
        </Link>
        
        <Text style={styles.headerTitle}>{title}</Text>
        
        {
            icon ? (
            <Image 
                source={require('../assets/icons/search.png')} 
                style={{ width: 15, height: 14 }} 
            />
            ) : <View style={{ width: 30, height: 30 }} />
        }
        
        {
            identification &&
            <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Link href="/(auth)/login" style={{ fontSize: 15, fontWeight: 'semibold', color: COLORS.primary, textDecorationLine: 'underline' }}>
                    Login
                </Link>
                <Link href="/(auth)/register" style={{ fontSize: 15, fontWeight: 'semibold', color: COLORS.primary, textDecorationLine: 'underline' }}>
                    Register
                </Link>
            </View>
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: `${COLORS.white}`,
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: 'semibold',
  },
});

export default Header;