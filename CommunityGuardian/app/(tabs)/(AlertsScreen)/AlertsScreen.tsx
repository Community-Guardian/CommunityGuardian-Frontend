import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// TypeScript interface to represent the coordinates object
interface LocationObjectCoords {
  latitude: number | null;
  longitude: number | null;
  altitude?: number | null;
  accuracy?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

const AlertsScreen = () => {
  const [region, setRegion] = useState({
    latitude: -0.786, // Default coordinates for Murang'a
    longitude: 37.666,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [location, setLocation] = useState<LocationObjectCoords | null>(null); // Use correct type here
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords); // This will now work correctly because `location` state is of the correct type
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

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
        region={region}  // Use the updated region from user location
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
          title="Assault"
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
});

export default AlertsScreen;
