import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Interface for coordinates
interface LocationObjectCoords {
  latitude: number | null;
  longitude: number | null;
  altitude?: number | null;
  accuracy?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

interface MarkerData {
  latitude: number;
  longitude: number;
  title: string;
  description: string;
}

const AlertsScreen = () => {
  const [region, setRegion] = useState({
    latitude: -0.786,
    longitude: 37.666,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const markers: MarkerData[] = [
    { latitude: -0.786, longitude: 37.666, title: "Kidnapping", description: "Murang'a County" },
    { latitude: -0.8101, longitude: 37.1276, title: "Theft", description: "Murang'a County" },
    { latitude: -0.6982, longitude: 36.9559, title: "Robbery", description: "Murang'a County" },
    { latitude: -0.6775, longitude: 36.9562, title: "Murder", description: "Murang'a County" },
    { latitude: -0.8221, longitude: 37.0931, title: "Assault", description: "Murang'a County" },
    { latitude: -0.9321, longitude: 37.0284, title: "Robbery", description: "Murang'a County" },
    { latitude: -0.9456, longitude: 37.2502, title: "Fraud", description: "Murang'a County" },
    { latitude: -0.6833, longitude: 37.0239, title: "Cyber Crime", description: "Murang'a County" },
    { latitude: -0.8149, longitude: 36.9692, title: "Murder", description: "Murang'a County" },
    { latitude: -0.9461, longitude: 37.1234, title: "Rape", description: "Murang'a County" },
    { latitude: -0.7265, longitude: 37.6351, title: "Arson", description: "Murang'a County" },
    { latitude: -0.7921, longitude: 37.5523, title: "Domestic Violence", description: "Murang'a County" },
    { latitude: -0.8544, longitude: 37.4987, title: "Bribery", description: "Murang'a County" },
    { latitude: -0.9103, longitude: 37.4622, title: "Human Trafficking", description: "Murang'a County" },
    { latitude: -0.7501, longitude: 37.3123, title: "Illegal Logging", description: "Murang'a County" },
  ];

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
        setRegion((prev) => ({
          ...prev,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        }));
      } catch (error) {
        console.error("Error fetching location:", error);
        setErrorMsg("Failed to fetch location");
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TextInput
          placeholder="Enter Area, City, or State"
          style={styles.searchInput}
        />
        <Ionicons name="search-outline" size={24} style={styles.searchIcon} />
      </View>

      {/* Map */}
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingLeft: 15,
  },
  searchIcon: {
    position: "absolute",
    right: 15,
    color: "#888",
  },
  map: {
    flex: 1,
  },
});

export default AlertsScreen;
