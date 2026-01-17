import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { COLORS } from '@/constants/colors'
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { SIZES } from '@/constants/sizes';
import { Eye, Heart, MessageCircle } from 'lucide-react-native';
import { PostType } from '@/types/PostType';
import moment from 'moment';
import { formatDistanceToNow } from 'date-fns';
import { TooltipWrapper } from './TooltipWrapper';

// Get screen width dynamically
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Adjust for the 15px horizontal padding in your Home.tsx parent container
const CARD_WIDTH = SCREEN_WIDTH - 60; 

interface FeaturedProps {
    post?: PostType; 
}

const Featured = ({ post }: FeaturedProps) => {
    const [liked, setLiked] = useState(false)
    const router = useRouter();

        
    function formatPostTime(createdAt: Date) {
        const dist = formatDistanceToNow(new Date(createdAt), {
            addSuffix: false,
        });

        if (dist.includes('less')) {
            return 'just now';
        }

        if (dist.includes('day') || dist.includes('days') || dist.includes('month') || dist.includes('months') || dist.includes('year') || dist.includes('years')) {
            return moment(createdAt).format("Do MMM, YYYY @ hh:mm a") + ' . ' + moment(createdAt).fromNow();
        }

        return dist + ' ago';
    }

    return (
        <TouchableOpacity 
            style={{ 
                backgroundColor: COLORS.gray, 
                borderWidth: 1,
                borderColor: COLORS.border,
                width: CARD_WIDTH, // Forces max width minus parent padding
                borderRadius: 20, 
                padding: 12, 
                gap: post?.imageUrl && 15,
            }} 
            // onPress={logoutUser}
        >
            <View style={{ width: '100%', height: post?.imageUrl ? 250 : 'auto', borderRadius: 15, overflow: post?.imageUrl ? 'hidden' : 'visible' }}>
                {post?.imageUrl && <Image
                    source={post?.imageUrl ? { uri: post?.imageUrl } : require('../assets/images/appImages/featured.png')}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />}
                <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 40 }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: COLORS.white }}>
                        {post?.author.name || 'Anonymous'}
                    </Text>
                </View>
            </View>
            
            <View style={{ width: '100%', gap: 6 }}>
                <Text numberOfLines={2} style={{ fontSize: SIZES.h2, fontWeight: '600', color: COLORS.text, textTransform: 'capitalize' }}>
                    {post?.title || "The manifestation of the heart's deepest desires."}
                </Text>
                <Text numberOfLines={2} style={{ fontSize: SIZES.body3, color: COLORS.textLight, fontFamily: "regular" }}>
                    {post?.content || "This is a brief description of the featured post."}
                </Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: !post?.imageUrl ? 15 : 'auto' }}>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                        <MessageCircle size={18} color={COLORS.textLight}/>
                        <Text style={{ fontSize: 13, color: COLORS.textLight }}>300</Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }} onPress={() => setLiked(!liked)}>
                        <Heart size={18} fill={liked ? COLORS.accent : 'transparent'} stroke={liked ? COLORS.accent : COLORS.textLight} />
                        <Text style={{ fontSize: 13, color: liked ? COLORS.accent : COLORS.textLight }}>800</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                        <Eye size={18} color={COLORS.textLight} />
                        <Text style={{ fontSize: 13, color: COLORS.textLight }}>1.1k</Text>
                    </View>
                </View>

                <TooltipWrapper text={post && formatPostTime(post.createdAt).split(".")[0]}>
                    <Text style={{ fontSize: 12, color: COLORS.textLight }}>{ post && (formatPostTime(post.createdAt).includes('just now') || formatPostTime(post.createdAt).includes('minutes') || formatPostTime(post.createdAt).includes('hour') ? formatPostTime(post.createdAt) : formatPostTime(post.createdAt).split(".")[1]) }</Text>  
                </TooltipWrapper>
            </View>
        </TouchableOpacity>
    )
}

export default Featured;