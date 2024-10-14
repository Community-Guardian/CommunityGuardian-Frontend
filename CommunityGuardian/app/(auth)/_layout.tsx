import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the header
      }}
    >
      <Stack.Screen
        name="Login" // Matches with the login.tsx screen
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="SignUp" // Matches with the signup.tsx screen
        options={{ title: 'Sign Up' }}
      />
       <Stack.Screen
        name="EditProfile" // Matches with the signup.tsx screen
        options={{ title: 'Edit Profile' , headerShown: true,}}
      />
    </Stack>
  );
}
