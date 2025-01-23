import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { StatusBar } from "react-native";

export default function MapScreen({ navigation }: any) {
  const initialRegion = {
    latitude: 47.200819319828305,
    latitudeDelta: 0.05,
    longitude: -1.5608386136591434,
    longitudeDelta: 0.05,
  };
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [onCurrentLocation, setOnCurrentLocation] = useState(false);
  const [region, setRegion] = useState(initialRegion);
  const [markers, setMarkers] = useState<any[]>([]);
  const isFocused = useIsFocused();

  const mapRef = React.useRef<MapView>(null);

  useEffect(() => {
    if (isFocused) {
      console.log("Nav on Map Page");
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
        if (!onCurrentLocation) {
          const animateToCoordinat = (lat: number, long: number) => {
            mapRef.current?.animateCamera({
              center: {
                latitude: lat,
                longitude: long,
              },
            });
          };
          animateToCoordinat(
            location.coords.latitude,
            location.coords.longitude
          );
          setOnCurrentLocation(true);
        }
      };

      getLocation();
    }
  }, [isFocused]);

  return (
    <SafeAreaView
      className=" flex bg-white w-full h-full dark:bg-[#131f24]"
      style={{ paddingTop: -StatusBar.currentHeight!! }}
    >
      <StatusBar translucent />
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider="google"
        showsUserLocation
        initialRegion={region}
      >
        {/* Map View */}
      </MapView>
    </SafeAreaView>
  );
}
