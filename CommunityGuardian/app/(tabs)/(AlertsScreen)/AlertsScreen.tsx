import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

// TypeScript interface to represent the coordinates object
// TypeScript interface to represent the coordinates object
interface LocationObjectCoords {
  latitude: number| null;
  longitude: number| null;
  altitude?: number | null;  // Allow null as a possible value
  accuracy?: number| null;
  altitudeAccuracy?: number| null;
  heading?: number| null;
  speed?: number| null;
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
        {/* Example Marker for Murang'a Town */}
        <Marker
          coordinate={{ latitude: -0.786, longitude: 37.666 }}
          title="Murang'a Town"
          description="Murang'a County"
        />

        {/* Additional markers around Murang'a Town */}
        <Marker
          coordinate={{ latitude: -0.790, longitude: 37.670 }}
          title="Crime 1"
          description="Description of Crime 1"
        />
        <Marker
          coordinate={{ latitude: -0.795, longitude: 37.660 }}
          title="Crime 2"
          description="Description of Crime 2"
        />
        <Marker
          coordinate={{ latitude: -0.783, longitude: 37.680 }}
          title="Crime 3"
          description="Description of Crime 3"
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

// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import MapView, { Marker, Region } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// // Type for the selected location state
// interface Location {
//   latitude: number;
//   longitude: number;
//   title: string;
// }

// const GooglePlacesSearch: React.FC = () => {
//   // Region type from react-native-maps defines the map's view region
//   const [region, setRegion] = useState<Region>({
//     latitude: -0.786, // Default latitude
//     longitude: 37.666, // Default longitude
//     latitudeDelta: 0.05,
//     longitudeDelta: 0.05,
//   });

//   // Optional location object to hold the selected location details
//   const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

//   const handlePlaceSelect = (data: any, details: any | null) => {
//     if (details && details.geometry && details.geometry.location) {
//       const { lat, lng } = details.geometry.location;

//       // Update region state to move the map to the selected location
//       setRegion({
//         latitude: lat,
//         longitude: lng,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       });

//       // Set the selected location to place a marker
//       setSelectedLocation({
//         latitude: lat,
//         longitude: lng,
//         title: details.name,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Google Places Autocomplete */}
//       <GooglePlacesAutocomplete
//         placeholder="Search for places"
//         fetchDetails={true}  // Fetch details to get lat/lng
//         onPress={handlePlaceSelect}
//         query={{
//           key: 'YOUR_GOOGLE_API_KEY',
//           language: 'en',
//           types: '(cities)', // Restrict to cities
//           location: `${region.latitude},${region.longitude}`,
//           radius: 10000, // 10 km radius
//         }}
//         styles={{
//           container: {
//             flex: 0,
//             position: 'absolute',
//             width: '100%',
//             zIndex: 1,
//             top: 10,
//           },
//           listView: {
//             backgroundColor: 'white',
//           },
//         }}
//       />

//       {/* Map */}
//       <MapView
//         style={styles.map}
//         region={region}
//         showsUserLocation={true}
//       >
//         {selectedLocation && (
//           <Marker
//             coordinate={{
//               latitude: selectedLocation.latitude,
//               longitude: selectedLocation.longitude,
//             }}
//             title={selectedLocation.title}
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

