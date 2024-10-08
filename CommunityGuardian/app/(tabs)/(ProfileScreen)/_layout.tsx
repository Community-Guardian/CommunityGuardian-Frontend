import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProfileScreenLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="ProfileScreen"/>
       {/* <Stack.Screen name="profile"  />
       <Stack.Screen name="add-post"  /> */}

    </Stack>
  )
}

export default ProfileScreenLayout

const styles = StyleSheet.create({})