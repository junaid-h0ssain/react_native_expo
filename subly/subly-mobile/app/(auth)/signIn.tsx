import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const signIn = () => {
  return (
    <View>
      <Text>signIn</Text>
      <Link href="/(tabs)" className="mt-4 px-4 py-2 bg-white  rounded">
        Go to Tabs
      </Link>
    </View>
  )
}

export default signIn