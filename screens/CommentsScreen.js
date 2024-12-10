import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  FlatList,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import uuid from "react-native-uuid";
import ArrowUpIconComponent from "../assets/icons/ArrowUpButton";
import { addCommentToPost } from "../utils/store";

const CommentsScreen = (props) => {
  const item = props.route.params.item;
  const userId = props.route.params.user.uid;
  const [userComment, setUserComment] = useState("");

  const handleSendComment = () => {
    if (!userComment) return;
    const newComment = {
      id: uuid.v4(),
      text: userComment,
      userId: userId,
      timestamp: new Date().toISOString(),
    };
  
    addCommentToPost(userId, item.id, newComment);
    props.navigation.navigate("AllPosts", { userComment, comment: true });
    setUserComment("");
  };

  const sendComment = (
    <TouchableOpacity
      onPress={handleSendComment}
      style={{ position: "absolute", top: 8, right: 16 }}>
      <TouchableOpacity
        onPress={handleSendComment}
        style={{
          borderRadius: 100,
          backgroundColor: "#FF6C00",
          width: 34,
          height: 34,
        }}>
        <ArrowUpIconComponent />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={{ uri: item.photo }} style={styles.image} />
        <FlatList
          style={styles.list}
          data={item.comments || []}
          keyExtractor={(item, index) => item.id || index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.commentsWrapper,
                index % 2 === 0 ? styles.commentEven : styles.commentOdd,
              ]}>
              {index % 2 === 0 && (
                <View style={styles.commentAvatarContainer}>
                  <Text style={styles.commentAvatar}>{item?.author}</Text>
                </View>
              )}
              <View style={styles.commentContainer}>
                <Text style={styles.text}>{item?.text}</Text>
                <Text style={styles.dateTime}>{item?.dateTime}</Text>
              </View>
              {index % 2 !== 0 && (
                <View style={styles.commentAvatarContainer}>
                  <Text style={styles.commentAvatar}>{item?.author}</Text>
                </View>
              )}
            </View>
          )}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          value={userComment}
          placeholder="Коментувати..."
          onChangeText={setUserComment}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSendComment} style={styles.sendButton}>
          <ArrowUpIconComponent />
        </TouchableOpacity>
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
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    borderColor: "#E8E8E8",
    color: "#212121",
    fontSize: 16,
  },
  inputWrapper: {
    borderRadius: 20,
    position: "relative",
    marginBottom: 32,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
  },
  avatar: {
    width: 28,
    height: 28,
  },
  commentBox: {
    flex: 1,
    gap: 16,
    flexDirection: "row",
    marginBottom: 24,
  },
  commentTextBlock: {
    padding: 16,
    borderLeftRadius: 6,
    backgroundColor: "#00000008",
  },

  commentAvatarContainer: {
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
  },
  commentAvatar: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    lineHeight: 18.75,
  },
  commentContainer: {
    flex: 1,
    flexShrink: 1,
    padding: 16,
    gap: 8,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginBottom: 24,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
  dateTime: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
  commentsWrapper: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentEven: {
    flexDirection: "row",
  },
  commentOdd: {
    flexDirection: "row",
  },
  sendButton: {
    position: "absolute",
    right: 16,
    top: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
