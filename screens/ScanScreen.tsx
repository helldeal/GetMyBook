import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, Image, Alert } from "react-native";
import { Camera, CameraView } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEditionFromISBN } from "../api/books";

export default function ScanScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ data }: any) => {
    setScanned(true);
    const edition = await getEditionFromISBN(data);
    if (edition) {
      console.log("Edition: ", edition.title);
      navigation.navigate("EditionScreen", {
        editionKey: edition.key,
      });
    } else {
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle={"light-content"} />
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "code39", "code128"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlayContainer}>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Scanner le Code Bar</Text>
        </View>
      </View>
      <View className="flex justify-center items-center">
        <Image source={require("../assets/scan.png")} className=" w-80 h-80" />
      </View>
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
