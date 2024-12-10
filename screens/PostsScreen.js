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

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const photo_block = require("../assets/avatar.jpeg");

  const user = useSelector((state) => state.user.userInfo);

  const navigateToComments = (item) => {
    navigation.navigate("Comments", { item, user, source: "AllPosts" });
  };

  const navigateToMap = (item) => {
    navigation.navigate("Map", { item, source: "AllPosts" });
  };

  useEffect(() => {
    fetchUserPosts(user.uid);
}, [route?.params?.comment, route?.params?.postId]);

useFocusEffect(
    React.useCallback(() => {
        const loadPosts = async () => {
            if (user?.uid) {
                const userPosts = await fetchUserPosts(user.uid);
                setPosts(userPosts);
            }
        };

        loadPosts();
    }, [user?.uid])
);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.avatar} source={photo_block} />
          <View style={styles.user}>
            <Text style={styles.userName}>{user?.displayName}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCard
              item={item}
              navigateToComments={() => navigateToComments(item, "Posts")}
              navigateToMap={() => navigateToMap(item)}
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
