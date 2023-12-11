import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SavedImages = () => {
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    loadSavedImages();
  }, []);

  const loadSavedImages = async () => {
    try {
      const storedImages =
        JSON.parse(await AsyncStorage.getItem("photos")) || [];
      setSavedImages(storedImages);
    } catch (error) {
      console.error("Error loading saved images:", error);
    }
  };

  return (
    <View>
      <Text>Saved Images</Text>
      <FlatList
        data={savedImages}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
        )}
      />
    </View>
  );
};
