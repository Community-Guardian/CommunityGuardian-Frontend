import React from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const AlertsScreen = () => {
  const initialRegion = {
    latitude: -0.786, // Coordinates for Murang'a
    longitude: 37.666,
    latitudeDelta: 0.05, // Zoom level
    longitudeDelta: 0.05,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TextInput
          placeholder="Enter Area City or State"
          style={styles.searchInput}
        />
        <Ionicons name="search-outline" size={24} style={styles.searchIcon} />
      </View>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
       
<Marker
  coordinate={{ latitude: -0.786, longitude: 37.666 }}
  title="Kidnapping"
  description="Murang'a County"
/>


<Marker
  coordinate={{ latitude: -0.8101, longitude: 37.1276 }}
  title="Theft"
  description="Murang'a County"
/>


<Marker
  coordinate={{ latitude: -0.6982, longitude: 36.9559 }}
  title="Robbery"
  description="Murang'a County"
/>


<Marker
  coordinate={{ latitude: -0.6775, longitude: 36.9562 }}
  title="Murder"
  description="Murang'a County"
/>


<Marker
  coordinate={{ latitude: -0.8221, longitude: 37.0931 }}
  title="Assult"
  description="Murang'a County"
/>


<Marker
  coordinate={{ latitude: -0.9321, longitude: 37.0284 }}
  title="Robbery"
  description="Murang'a County"
/>


<Marker
  coordinate={{ latitude: -0.9456, longitude: 37.2502 }}
  title="Fraud"
  description="Murang'a County"
/>


<Marker
  coordinate={{ latitude: -0.6833, longitude: 37.0239 }}
  title="Cyber Crime"
  description="Murang'a County"
/>


<Marker
  coordinate={{ latitude: -0.8149, longitude: 36.9692 }}
  title="Murder"
  description="Murang'a County"
/>


<Marker
  coordinate={{ latitude: -0.9461, longitude: 37.1234 }}
  title="Rape"
  description="Murang'a County"
/>

      </MapView>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingLeft: 15,
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    color: '#888',
  },
  map: {
    flex: 1,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },
});

export default AlertsScreen;
