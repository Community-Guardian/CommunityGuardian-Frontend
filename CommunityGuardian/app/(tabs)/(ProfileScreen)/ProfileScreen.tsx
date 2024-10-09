import React, { useState,useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext'; // Make sure this is the correct path

export default function ProfileScreen() {
  const [isSosEnabled, setIsSosEnabled] = useState(true);
  const { isAuthenticated } = useAuth(); // Access the auth state
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/Login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Avoid rendering anything if not authenticated
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Ionicons name="person-outline" size={40} color="red" />
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <TouchableOpacity>
            <Text style={styles.editProfile}>Edit Profile {'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* General Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>General</Text>
          <TouchableOpacity>
            <Text style={styles.sectionItem}>Help Centre</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sectionItem}>Your Post Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sectionItem}>Send Feedback</Text>
          </TouchableOpacity>
        </View>

        {/* SOS Message Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>SOS Message</Text>
          <View style={styles.sosToggleContainer}>
            <Text style={styles.sectionItem}>Enable SOS Menu bar</Text>
            <Switch
              value={isSosEnabled}
              onValueChange={setIsSosEnabled}
              trackColor={{ true: 'green', false: '#d1d5db' }}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.sectionItem}>Edit SOS Message Content</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.sectionItem}>Additional SOS Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Contacts Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <TouchableOpacity style={styles.addContact}>
            <Ionicons name="add-outline" size={20} color="#000" />
            <Text style={styles.sectionItem}>Add Emergency Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 100, // Adjust this to ensure proper spacing for bottom navigation
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  profileImageContainer: {
    backgroundColor: '#e5e7eb',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 12,
  },
  editProfile: {
    color: 'green',
    marginTop: 8,
  },
  sectionContainer: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    margin: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionItem: {
    fontSize: 16,
    color: '#4b5563',
    paddingVertical: 8,
  },
  sosToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addContact: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    backgroundColor: '#fff',
  },
});
