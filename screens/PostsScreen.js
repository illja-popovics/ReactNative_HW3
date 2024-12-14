import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  SafeAreaView,
} from "react-native";
import PostCard from "../Components/PostCard.js";
import { useSelector } from "react-redux";
import { getPosts } from "../utils/store.js";
import { useFocusEffect } from "@react-navigation/native";

// Utility function to fetch posts of a specific user
const fetchUserPosts = async (userId) => {
  try {
    const posts = await getPosts(userId);

    // Ensure the returned data is an array
    if (!Array.isArray(posts)) {
      console.error("Posts is not an array!");
      return [];
    }

    return posts;
  } catch (error) {
    // Log errors for debugging purposes
    console.error("Error in fetchUserPosts:", error);
    return [];
  }
};

// Main screen component to display user posts
const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const photo_block = require("../assets/avatar.jpeg"); // Placeholder image for avatar

  // Get user information from the Redux store
  const user = useSelector((state) => state.user.userInfo);

  // Navigate to the comments screen, passing necessary data
  const navigateToComments = (item) => {
    navigation.navigate("Comments", { item, user, source: "AllPosts" });
  };

  // Navigate to the map screen, passing the selected post as context
  const navigateToMap = (item) => {
    navigation.navigate("Map", { item, source: "AllPosts" });
  };

  // Fetch posts when dependencies (route parameters) change
  useEffect(() => {
    fetchUserPosts(user.uid); // Fetch posts for the current user
  }, [route?.params?.comment, route?.params?.postId]);

  // Use focus effect to reload posts when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadPosts = async () => {
        if (user?.uid) {
          const userPosts = await fetchUserPosts(user.uid); // Fetch posts again
          setPosts(userPosts); // Update the state with fetched posts
        }
      };

      loadPosts(); // Trigger data loading
    }, [user?.uid])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header section displaying user avatar and details */}
        <View style={styles.header}>
          <Image style={styles.avatar} source={photo_block} />
          <View style={styles.user}>
            <Text style={styles.userName}>{user?.displayName}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>

        {/* FlatList to render all posts dynamically */}
        <FlatList
          style={styles.list}
          data={posts} // Posts data
          keyExtractor={(item) => item.id} // Unique key for each post
          renderItem={({ item }) => (
            <PostCard
              item={item} // Pass the post item to the card component
              navigateToComments={() => navigateToComments(item, "Posts")} // Callback for navigating to comments
              navigateToMap={() => navigateToMap(item)} // Callback for navigating to map
            />
          )}
        />
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  user: {
    marginLeft: 16,
  },
  userName: {
    color: "#212121",
    fontSize: 13,
    fontWeight: "bold",
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
  },
  list: {
    flex: 1,
  },
  navigator: {
    flex: 0.1,
    marginBottom: 34,
  },
});

export default PostsScreen;
