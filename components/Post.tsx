import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'
import { Link } from 'expo-router'

const Post = () => {
  return (
    <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 16, gap: 10, backgroundColor: COLORS.secondary, borderRadius: 20 }}>
        <View style={{ justifyContent: "space-between", flexDirection: "row", marginBottom: 12 }}>
            <Link href={"/"} style={{ fontSize: 10, fontWeight: "bold" }}>Why I code only in the morning</Link>
            <Text style={{ fontSize: 8, color: COLORS.textLight }}>Feb. 24th, 2021</Text>
        </View>
        
        <Text style={{ fontSize: 10, color: COLORS.text }}>
            I only code in the morning because that&apos;s when my cognitive function peaks. My brain is clearest and least distracted, enabling me to focus on deep work, such as designing complex architecture and solving difficult bugs. This focused effort ensures high-quality output and ...
        </Text>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 8.66, alignItems: 'center' }}>
                <Image 
                    source={require('../assets/images/appImages/profilepic.png')}
                    style={{ width: 20, height: 20, borderRadius: 20, resizeMode: 'cover' }}
                />
                <Text style={{ fontSize: 10, color: COLORS.textLight }}>Sam Cook</Text>
            </View>
            
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
                        source={require('../assets/icons/heart.png')}
                        style={{ width: 13, height: 13, resizeMode: 'contain' }}
                    />
                    <Text style={{ fontSize: 8, color: COLORS.textLight, fontWeight: 'medium' }}>800</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }}>
                    <Image 
                        source={require('../assets/icons/eye.png')}
                        style={{ width: 13, height: 13, resizeMode: 'contain' }}
                    />
                    <Text style={{ fontSize: 8, color: COLORS.textLight, fontWeight: 'medium' }}>1.1k</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default Post