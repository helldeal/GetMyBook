import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { useIcs } from "../hooks/icsProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEvents } from "../hooks/eventsProvider";

export default function ScanScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { ics, setIcs } = useIcs();
  const { setEvents } = useEvents();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ data }: any) => {
    if (!data.includes(".ics")) return;
    setScanned(true);

    if (ics != data) {
      console.log("clear events");
      setEvents([]);
    }
    console.log("store ics");
    AsyncStorage.setItem("ics", data);
    console.log("set new ics");
    setIcs(data);
    navigation.navigate("Home");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlayContainer}>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Scan the QR code</Text>
        </View>
      </View>
      <View className="flex justify-center items-center">
        <Image source={require("../assets/scan.png")} className=" w-80 h-80" />
      </View>
      {/* <TouchableOpacity
      className="absolute bottom-10"
      onPress={() => console.log("URL Manuellement")}
      >
      <Text>URL Manuellement</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  overlayContainer: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
  overlayText: {
    color: "white",
    fontSize: 18,
  },
});
