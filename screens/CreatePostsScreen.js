// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
  Text,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import LocationIconComponent from "../assets/icons/LocationIconComponent";
import PhotoIconComponent from "../assets/icons/PhotoIconComponent";
import BasketIconComponent from "../assets/icons/BasketIconComponent";
import { addPost } from "../utils/store";

// Define the main component for creating posts
const CreatePostsScreen = (props) => {
  // Retrieve user data from Redux store
  const user = useSelector((state) => state.user.userInfo);

  // Define state for form inputs and photo URL
  const [inputs, setInputs] = useState({
    title: "",
    location: "",
  });
  const [photoUrl, setPhotoUrl] = useState("");

  // Handle input changes and update the corresponding state
  const handleInputChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Function to take a photo using the camera
  const handleTakePicture = async () => {
    if (camera.current) {
      const picture = await camera.current.takePictureAsync();
      if (picture?.uri) {
        setPhotoUrl(picture.uri);
        await MediaLibrary.createAssetAsync(picture.uri); // Save photo to media library
      }
    }
  };

  // Function to pick an image from the gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri); // Update state with selected image URI

      // Fetch and prepare the image for upload
      const response = await fetch(uri);
      const file = await response.blob();
      const fileName = uri.split('/').pop(); 
      const fileType = file.type; 
      const imageFile = new File([file], fileName, { type: fileType });
      const uploadedImage = await uploadImage(user.uid, imageFile, fileName);
      setUploadedImage(uploadedImage); // Update state with uploaded image URL
    }
  };

  // Function to publish a new post
  const onPublishPhoto = async () => {
    if (isButtonDisabled) {
      alert("Please fill in all fields.");
      return;
    }

    const post = {
      id: uuid.v4(), // Generate a unique ID for the post
      photo: photoUrl || "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: inputs.title,
      comments: [], // Initialize with no comments
      likes: 0, // Initialize with zero likes
      location: inputs.location,
    };

    if (!user) return; // Exit if user is not available

    try {
      await addPost(user?.uid, { ...post }); // Save the post in the database
    } catch (error) {
      console.error('Error adding post:', error);
    }

    props.navigation.navigate("Posts", { post }); // Navigate to the Posts screen
    setInputs({ title: "", location: "" }); // Reset form inputs
    setPhotoUrl(""); // Reset photo URL
  };

  // Function to clear form inputs and photo URL
  const onClean = () => {
    setInputs({ title: "", location: "" });
    setPhotoUrl("");
  };

  // Determine if the "Publish" button should be disabled
  const isButtonDisabled = !(inputs.title.trim() && inputs.location.trim());

  // State and permissions for handling the camera
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // Function to toggle camera facing (front/back)
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // Render the screen layout
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Photo-taking block */}
        <View style={styles.wrapperVertical}>
          <View style={styles.photoBlock}>
            <CameraView style={styles.camera} facing={facing}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleTakePicture} style={styles.photoIcon}>
                  <PhotoIconComponent />
                </TouchableOpacity>
              </View>
            </CameraView>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
          {/* Input for title */}
          <TextInput
            style={styles.input}
            value={inputs.title}
            onChangeText={(value) => handleInputChange("title", value)}
            placeholder="Назва..."
            placeholderTextColor="#BDBDBD"
            keyboardType="default"
            autoCapitalize="none"
          />
          {/* Input for location */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, styles.location]}
              value={inputs.location}
              onChangeText={(value) => handleInputChange("location", value)}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              keyboardType="default"
              autoCapitalize="none"
            />
            <LocationIconComponent style={styles.icon} />
          </View>
          {/* Publish button */}
          <Pressable
            onPress={onPublishPhoto}
            style={[
              styles.activeSubmitButton,
              isButtonDisabled && styles.submitButton,
            ]}>
            <Text
              style={[
                styles.activeSubmitButtonText,
                isButtonDisabled && styles.submitButtonText,
              ]}>
              Опубліковати
            </Text>
          </Pressable>
        </View>
        {/* Clear button */}
        <Pressable
          onPress={onClean}
          style={[
            styles.basketButton
          ]}>
          <BasketIconComponent />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,

    marginHorizontal: 16,
    marginVertical: 32,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  photoBlock: {
    height: 240,
    flexShrink: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  photoIcon: {
    padding: 18,
    backgroundColor: "white",
    borderRadius: 50,
    width: 60,
  },
  upload: {
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    padding: 16,
    paddingHorizontal: 0,
    borderColor: "#E8E8E8",
    color: "#212121",
    fontSize: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: 32,
  },
  location: {
    paddingLeft: 28,
  },
  icon: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: [{ translateY: -20 }],
  },
  submitButtonText: {
    color: "#BDBDBD",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  activeSubmitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
  activeSubmitButton: {
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    color: "#fff",
  },
  button: {
    right: 10,
    bottom: 10,
    position: "absolute",
  },
  basketButton: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
  }
});

export default CreatePostsScreen;