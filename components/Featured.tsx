import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useMemo, useState } from 'react'
import { COLORS } from '@/constants/colors'
import { useRouter } from 'expo-router';
import { SIZES } from '@/constants/sizes';
import { Bookmark, CheckIcon, Eye, Heart, Trash, X } from 'lucide-react-native';
import { PostType } from '@/types/PostType';
import moment from 'moment';
import { formatDistanceToNow } from 'date-fns';
import { TooltipWrapper } from './TooltipWrapper';
import useAddReaction from '@/hooks/useAddReaction';
import useDeletePost from '@/hooks/useDeletePost';
import { useGetReactions } from '@/hooks/useGetReactions';

// Get screen width dynamically
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Adjust for the 15px horizontal padding in your Home.tsx parent container
const CARD_WIDTH = SCREEN_WIDTH - 60; 

const Featured = ({ post, userToken, userId }: { post: PostType, userToken: boolean, userId: string | null }) => {
    const { mutate: reactToPost } = useAddReaction();
    const { mutate: deletePost, isPending } = useDeletePost();
    const { usePostReactions } = useGetReactions();
    const { data: reactions, isFetching } = usePostReactions(post?.id);

    const [ confirmDelete, setConfirmDelete ] = useState<boolean>(false)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [optimisticLikes, setOptimisticLikes] = useState<number>(0)
    
    
    const router = useRouter()
        
    const formatPostTime = (createdAt: Date) => {
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

    // Handle reactions with optimistic UI update
    const handleReactions = () => {
        if (!userToken) {
            // relocate if not logged in
            router.replace('/(auth)/login')
            return
        }

        try {
            setIsLiked(!isLiked);
            setOptimisticLikes(isLiked ? optimisticLikes - 1 : optimisticLikes + 1);
            
            reactToPost({ postId: post.id, type: isLiked ? 'LIKE' : 'LIKE' });
        } catch (error) {
            setOptimisticLikes(reactions.length);
            setIsLiked(reactions?.some((reaction: any) => reaction.userId === userId));
            console.log(error)
        }
        
    }

    // Handle post deletion
    const handleDelete = (postId: string | number) => {
        deletePost(postId, {
            onSuccess: () => {
                console.log('Post deleted succesfully')
            },
        })
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
            <View style={{ width: '100%', height: post?.imageUrl ? 150 : 'auto', borderRadius: 15, overflow: post?.imageUrl ? 'hidden' : 'visible' }}>
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
                    {/* <View style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }}>
                    <MessageCircle size={SIZES.body3}/>
                    <Text style={{ fontSize: SIZES.body3, color: COLORS.textLight, fontWeight: 'medium' }}>300</Text>
                    </View> */}

                    {/* Like button  */}
                    <TouchableOpacity style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }} onPress={() => handleReactions()}>
                        <Heart size={SIZES.body3} fill={isLiked ? COLORS.accent : "transparent"} stroke={isLiked ? COLORS.accent : COLORS.text} />
                        <Text style={{ fontSize: SIZES.body3, color: isLiked ? COLORS.accent : COLORS.textLight, fontWeight: 'medium' }}>{ userId ? optimisticLikes : reactions?.length }</Text>
                    </TouchableOpacity>
                    
                    {/* Save Post  */}
                    <TouchableOpacity style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }} onPress={() => handleReactions()}>
                        <Bookmark size={SIZES.body3} fill={isLiked ? COLORS.saveColor : "transparent"} stroke={isLiked ? COLORS.saveColor : COLORS.text} />
                        <Text style={{ fontSize: SIZES.body3, color: isLiked ? COLORS.saveColor : COLORS.textLight, fontWeight: 'medium' }}>{ userId ? optimisticLikes : reactions?.length }</Text>
                    </TouchableOpacity>
                    
                    {/* views count  */}
                    <View style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }}>
                        <Eye size={SIZES.body3} />
                        <Text style={{ fontSize: SIZES.body3, color: COLORS.textLight, fontWeight: 'medium' }}>1.1k</Text>
                    </View>
                    {
                        userId === post.author.id && 
                        <TouchableOpacity style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }} onPress={() => confirmDelete ? handleDelete(post?.id) : setConfirmDelete(!confirmDelete)}>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' , display: confirmDelete ? 'flex' : 'none' }}>
                                <X size={SIZES.body3} fill={COLORS.shadow} onPress={() => setConfirmDelete(!confirmDelete)} />
                                {isPending ? <ActivityIndicator color={COLORS.shadow} /> : <CheckIcon size={SIZES.body3} stroke={COLORS.accent} />}
                            </View>
                            <Trash size={SIZES.body3} fill={COLORS.shadow} style={{ display: confirmDelete ? 'none' : 'flex' }} />
                        </TouchableOpacity>
                    }
                </View>

                <TooltipWrapper text={post && formatPostTime(post.createdAt).split(".")[0]}>
                    <Text style={{ fontSize: 12, color: COLORS.textLight }}>{ post && (formatPostTime(post.createdAt).includes('just now') || formatPostTime(post.createdAt).includes('minutes') || formatPostTime(post.createdAt).includes('hour') ? formatPostTime(post.createdAt) : formatPostTime(post.createdAt).split(".")[1]) }</Text>  
                </TooltipWrapper>
            </View>
        </TouchableOpacity>
    )
}

export default Featured;