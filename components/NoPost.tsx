import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '@/constants/colors'

const NoPost = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
        <MaterialCommunityIcons
            name="post-outline" 
            size={80} 
            color={COLORS.textLight} 
            style={{ marginBottom: 24, opacity: 0.6 }}
        />
        <Text style={{ color: COLORS.textLight, fontSize: 24, fontWeight: 'semibold' }}>No posts available.</Text>
        <Text style={{ fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginTop: 12, opacity: 0.8,}}>
            Check back later or try refreshing.
        </Text>
        </View>
    )
}

export default NoPost