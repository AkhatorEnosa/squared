import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'
import Header from '@/components/Header'
import Featured from '@/components/Featured'
import Post from '@/components/Post'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { PostType } from '@/types/PostType'
import { usePosts } from '@/hooks/usePosts'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import NoPost from '@/components/NoPost'

const Home = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const { useGetPosts, invalidatePosts } = usePosts(); 

  const { data: posts, isLoading, isError, error } = useGetPosts()
    
  const tabBarHeight = useBottomTabBarHeight()

  // refresh control
  const onRefresh = () => {
    setIsRefreshing(true);

    // invalidate posts
    invalidatePosts()
    
    setIsRefreshing(false);
  }
  
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
      <Header title="Home" icon={true} identification={false} />
      
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 30,
          paddingBottom: tabBarHeight
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
        <View style={{ gap: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.text }}>
            Top Post
          </Text>
          <Featured />

          {!posts || posts.length === 0
            ? <NoPost /> :
            <View style={{ gap: 10, marginTop: 10, marginBottom: 30 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.text }}>Recent</Text>
              {posts && posts.map((post: PostType) => (
                <Post key={post.id} post={post}/>
              ) ) }
            </View>
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Home