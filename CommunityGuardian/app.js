import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { AntDesign, FontAwesome, MaterialIcons } from 'react-icons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
    <View className="flex-1 bg-white p-4">
      <View className="mb-4">
        <Text className="text-center text-lg font-semibold">Murang'a, Township</Text>
      </View>
      <View className="grid grid-cols-2 gap-4">
        {/* First Row */}
        <View className="flex justify-center items-center bg-gray-100 p-6 rounded-md shadow-md">
          <AntDesign name="warning" size={32} color="#5D2876" />
          <Text className="text-center mt-2 text-base">Crime Alerts</Text>
        </View>
        <View className="flex justify-center items-center bg-gray-100 p-6 rounded-md shadow-md">
          <FontAwesome name="phone" size={32} color="#5D2876" />
          <Text className="text-center mt-2 text-base">SOS Call Emergency</Text>
        </View>
        {/* Second Row */}
        <View className="flex justify-center items-center bg-gray-100 p-6 rounded-md shadow-md">
          <MaterialIcons name="report" size={32} color="#5D2876" />
          <Text className="text-center mt-2 text-base">Report Crime</Text>
        </View>
        <View className="flex justify-center items-center bg-gray-100 p-6 rounded-md shadow-md">
          <AntDesign name="message1" size={32} color="#5D2876" />
          <Text className="text-center mt-2 text-base">Forum/Feed</Text>
        </View>
        {/* Third Row */}
        <View className="flex justify-center items-center bg-gray-100 p-6 rounded-md shadow-md">
          <FontAwesome name="trophy" size={32} color="#5D2876" />
          <Text className="text-center mt-2 text-base">Rewards</Text>
        </View>
        <View className="flex justify-center items-center bg-gray-100 p-6 rounded-md shadow-md">
          <AntDesign name="user" size={32} color="#5D2876" />
          <Text className="text-center mt-2 text-base">Profile/Account</Text>
        </View>
      </View>
      <View className="mt-6">
        <Text className="text-center text-sm">For any queries, contact Murang'a Police:</Text>
        <Text className="text-center text-red-500 mt-2">Tel: 0716549814</Text>
        <Text className="text-center text-red-500">Email: info.policemurang’a.co.ke</Text>
      </View>
    </View>
  );  

const AlertsScreen = () => (
  <View className="flex-1 justify-center items-center bg-white">
    <Text className="text-2xl">Crime Alerts</Text>
  </View>
);

const ReportScreen = () => (
  <View className="flex-1 justify-center items-center bg-white">
    <Text className="text-2xl">Report Crime</Text>
  </View>
);

const ProfileScreen = () => (
  <View className="flex-1 justify-center items-center bg-white">
    <Text className="text-2xl">Profile/Account</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              return <AntDesign name="home" size={size} color={color} />;
            } else if (route.name === 'Alerts') {
              return <MaterialIcons name="report" size={size} color={color} />;
            } else if (route.name === 'Report') {
              return <FontAwesome name="exclamation-circle" size={size} color={color} />;
            } else if (route.name === 'Profile') {
              return <AntDesign name="user" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: '#5D2876',
          tabBarInactiveTintColor: '#BFBBDE',
          tabBarStyle: { backgroundColor: '#FFFFFF' },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Alerts" component={AlertsScreen} />
        <Tab.Screen name="Report" component={ReportScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
