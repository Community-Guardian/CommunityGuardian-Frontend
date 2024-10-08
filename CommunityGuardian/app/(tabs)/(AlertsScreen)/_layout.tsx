import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AlertsScreenLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="AlertsScreen" />
       {/* <Stack.Screen name="profile"  />
       <Stack.Screen name="add-post"  /> */}

    </Stack>
  )
}

export default AlertsScreenLayout

const styles = StyleSheet.create({})