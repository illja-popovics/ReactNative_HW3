import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import CommentIconComponent from "../assets/icons/CommentIconComponent";
import LocationIconComponent from "../assets/icons/LocationIconComponent";
import LikeIconComponent from "../assets/icons/LikeIconComponent";

const PostCard = ({
  item,
  navigateToComments,
  navigateToMap,
  isProfileView = false,
}) => {
  const { title, photo, description, comments, location, likes } = item;
  return (
    <View style={styles.card}>
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.desc}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            navigateToComments(item, isProfileView ? "Profile" : "Post")
          }>
          <CommentIconComponent isProfileView={isProfileView} />
          <Text style={styles.comments}>{comments.length}</Text>
          {isProfileView && (
            <>
              <LikeIconComponent />
              <Text style={styles.comments}>{likes}</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            navigateToMap(item, isProfileView ? "Profile" : "Posts")
          }>
          <LocationIconComponent />
          <Text style={styles.location}>{item.location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 24,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 500,
    margin: 8,
  },
  location: {
    color: "#212121",
    fontFamily: "Roboto",
    fontSize: 16,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationSkipInk: "none",
    textDecorationThickness: "auto",
    textUnderlineOffset: "auto",
    textUnderlinePosition: "from-font",
    marginHorizontal: 8,
  },
  likes: {
    fontSize: 14,
    color: "#888",
    marginHorizontal: 8,
    marginBottom: 4,
  },
  comments: {
    color: "#BDBDBD",
    fontFamily: "Roboto",
    fontSize: 16,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  desc: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PostCard;
