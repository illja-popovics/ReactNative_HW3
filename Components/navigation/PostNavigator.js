import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import PostsScreen from "../../screens/PostsScreen";
import MapScreen from "../../screens/MapScreen";
import CommentsScreen from "../../screens/CommentsScreen";
import BackButtonComponent from "../BackButtonComponent";
import LogOutComponent from "../../assets/icons/LogOutIconComponent";
import { logoutDB } from "../../utils/auth";
import { useDispatch } from "react-redux";

const Posts = createStackNavigator();
const PostNavigator = ({ navigation }) => {
  const dispatch = useDispatch();
  const logOut = () => (
    <TouchableOpacity onPress={handleLogOut}>
      <LogOutComponent />
    </TouchableOpacity>
  );
  const handleLogOut = () => {
    logoutDB(dispatch);
  };

  return (
    <Posts.Navigator
      initialRouteName="AllPosts"
      screenOptions={{
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
      }}>
      <Posts.Screen
        name="AllPosts"
        component={PostsScreen}
        options={{
          headerShown: false,
          title: "Публікації",
          headerRight: () => logOut(setLogged),
        }}
      />
      <Posts.Screen
        name="Map"
        component={MapScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "Мапа",
          headerLeft: () => {
            const source = route.params?.source;
            return (
              <BackButtonComponent
                onPress={() => {
                  if (source === "Profile") {
                    navigation.navigate("Profile");
                  } else {
                    navigation.navigate("AllPosts");
                  }
                }}
              />
            );
          },
        })}
      />
      <Posts.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          title: "Коментарі",
          headerLeft: () => {
            const source = route.params?.source;
            return (
              <BackButtonComponent
                onPress={() => {
                  if (source === "Profile") {
                    navigation.navigate("Profile");
                  } else {
                    navigation.navigate("AllPosts");
                  }
                }}
              />
            );
          },
        })}
      />
    </Posts.Navigator>
  );
};

export default PostNavigator;
