import {
  View,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function CameraScreen() {
  const router = useRouter();
  const cameraRef = useRef<any>(null);

  const [permission, requestPermission] = useCameraPermissions();

  // =========================
  // CAPTURE PHOTO
  // =========================
  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );

      router.push({
        pathname: "/result",
        params: {
          image: photo.uri,
        },
      });
    } catch (e) {
      console.log("capture error:", e);
    }
  };

  // =========================
  // PERMISSION
  // =========================
  if (!permission) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff", marginBottom: 10 }}>
          Camera permission required
        </Text>

        <Pressable onPress={requestPermission}>
          <Text style={{ color: "#4DA6FF" }}>
            Grant Permission
          </Text>
        </Pressable>
      </View>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <View style={styles.container}>
      {/* CAMERA */}
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
      />

      {/* BACK BUTTON */}
      <Pressable
        style={styles.backBtn}
        onPress={() => router.back()}
      >
        <IconSymbol name="arrow.left" size={22} color="#fff" />
      </Pressable>

      {/* CAPTURE BUTTON */}
      <View style={styles.bottom}>
        <Pressable onPress={handleCapture}>
          <View style={styles.captureOuter}>
            <View style={styles.captureInner} />
          </View>
        </Pressable>
      </View> 
    </View>
  );
}

// =========================ss
// STYLE
// =========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  bottom: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },

  captureOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
});