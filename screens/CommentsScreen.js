import React, { useState } from "react"; 
// Importing React and the useState hook for state management.
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
// Importing React Native components for building the UI.
import uuid from "react-native-uuid"; // Importing UUID library for generating unique IDs.
import ArrowUpIconComponent from "../assets/icons/ArrowUpButton"; // Custom component for the "send" icon.
import { addCommentToPost } from "../utils/store"; // Utility function for adding a comment to a post.

const CommentsScreen = (props) => {
  // Extracting post data and user ID from navigation props.
  const item = props.route.params.item; 
  const userId = props.route.params.user.uid; 

  // State to manage the current comment input.
  const [userComment, setUserComment] = useState("");

  // Handles the action of sending a comment.
  const handleSendComment = () => {
    if (!userComment) return; // Prevent sending if the input is empty.

    const newComment = {
      id: uuid.v4(), // Generate a unique ID for the comment.
      text: userComment, // The user's comment text.
      userId: userId, // ID of the user who posted the comment.
      timestamp: new Date().toISOString(), // Timestamp for when the comment was created.
    };

    // Save the comment to the post and navigate back with updated data.
    addCommentToPost(userId, item.id, newComment);
    props.navigation.navigate("AllPosts", { userComment, comment: true });
    setUserComment(""); // Clear the input field after submission.
  };

  // Component for rendering the "send comment" button.
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
        {/* Displaying the post's image */}
        <Image source={{ uri: item.photo }} style={styles.image} />

        {/* List of comments */}
        <FlatList
          style={styles.list}
          data={item.comments || []} // Data source for the FlatList (defaults to empty array if no comments exist).
          keyExtractor={(item, index) => item.id || index.toString()} // Unique key for each comment.
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.commentsWrapper,
                index % 2 === 0 ? styles.commentEven : styles.commentOdd, // Alternate styles for even and odd comments.
              ]}>
              {/* Comment avatar displayed conditionally based on index */}
              {index % 2 === 0 && (
                <View style={styles.commentAvatarContainer}>
                  <Text style={styles.commentAvatar}>{item?.author}</Text>
                </View>
              )}
              <View style={styles.commentContainer}>
                {/* Comment text */}
                <Text style={styles.text}>{item?.text}</Text>
                {/* Timestamp for the comment */}
                <Text style={styles.dateTime}>{item?.dateTime}</Text>
              </View>
              {/* Repeated avatar display for odd comments */}
              {index % 2 !== 0 && (
                <View style={styles.commentAvatarContainer}>
                  <Text style={styles.commentAvatar}>{item?.author}</Text>
                </View>
              )}
            </View>
          )}
        />
      </View>

      {/* Input field and send button for adding new comments */}
      <View style={styles.inputWrapper}>
        <TextInput
          value={userComment} // Bind the input value to the state.
          placeholder="Коментувати..." // Placeholder text for the input field.
          onChangeText={setUserComment} // Update the state as the user types.
          style={styles.input} // Style for the input field.
        />
        <TouchableOpacity onPress={handleSendComment} style={styles.sendButton}>
          <ArrowUpIconComponent /> {/* "Send" icon */}
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
