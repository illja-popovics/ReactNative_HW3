import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native"; 
// Importing necessary React Native components for UI rendering.
import CommentIconComponent from "../assets/icons/CommentIconComponent"; // Custom component for comment icon.
import LocationIconComponent from "../assets/icons/LocationIconComponent"; // Custom component for location icon.
import LikeIconComponent from "../assets/icons/LikeIconComponent"; // Custom component for like icon.

const PostCard = ({
  item, // Represents the post data object.
  navigateToComments, // Function to navigate to the comments screen.
  navigateToMap, // Function to navigate to the map screen.
  isProfileView = false, // Determines whether the card is viewed from the Profile screen or Post screen.
}) => {
  // Destructuring properties from the item object.
  const { title, photo, description, comments, location, likes } = item;

  return (
    <View style={styles.card}>
      {/* Displays the post image */}
      <Image source={{ uri: photo }} style={styles.image} />
      
      {/* Displays the post title */}
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.desc}>
        {/* Comment section with an icon and comment count */}
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            navigateToComments(item, isProfileView ? "Profile" : "Post") // Navigates to comments with context-specific navigation type.
          }>
          <CommentIconComponent isProfileView={isProfileView} /> {/* Comment icon */}
          <Text style={styles.comments}>{comments.length}</Text> {/* Number of comments */}
          
          {/* If in profile view, display likes as well */}
          {isProfileView && (
            <>
              <LikeIconComponent /> {/* Like icon */}
              <Text style={styles.comments}>{likes}</Text> {/* Number of likes */}
            </>
          )}
        </TouchableOpacity>
        
        {/* Location section with an icon and location name */}
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            navigateToMap(item, isProfileView ? "Profile" : "Posts") // Navigates to map with context-specific navigation type.
          }>
          <LocationIconComponent /> {/* Location icon */}
          <Text style={styles.location}>{item.location}</Text> {/* Location name */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the PostCard component
const styles = StyleSheet.create({
  card: {
    borderRadius: 8, // Rounded corners for the card.
    marginBottom: 24, // Space below each card.
    overflow: "hidden", // Ensures content stays within the card's bounds.
  },
  image: {
    width: "100%", // Full width of the card.
    height: 240, // Fixed height for the image.
    borderRadius: 8, // Rounds the image corners.
  },
  title: {
    color: "#212121", // Text color for the title.
    fontFamily: "Roboto", // Font family for the title.
    fontSize: 16, // Font size for the title.
    fontWeight: 500, // Font weight for the title.
    margin: 8, // Space around the title.
  },
  location: {
    color: "#212121", // Text color for the location.
    fontFamily: "Roboto", // Font family for the location text.
    fontSize: 16, // Font size for the location text.
    textDecorationLine: "underline", // Underlined location text.
    marginHorizontal: 8, // Horizontal spacing for location text.
  },
  likes: {
    fontSize: 14, // Font size for likes text.
    color: "#888", // Gray text color for likes.
    marginHorizontal: 8, // Horizontal spacing for likes text.
    marginBottom: 4, // Space below likes text.
  },
  comments: {
    color: "#BDBDBD", // Gray text color for comments.
    fontFamily: "Roboto", // Font family for comments text.
    fontSize: 16, // Font size for comments text.
    marginHorizontal: 8, // Horizontal spacing for comments text.
    marginBottom: 8, // Space below comments text.
  },
  desc: {
    flex: 1, // Flex grow to fill available space.
    flexDirection: "row", // Arranges children in a row.
    justifyContent: "space-between", // Spreads out elements within the row.
  },
});

// Exports the PostCard component for use in other parts of the application.
export default PostCard;