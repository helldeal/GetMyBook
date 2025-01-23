import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StatusBar } from "react-native";
import { getAllLibraries } from "../api/library";
import { standardMapType } from "../constants/Utils";

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
  const [markers, setMarkers] = useState<any[]>(getAllLibraries());
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
          // const animateToCoordinat = (lat: number, long: number) => {
          //   mapRef.current?.animateCamera({
          //     center: {
          //       latitude: lat,
          //       longitude: long,
          //     },
          //   });
          // };
          // animateToCoordinat(
          //   location.coords.latitude,
          //   location.coords.longitude
          // );
          setOnCurrentLocation(true);
        }
      };

      getLocation();
    }
  }, [isFocused]);

  return (
    <SafeAreaView className=" flex bg-white w-full h-full dark:bg-[#131f24]">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider="google"
        showsUserLocation
        initialRegion={region}
        customMapStyle={standardMapType}
      >
        {markers &&
          markers.map((point, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude,
                }}
                tracksViewChanges={false}
              ></Marker>
            );
          })}
      </MapView>
    </SafeAreaView>
  );
}
