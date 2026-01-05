import { View, Text, ScrollView, ActivityIndicator, Platform, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS } from '@/constants/colors'
import Header from '@/components/Header'
import Post from '@/components/Post'
import { SIZES } from '@/constants/sizes'
import { usePosts } from '@/hooks/usePosts'
import { PostType } from '@/types/PostType'
import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import NoPost from '@/components/NoPost'

const Welcome = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { userToken, loading } = useContext(AuthContext)
  const router = useRouter()
  
  const { useGetPosts, invalidatePosts } = usePosts()

  const { data: posts, isLoading, isError, error } = useGetPosts()

  useEffect(() => {
    if (userToken) {
      router.replace('/(tabs)')
    }
  }, [userToken, loading])

  // on Refresh 
  const onRefresh = () => {
    setIsRefreshing(true);

    // invalidate posts
    invalidatePosts()
    setIsRefreshing(false);
  }
  
  // Handle loading state
  if (isLoading || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // Handle error state
  if (isError) {
    console.log('Error fetching posts', error)
    return ( <Text>Error loading posts...</Text> )
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <Header icon={false} identification/>
      
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 30,
            paddingBottom: 30,
            flexGrow: 1,
            gap: 10
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
              colors={[COLORS.primary]}
            />
          }
      >
        {!posts || posts.length === 0 ? 
          <NoPost /> :
          <>
            <Text style={{ fontSize: SIZES.h4, fontFamily: "bold", }}>Hot Topics</Text>

            <View style={{ flex: 1, gap: 20 }}>
                {posts && posts.map((post: PostType) => (
                    <Post key={post.id} post={post} />
                ))}
            </View>
          </>
        }
        </ScrollView>
    </View>
  )
}

export default Welcome