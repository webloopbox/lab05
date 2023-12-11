import React, { useState, useRef } from "react";
import { Camera } from "expo-camera";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles/home";

export const Home = () => {
  const { navigate } = useNavigation();
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraMode, setCameraMode] = useState(false);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const photo = await cameraRef.current.takePictureAsync(options);
      setCapturedImage(photo.uri);
      setCameraMode(false);
    }
  };

  const saveToStorage = async () => {
    try {
      const existingPhotos = await AsyncStorage.getItem("photos");
      const parsedExistingPhotos = existingPhotos
        ? JSON.parse(existingPhotos)
        : [];

      const updatedPhotos = [...parsedExistingPhotos, capturedImage];

      await AsyncStorage.setItem("photos", JSON.stringify(updatedPhotos));

      console.log("Saved to storage:", capturedImage);
      setCapturedImage(null);
    } catch (error) {
      console.error("Error saving to storage:", error);
    }
  };

  const cancelPreview = () => {
    setCapturedImage(null);
  };

  return (
    <View style={styles.container}>
      {cameraMode ? (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={(ref) => (cameraRef.current = ref)}
        >
          <View style={styles.cameraContent}>
            <TouchableOpacity
              style={styles.shotButton}
              onPress={takePicture}
            ></TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCameraMode(false)}
              style={styles.closeCamera}
            >
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.previewContainer}>
          {capturedImage ? (
            <>
              <Image
                source={{ uri: capturedImage }}
                style={styles.previewImage}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.ctrlButton}
                  onPress={cancelPreview}
                >
                  <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.ctrlButton}
                  onPress={saveToStorage}
                >
                  <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Pressable
                style={styles.button}
                onPress={() => setCameraMode(true)}
              >
                <Text style={styles.btnText}>Zrób zdjęcie</Text>
              </Pressable>
            </>
          )}
          <Pressable
            style={styles.button}
            onPress={() => {
              navigate("SavedImages");
            }}
          >
            <Text style={styles.btnText}>Saved Images</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
