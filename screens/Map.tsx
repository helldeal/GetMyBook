import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
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
      StatusBar.setBarStyle("dark-content");
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
    <SafeAreaView className=" flex bg-white w-full h-full ">
      <StatusBar translucent />
      <MapView
        className="flex-1 absolute top-0 left-0 right-0 bottom-0"
        ref={mapRef}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
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
                title={point.Designation}
                description={point.result_label}
              ></Marker>
            );
          })}
      </MapView>
    </SafeAreaView>
  );
}
