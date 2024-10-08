import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const FeedScreenLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="FeedScreen"/>
       {/* <Stack.Screen name="profile"  />
       <Stack.Screen name="add-post"  /> */}

    </Stack>
  )
}

export default FeedScreenLayout

const styles = StyleSheet.create({})