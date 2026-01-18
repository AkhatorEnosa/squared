import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment';
import { formatDistanceToNow } from "date-fns";
import { COLORS } from '@/constants/colors'
import { Link, useRouter } from 'expo-router'
import { SIZES } from '@/constants/sizes'
import { CheckIcon, Eye, Heart, Trash, X } from 'lucide-react-native'
import { PostType } from '@/types/PostType'
import { SvgUri } from 'react-native-svg';
import { TooltipWrapper } from './TooltipWrapper';
import useDeletePost from '@/hooks/useDeletePost';
import useAddReaction from '@/hooks/useAddReaction';
import { useGetReactions } from '@/hooks/useGetReactions';

const Post = ({ post, userToken, userId }: { post: PostType, userToken: boolean, userId: string }) => {
    const { mutate: reactToPost } = useAddReaction();
    const { mutate: deletePost, isPending } = useDeletePost();
    const { usePostReactions, invalidateReactions } = useGetReactions();
    const { data: reactions } = usePostReactions(post?.id);

    const [ confirmDelete, setConfirmDelete ] = useState<boolean>(false)
    const [ isLiked,  setIsLiked ] = useState<boolean>(reactions?.some((reaction: any) => reaction.userId === userId))
    const [ optimisticLikes, setOptimisticLikes ] = useState<number>(reactions?.length || 0)


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
        }
        
    }

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
            paddingHorizontal: 10, 
            paddingVertical: 16,
            gap: 10,
            boxShadow: `0px 0.5px 4px ${COLORS.shadow}`,
            borderWidth: 1,
            borderColor: COLORS.border,
            borderRadius: 20 
        }}
    >
        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: 'center' }}>
            <Link href={"/"} style={{ fontSize: SIZES.h4, fontFamily: "bold", textTransform: 'capitalize' }}>{ post.title }</Link>
            
            <TooltipWrapper text={post && formatPostTime(post.createdAt).split(".")[0]}>
                <Text style={{ fontSize: 12, color: COLORS.textLight }}>{ post && (formatPostTime(post.createdAt).includes('just now') || formatPostTime(post.createdAt).includes('minutes') || formatPostTime(post.createdAt).includes('hour')) ? formatPostTime(post.createdAt) : formatPostTime(post.createdAt).split(".")[1] }</Text>  
            </TooltipWrapper>
        </View>
          
        <View style={{ width: '100%', flex: 1, gap: 10, overflow: 'hidden' }}>
            <Text style={{width: '100%', fontSize: SIZES.body4, color: COLORS.text, fontFamily: "regular" }}>
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
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', gap: 10, borderWidth:1, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 5 }}>
                {/* <View style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }}>
                    <MessageCircle size={SIZES.body4}/>
                    <Text style={{ fontSize: SIZES.body4, color: COLORS.textLight, fontWeight: 'medium' }}>300</Text>
                </View> */}
                <TouchableOpacity style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }} onPress={() => handleReactions()}>
                    <Heart size={SIZES.body4} fill={isLiked ? COLORS.accent : "transparent"} stroke={isLiked ? COLORS.accent : COLORS.text} />
                    <Text style={{ fontSize: SIZES.body4, color: isLiked ? COLORS.accent : COLORS.textLight, fontWeight: 'medium' }}>{ optimisticLikes }</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }}>
                    <Eye size={SIZES.body4} />
                    <Text style={{ fontSize: SIZES.body4, color: COLORS.textLight, fontWeight: 'medium' }}>1.1k</Text>
                </View>
                {
                    userId === post.author.id && 
                    <TouchableOpacity style={{ flexDirection: 'row', gap: 4.25, alignItems: 'center', width: 'auto' }} onPress={() => confirmDelete ? handleDelete(post?.id) : setConfirmDelete(!confirmDelete)}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' , display: confirmDelete ? 'flex' : 'none' }}>
                            <X size={SIZES.body4} fill={COLORS.shadow} onPress={() => setConfirmDelete(!confirmDelete)} />
                            {isPending ? <ActivityIndicator color={COLORS.shadow} /> : <CheckIcon size={SIZES.body4} stroke={COLORS.accent} />}
                        </View>
                        <Trash size={SIZES.body4} fill={COLORS.shadow} style={{ display: confirmDelete ? 'none' : 'flex' }} />
                    </TouchableOpacity>
                }
            </View>
            
            <View style={{ flexDirection: 'row', gap: 8.66, alignItems: 'center' }}>
                <View style={{ width: 20, height: 20, borderRadius: 20, overflow: 'hidden', backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, justifyContent: 'center', alignItems: 'center' }}>
                    <SvgUri
                        style={{ width: 20, height: 20 }}
                        uri={post?.author.profile?.userImageUrl || 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=' + post.author.name}
                    />
                </View>
                <Text style={{ fontSize: SIZES.body5, color: COLORS.textLight, fontFamily: "semibold" }}>{post.author.name}</Text>
            </View>
        </View>
            
    </TouchableOpacity>
  )
}

export default Post