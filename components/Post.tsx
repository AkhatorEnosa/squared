import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '@/constants/colors'
import { Link } from 'expo-router'
import { SIZES } from '@/constants/sizes'
import { Eye, Heart, MessageCircle } from 'lucide-react-native'

const Post = () => {
    const [ liked, setLiked ] = useState<boolean>(false)
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 16, gap: 10, boxShadow: `0px 0.5px 4px ${COLORS.shadow}`, backgroundColor: COLORS.gray, borderRadius: 20 }}>
          <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: 'center' }}>
            <Link href={"/"} style={{ fontSize: SIZES.body5, textDecorationLine: 'underline', fontFamily: "bold" }}>Why I code only in the morning</Link>
            <Text style={{ fontSize: 10, color: COLORS.textLight, fontFamily: "regular" }}>Feb. 24th, 2021</Text>
        </View>
        
        <Text style={{ fontSize: SIZES.body5, color: COLORS.text, fontFamily: "regular" }}>
            I only code in the morning because that&apos;s when my cognitive function peaks. My brain is clearest and least distracted, enabling me to focus on deep work, such as designing complex architecture and solving difficult bugs. This focused effort ensures high-quality output and ...
        </Text>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 8.66, alignItems: 'center' }}>
                <Image 
                    source={require('../assets/images/appImages/profilepic.png')}
                    style={{ width: 20, height: 20, borderRadius: 20, resizeMode: 'cover' }}
                />
                <Text style={{ fontSize: SIZES.body5, color: COLORS.textLight, fontFamily: "semibold" }}>Sam Cook</Text>
            </View>
            
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }}>
                    <MessageCircle size={SIZES.font}/>
                    <Text style={{ fontSize: SIZES.font, color: COLORS.textLight, fontWeight: 'medium' }}>300</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }} onPress={() => setLiked(!liked)}>
                    {
                        liked ?  
                            <Heart size={SIZES.font} fill={COLORS.accent} stroke={COLORS.accent} /> :
                            <Heart size={SIZES.font} /> 
                    }
                      <Text style={{ fontSize: SIZES.font, color: liked ? COLORS.accent : COLORS.textLight , fontWeight: 'medium' }}>800</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }}>
                    <Eye size={SIZES.font} />
                    <Text style={{ fontSize: SIZES.font, color: COLORS.textLight, fontWeight: 'medium' }}>1.1k</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default Post