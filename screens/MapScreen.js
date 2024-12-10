import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const MapScreen = ({ item }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MapView
  style={styles.mapStyle}
  region={{
    latitude: 53.5511, 
    longitude: 9.9937, 
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }}
  mapType="standard"
  onMapReady={() => console.log("Карта готова")}
  onRegionChange={() => console.log("Регіон змінився")}
>
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
const styles = StyleSheet.create({
  mapStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
export default MapScreen;
