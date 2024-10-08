import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter(); // To navigate between screens

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <Text style={styles.locationText}>Muranga, Township</Text>
          <Ionicons name="search-outline" size={20} color="#000" />
        </View>

        {/* Grid Buttons */}
        <View style={styles.gridContainer}>
          {/* Crime Alerts */}
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('./AlertsScreen')}>
            <Ionicons name="map-outline" size={50} color="green" />
            <Text style={styles.gridItemText}>Crime Alerts</Text>
          </TouchableOpacity>

          {/* SOS Call Emergency */}
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('./AlertsScreen')}>
            <Ionicons name="call-outline" size={50} color="green" />
            <Text style={styles.gridItemText}>SOS Call Emergency</Text>
          </TouchableOpacity>

          {/* Report Crime */}
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('./ReportScreen')}>
            <Ionicons name="shield-outline" size={50} color="green" />
            <Text style={styles.gridItemText}>Report Crime</Text>
          </TouchableOpacity>

          {/* Forum/Feed */}
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('./FeedScreen')}>
            <Ionicons name="chatbubbles-outline" size={50} color="green" />
            <Text style={styles.gridItemText}>Forum/Feed</Text>
          </TouchableOpacity>

          {/* Rewards */}
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('./rewards')}>
            <Ionicons name="trophy-outline" size={50} color="green" />
            <Text style={styles.gridItemText}>Rewards</Text>
          </TouchableOpacity>

          {/* Profile/Account */}
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('./ProfileScreen')}>
            <Ionicons name="person-outline" size={50} color="green" />
            <Text style={styles.gridItemText}>Profile/Account</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Information */}
        <Text style={styles.contactText}>
          For Any Queries Contact Murang’a Police Department Through:
        </Text>
        <Text style={styles.contactInfo}>Tel: 0716549814</Text>
        <Text style={styles.contactInfo}>Email: info.policemurang’a.co.ke</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
  },
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  gridItem: {
    width: '47%',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    marginBottom: 16,
  },
  gridItemText: {
    marginTop: 8,
    color: 'green',
  },
  contactText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 32,
  },
  contactInfo: {
    textAlign: 'center',
    color: '#ef4444',
    marginTop: 8,
  },
});
