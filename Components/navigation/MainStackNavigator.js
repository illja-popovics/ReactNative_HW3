import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import RegistrationScreen from "../../screens/RegistrationScreen";
import LoginScreen from "../../screens/LoginScreen";

const MainStack = createStackNavigator();

const MainStackNavigator = ({ setLogged }) => (
  <MainStack.Navigator initialRouteName="Login">
    <MainStack.Screen name="Login" options={{ headerShown: false }}>
      {(props) => <LoginScreen {...props} />}
    </MainStack.Screen>
    <MainStack.Screen
      name="Registration"
      component={RegistrationScreen}
      options={{ headerShown: false }}
    />
  </MainStack.Navigator>
);

export default MainStackNavigator;
