import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'
import Header from '@/components/Header'
import Featured from '@/components/Featured'
import Post from '@/components/Post'

const Home = () => {

  const spool = Array.from({ length: 20 }, (_, i) => i)

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Header title="Home" icon={true} />
      
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 30,
        }}
      >
        <View style={{ gap: 20 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.text }}>
            Top Post
          </Text>
          <Featured />

          <View style={{ gap: 20, marginTop: 10, marginBottom: 30 }}>
            {spool.map((x) => (
              <Post key={x}/>
            ) ) }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Home