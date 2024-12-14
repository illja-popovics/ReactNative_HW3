import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

// Getting screen dimensions to set the map size dynamically
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

// Component definition for MapScreen
const MapScreen = ({ item }) => {
  return (
    // Main container for the map
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* MapView to display the map */}
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: 53.5511, // Latitude for Hamburg
          longitude: 9.9937, // Longitude for Hamburg
          latitudeDelta: 0.05, // Latitude span to zoom the map
          longitudeDelta: 0.05, // Longitude span to zoom the map
        }}
        mapType="standard" // Standard map type
        onMapReady={() => console.log("Карта готова")} // Callback when the map is ready
        onRegionChange={() => console.log("Регіон змінився")} // Callback for region changes
      >
        {/* Marker for Hamburg */}
        <Marker
          title="Hamburg"
          coordinate={{
            latitude: 53.5511, 
            longitude: 9.9937, 
          }}
        />
      </MapView>
    </View>
  );
};

// Styles for the map
const styles = StyleSheet.create({
  mapStyle: {
    width: SCREEN_WIDTH, // Full screen width
    height: SCREEN_HEIGHT, // Full screen height
  },
});

export default MapScreen;