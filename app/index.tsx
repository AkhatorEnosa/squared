import { View, Text, ScrollView, ActivityIndicator, RefreshControl, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import { COLORS } from '@/constants/colors'
import Header from '@/components/Header'
import Post from '@/components/Post'
import { SIZES } from '@/constants/sizes'
import { usePosts } from '@/hooks/usePosts'
import { PostType } from '@/types/PostType'
import NoPost from '@/components/NoPost'
import { AuthContext } from '@/context/AuthContext'
import ErrorScreen from '@/components/ErrorScreen'

const Welcome = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { useGetPosts, invalidatePosts } = usePosts()

  const { data: posts, isFetching, isLoading, isError, error } = useGetPosts();

  const { userToken } = useContext(AuthContext)

  // on Refresh 
  const onRefresh = () => {
    setIsRefreshing(true);

    // invalidate posts
    invalidatePosts()
    setIsRefreshing(false);
  }

  // Handle error state
  if (isError) {
    return (<ErrorScreen error={error.message} onRetry={() => invalidatePosts()} />)
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gray }}>
      <Header icon={false} identification/>
      {/* if loading or fetching show activity indicator */}
      {
        isLoading || isFetching ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
            <ActivityIndicator size="large" color={COLORS.primary}/>
          </View> :
          <FlatList<PostType>
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Post post={item} userToken={userToken} userId={null} />}
            ListEmptyComponent={<NoPost />} // Handles empty state
            maintainVisibleContentPosition={{
              autoscrollToTopThreshold: 0,
              minIndexForVisible: 0,
            }}
            contentContainerStyle={{
              gap: 10,
              paddingHorizontal: 15,
              paddingTop: 30,
              paddingBottom: 30
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
      }
    </View>
  )
}

export default Welcome