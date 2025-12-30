import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'
import Header from '@/components/Header'
import Post from '@/components/Post'
import { SIZES } from '@/constants/sizes'
import { usePosts } from '@/hooks/usePosts'
import { PostType } from '@/types/PostType'

const Welcome = () => {
  // const spool = Array.from({ length: 20 }, (_, i) => i)
  
  const { useGetPosts } = usePosts()

  const { data: posts, isLoading, isError, error } = useGetPosts()
  
  // Handle loading state
  if (isLoading) {
    // console.log('Loading posts...', posts)
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
        >
            <Text style={{ fontSize: SIZES.h4, fontFamily: "bold", }}>Hot Topics</Text>

            <View style={{ flex: 1, gap: 20 }}>
                {posts && posts.map((post: PostType) => (
                    <Post key={post.id} post={post} />
                ))}
            </View>
        
            {/* <View style={{ flex: 1, justifyContent: 'center', gap: 20 }}>
                {spool.map((x) => (
                    <Post key={x}/>
                ))}
            </View> */}
        </ScrollView>
    </View>
  )
}

export default Welcome