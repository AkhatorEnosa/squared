import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import { formatDistanceToNow } from "date-fns";
import { COLORS } from '@/constants/colors'
import { Link } from 'expo-router'
import { SIZES } from '@/constants/sizes'
import { Eye, Heart, MessageCircle } from 'lucide-react-native'
import { PostType } from '@/types/PostType'

const Post = ({ post }: { post: PostType }) => {
    const [liked, setLiked] = useState<boolean>(false)
    
    function formatPostTime(createdAt: Date) {
        const dist = formatDistanceToNow(new Date(createdAt), {
            addSuffix: false,
        });

        if (dist.includes('less')) {
            return 'just now';
        }

        if (dist.includes('day') || dist.includes('days') || dist.includes('month') || dist.includes('months') || dist.includes('year') || dist.includes('years')) {
            return moment(createdAt).format("Do MMM, YYYY hh:mm a") + ' . ' + moment(createdAt).fromNow();
        }

        return dist + ' ago';
    }
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 16, gap: 10, boxShadow: `0px 0.5px 4px ${COLORS.shadow}`, backgroundColor: COLORS.secondary, borderRadius: 20 }}>
        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: 'center' }}>
            <Link href={"/"} style={{ fontSize: SIZES.body5, textDecorationLine: 'underline', fontFamily: "bold" }}>{ post.title }</Link>
              <Text style={{ fontSize: 10, color: COLORS.textLight, fontFamily: "regular" }}>
                  {formatPostTime(post.createdAt)}</Text>
        </View>
          
        <View style={{ width: '100%', flex: 1, gap: 10, overflow: 'hidden' }}>
            <Text style={{width: '100%', fontSize: SIZES.body5, color: COLORS.text, fontFamily: "regular" }}>
                {post.content}
            </Text>
            {post.imageUrl && 
                 <View style={{ width: '100%', height: 290, borderRadius: 20, borderColor: COLORS.shadow, borderWidth: 1, overflow: 'hidden' }}>
                    <Image
                        source={{ uri: post.imageUrl }}
                        style={{ width: '100%', height: 290, resizeMode: 'cover' }}
                    />
                 </View>
            }
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: 8.66, alignItems: 'center' }}>
                <Image 
                    source={require('../assets/images/appImages/profilepic.png')}
                    style={{ width: 20, height: 20, borderRadius: 20, resizeMode: 'cover' }}
                />
                  <Text style={{ fontSize: SIZES.body5, color: COLORS.textLight, fontFamily: "semibold" }}>{post.author.name}</Text>
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