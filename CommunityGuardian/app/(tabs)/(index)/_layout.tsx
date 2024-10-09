import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack>
       <Stack.Screen name="index" options={{headerShown:false,}} />
       <Stack.Screen name="rewards" />
        <Stack.Screen name="EmergencyScreen"  /> 

    </Stack>
  )
}

export default HomeLayout

const styles = StyleSheet.create({})