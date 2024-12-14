import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { travelCards } from "../mockData.js";
import RemovePhotoComponent from "../assets/icons/RemovePhotoIconComponent";
import LogOutComponent from "../assets/icons/LogOutIconComponent";
import PostCard from "../Components/PostCard.js";
import { updateUserInFirestore } from "../utils/store.js";
import { useSelector } from "react-redux";
import { logoutDB } from "../utils/auth.js";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/userSlice";
import  PensilIconComponent from "../assets/icons/PensilIconComponent.js";
import { getPosts } from "../utils/store.js";

const image = require("../assets/photo_bg.png");
const photo_block = require("../assets/avatar.jpeg");
const posts = travelCards;

const fetchUserPosts = async (userId) => {
  try {
    const posts = await getPosts(userId);

    if (!Array.isArray(posts)) {
      console.error("Posts is not an array!");
      return [];
    }

    return posts;
  } catch (error) {
    console.error("Error in fetchUserPosts:", error);
    return [];
  }
};

const ProfileScreen = ({ navigation, setLogged }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector((state) => {
    return state.user.userInfo;
  });

  useEffect(() => {
    const loadPosts = async () => {
      if (user?.uid) {
        const userPosts = await fetchUserPosts(user.uid);
        setPosts(userPosts);
      }
    };

    loadPosts();
  }, [user?.uid]);

  const handleLogOut = () => {
    logoutDB(dispatch);
  };

  const navigateToComments = (item) => {
    navigation.navigate("Posts", {
      screen: "Comments",
      params: { item, source: "Profile" },
    });
  };
  const navigateToMap = (item) => {
    navigation.navigate("Posts", {
      screen: "Map",
      params: { item, source: "Profile" },
    });
  };

  const handleSave = async () => {
    try {
      await updateUserInFirestore(user.uid, { displayName: userName });
      dispatch(setUserInfo({ ...user, displayName: userName }));
      setIsEditing(false);
      Keyboard.dismiss();
    } catch (error) {
      console.log("Error updating displayName:", error);
    }
  };

  const handleEditPress = () => {
    setUserName(user.displayName || "");
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.canva}>
          <View style={styles.avatarBox}>
            <Image style={styles.avatar} source={photo_block} />
            <RemovePhotoComponent style={styles.addPhoto} />
          </View>
          <TouchableOpacity onPress={handleLogOut} style={styles.logOut}>
            <LogOutComponent />
          </TouchableOpacity>
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.title}>{user.displayName || "anonimus"}</Text>
              {!isEditing && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEditPress}
                >
                  <PensilIconComponent
                    width={20}
                    height={20}
                    style={styles.pencilIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
            {isEditing && (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.input}
                  value={userName}
                  onChangeText={setUserName}
                  placeholder="Enter new name"
                  onSubmitEditing={handleSave}
                  blurOnSubmit={true}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <FlatList
            contentContainerStyle={{ paddingBottom: 16 }}
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PostCard
                item={item}
                isProfileView={true}
                navigateToComments={() => navigateToComments(item)}
                navigateToMap={() => navigateToMap(item, "Profile")}
              />
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  canva: {
    backgroundColor: "rgb(255, 255, 255)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 32,
    height: "70%",
  },
  avatarBox: {
    width: 132,
    height: 120,
    zIndex: 2,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -46 }],
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addPhoto: {
    zIndex: 2,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: 500,
    letterSpacing: 0.3,
    paddingTop: 62,
    paddingBottom: 33,
    letterSpacing: 0.3,
    paddingVertical: 10,
    flexDirection: "row", // Enabling horizontal layout
    // alignItems: "center", // Aligning items vertically
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10, // Space between name and pencil icon
  },
  editButton: {
    marginLeft: 10, 
  },
  pencilIcon: {
    tintColor: "#007AFF", // Color for pencil icon
  },
  editContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    width: "80%",
    marginBottom: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#FF6C00",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  logOut: {
    marginLeft: "auto",
  },
  list: {
    flex: 1,
  },
});

export default ProfileScreen;
