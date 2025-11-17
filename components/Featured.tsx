import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'

const Featured = () => {
  return (
    <TouchableOpacity style={{ backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', boxShadow: `0px 0.5px 4px ${COLORS.shadow}`, borderRadius: 20, padding: 12, gap: 20 }}>
        <View style={{ width: '100%', height: 290, borderRadius: 20, overflow: 'hidden' }}>
            <Image
                source={require('../assets/images/appImages/featured.png')} 
                style={{ width: '100%', resizeMode: 'cover' }}
            />
            <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: COLORS.featuredBg, paddingHorizontal: 4, borderRadius: 40 }}>
                <Text style={{ fontSize: 12, fontWeight: 'semibold', color: COLORS.textLight }}>
                    Peter Tosh
                </Text>
            </View>
        </View>
        
        {/* title and description */}
        <View style={{ width: '100%', gap: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: 'semibold', color: COLORS.text }}>
                The manifestation of the heart&apos;s deepest desires.
            </Text>
            <Text style={{ fontSize: 12, color: COLORS.text }}>
                This is a brief description of the featured post to give users an idea of the content.
            </Text>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }}>
                    <Image 
                        source={require('../assets/icons/comment.png')}
                        style={{ width: 13, height: 13, resizeMode: 'contain' }}
                    />
                    <Text style={{ fontSize: 8, color: COLORS.textLight, fontWeight: 'medium' }}>300</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }}>
                    <Image 
                        source={require('../assets/icons/heart-liked.png')}
                        style={{ width: 13, height: 13, resizeMode: 'contain' }}
                    />
                    <Text style={{ fontSize: 8, color: COLORS.accent, fontWeight: 'medium' }}>800</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }}>
                    <Image 
                        source={require('../assets/icons/eye.png')}
                        style={{ width: 13, height: 13, resizeMode: 'contain' }}
                    />
                    <Text style={{ fontSize: 8, color: COLORS.textLight, fontWeight: 'medium' }}>1.1k</Text>
                </View>
            </View>

            <Text style={{ fontSize: 10, fontWeight: "semibold", color: COLORS.textLight }}>40 mins ago</Text>  
        </View>
    </TouchableOpacity>
  )
}

export default Featured