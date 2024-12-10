import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProfileScreen from "../../screens/ProfileScreen";
import CreatePostsScreen from "../../screens/CreatePostsScreen";
import ProfileIconComponent from "../../assets/icons/ProfileIconComponent";
import AddPostIconComponent from "../../assets/icons/AddPostIconComponent";
import GridIconComponent from "../../assets/icons/GridIconComponent";
import LogOutComponent from "../../assets/icons/LogOutIconComponent";
import PostNavigator from "./PostNavigator";
import BackButtonComponent from "../BackButtonComponent";
import { logoutDB } from "../../utils/auth";
import { useDispatch } from "react-redux";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ setLogged }) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    logoutDB(dispatch);
  };

  const logOut = () => (
    <TouchableOpacity onPress={handleLogOut}>
      <LogOutComponent />
    </TouchableOpacity>
  );

  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "";
    if (routeName === "Comments" || routeName === "Map") {
      return { display: "none" };
    }
    return { display: "flex" };
  };

  const getHeaderVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "";
    return !(routeName === "Comments" || routeName === "Map");
  };

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconColor = focused ? "white" : "#212121";

          if (route.name === "Posts") {
            return <GridIconComponent color={iconColor} size={size} />;
          } else if (route.name === "Profile") {
            return <ProfileIconComponent color={iconColor} size={size} />;
          } else if (route.name === "Add" || route.name === "Posts") {
            return <AddPostIconComponent color={iconColor} size={size} />;
          }
        },

        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },

        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: ({ state }) =>
          isTabVisible(state)
            ? { backgroundColor: "#FFF", height: 80, justifyContent: "center" }
            : { display: "none" },
        tabBarIconStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarButton: (props) => (
          <TouchableOpacity
            {...props}
            style={{
              marginVertical: 17,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View
              style={{
                backgroundColor: props.accessibilityState.selected
                  ? "#FF6C00"
                  : "transparent",
                borderRadius: 20,
                padding: 8,
                justifyContent: "center",
                alignItems: "center",
                width: 70,
                height: 40,
              }}>
              {props.children}
            </View>
          </TouchableOpacity>
        ),
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="Posts"
        options={({ route }) => ({
          title: "Публікації",
          headerRight: logOut,
          tabBarStyle: getTabBarVisibility(route),
          headerShown: getHeaderVisibility(route),
        })}>
        {(props) => <PostNavigator {...props} setLogged={setLogged} />}
      </Tab.Screen>
      <Tab.Screen
        name="Add"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          tabBarStyle: { display: "none" },
          headerShown: true,
          title: "Створити публікацію",
          headerLeft: () => (
            <BackButtonComponent onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        options={() => ({
          tabBarStyle: { display: "flex" },
          headerShown: false,
          title: "Створити публікацію",
          // headerLeft: () => (
          //   <BackButtonComponent onPress={() => navigation.goBack()} />
          // )
        })}>
        {(props) => <ProfileScreen {...props} setLogged={setLogged} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
