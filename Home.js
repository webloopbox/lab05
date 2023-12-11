import React, { useState, useRef } from "react";
import { Camera } from "expo-camera";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

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
      // Get existing photo list from AsyncStorage
      const existingPhotos = await AsyncStorage.getItem("photos");
      const parsedExistingPhotos = existingPhotos
        ? JSON.parse(existingPhotos)
        : [];

      // Add the new photo URI to the list
      const updatedPhotos = [...parsedExistingPhotos, capturedImage];

      // Save the updated list back to AsyncStorage
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  cameraContent: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 30,
  },
  buttonContainer: {
    position: "relative",
    flexDirection: "row",
    columnGap: 5,

    justifyContent: "center",
    columnGap: 25,
    width: "80%",
  },
  ctrlButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#7986CB",
  },
  previewContainer: {
    flex: 1,
    rowGap: 10,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "80%",
    height: "60%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#512DA8",
    paddingVertical: 15,
    paddingHorizontal: 20,
    minWidth: 200,
    borderRadius: 5,
  },
  shotButton: {
    width: 70,
    height: 70,
    backgroundColor: "red",
    borderRadius: 50,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
  },
  btnText: {
    color: "white",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
