import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'
import Header from '@/components/Header'
import Post from '@/components/Post'
import { SIZES } from '@/constants/sizes'

const Welcome = () => {
    const spool = Array.from({ length: 20 }, (_, i) => i)

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
            
            <View style={{ flex: 1, justifyContent: 'center', gap: 20 }}>
                {spool.map((x) => (
                    <Post key={x}/>
                ))}
            </View>
        </ScrollView>
    </View>
  )
}

export default Welcome