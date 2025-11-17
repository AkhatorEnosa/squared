import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'
import Header from '@/components/Header'

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Header title="Home" icon={true} />
      
      <ScrollView
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
        style={{ 
          paddingTop: 45,
        }}
      >
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: COLORS.text }}>
            Top Post
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default Home