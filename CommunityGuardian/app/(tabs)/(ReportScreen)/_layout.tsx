import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ReportScreenLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="ReportScreen"/>
       {/* <Stack.Screen name="profile"  />
       <Stack.Screen name="add-post"  /> */}

    </Stack>
  )
}

export default ReportScreenLayout

const styles = StyleSheet.create({})