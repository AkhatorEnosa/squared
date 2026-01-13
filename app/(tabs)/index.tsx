import { View, Text, ScrollView, ActivityIndicator, RefreshControl, AppStateStatus, Platform, AppState, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '@/constants/colors'
import Header from '@/components/Header'
import Featured from '@/components/Featured'
import Post from '@/components/Post'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { PostType } from '@/types/PostType'
import { usePosts } from '@/hooks/usePosts'
import NoPost from '@/components/NoPost'

const Home = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<PostType[]>([])
  const { useGetPosts, invalidatePosts } = usePosts(); 

  const { data: posts, isFetching, isLoading, isError } = useGetPosts();
    
  const tabBarHeight = useBottomTabBarHeight()

  const { width: SCREEN_WIDTH } = Dimensions.get('window');


  useEffect(() => {
    if (posts) {
      // Filter for posts where featured is true
      const featured = posts.filter((post: PostType) => post.featured === true);
      setFeaturedPosts(featured);
    }
  }, [posts]); // Runs every time 'posts' updates

  // refresh control
  const onRefresh = () => {
    setIsRefreshing(true);

    // invalidate posts
    invalidatePosts()
    
    setIsRefreshing(false);
  }

  // Handle error state
  if (isError) {
    return ( <Text>Error loading posts...</Text> )
  }

  const renderHeader = () => (
    <View style={{ gap: 20, marginBottom: 20 }}>
      <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.text }}>
        Top Post
      </Text>

      {/* HORIZONTAL LIST FOR FEATURED POSTS */}
      <FlatList
        horizontal // renders list horizontally
        data={featuredPosts}
        keyExtractor={(item) => `featured-${item.id}`}
        renderItem={({ item }) => (
          <Featured post={item} />
        )}
        showsHorizontalScrollIndicator={false}
        // This makes the cards "snap" to the center/start
        snapToInterval={SCREEN_WIDTH - 30 + 15} // Card Width + Gap
        decelerationRate="fast"
        contentContainerStyle={{ gap: 15 }} // Spacing between featured cards
      />

      <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.text, marginTop: 10 }}>
        Recent
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Header title="Home" icon={true} identification={false} />

      {isLoading || isFetching ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Post post={item} />}
          ListHeaderComponent={renderHeader} // Renders Featured Posts
          ListEmptyComponent={<NoPost />} // Handles empty state
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 15,
            paddingTop: 30,
            paddingBottom: tabBarHeight + 30
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
              colors={[COLORS.primary]}
            />
          }
        />
      )}
    </View>
  )
}

export default Home