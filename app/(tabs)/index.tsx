import { View, Text, ActivityIndicator, RefreshControl, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS } from '@/constants/colors'
import Header from '@/components/Header'
import Featured from '@/components/Featured'
import Post from '@/components/Post'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { PostType } from '@/types/PostType'
import { usePosts } from '@/hooks/usePosts'
import NoPost from '@/components/NoPost'
import { AuthContext } from '@/context/AuthContext'
import { useGetUser } from '@/hooks/useGetUser'

const Home = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<PostType[]>([])
  const { useGetPosts, invalidatePosts } = usePosts(); 

  // get user info
  const { useUser } = useGetUser();
  const { data:user } = useUser();

  const { data: posts, isFetching, isLoading } = useGetPosts();

  const { userToken } = useContext(AuthContext)
    
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

  const renderHeader = () => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.text, marginBottom: 20 }}>
        Top Post
      </Text>

      {/* HORIZONTAL LIST FOR FEATURED POSTS */}
      <FlatList
        horizontal // renders list horizontally
        data={featuredPosts}
        keyExtractor={(item) => `featured-${item.id}`}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'flex-start' }}>
            <Featured userToken={userToken} userId={user?.id} post={item} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH - 30 + 15}
        decelerationRate="fast"
        contentContainerStyle={{
            gap: 15,
            alignItems: 'flex-start'
        }}
      />

      <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.text, marginTop: 30 }}>
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
          renderItem={({ item }) => <Post post={item} userToken={userToken} userId={user?.id} />}
          ListHeaderComponent={renderHeader} // Renders Featured Posts
          ListEmptyComponent={<NoPost />} // Handles empty state
          maintainVisibleContentPosition={{
            autoscrollToTopThreshold: 0,
            minIndexForVisible: 0,
          }}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 15,
            paddingTop: 30,
            paddingBottom: tabBarHeight + 30,
            backgroundColor: COLORS.secondary
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