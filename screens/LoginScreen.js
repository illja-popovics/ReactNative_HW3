import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { loginDB } from "../utils/auth";
import { useDispatch } from "react-redux";

// Importing the background image
const image = require("../assets/photo_bg.png");

// Component definition for LoginScreen
const LoginScreen = ({ navigation, setLogged }) => {
  // State to manage input values for email and password
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // Function to handle changes in the input fields
  const handleInputChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // State to manage focus styles for email and password inputs
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);

  // State to manage password visibility toggle
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Function to handle the login process
  const onLogin = async () => {
    // Validation to ensure all fields are filled
    if (!inputs.email || !inputs.password) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі необхідні поля");
      return;
    }

    // Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(inputs.email)) {
      Alert.alert(
        "Помилка",
        "Будь ласка, введіть коректну адресу електронної пошти"
      );
      return;
    }

    // Password length validation
    if (inputs.password.length < 6) {
      Alert.alert("Помилка", "Пароль повинен бути не менше 6 символів");
      return;
    }

    // Attempt to log in the user
    try {
      await loginDB({ email: inputs.email, password: inputs.password }, dispatch);
    } catch (err) {
      Alert.alert("Незареєстрований користувач");
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    // Dismiss keyboard when tapping outside the input fields
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Background image for the login screen */}
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          {/* KeyboardAvoidingView to handle keyboard overlap */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
            keyboardVerticalOffset={Platform.OS === "ios" ? -100 : 0}>
            <View style={styles.canva}>
              {/* Screen title */}
              <Text style={styles.title}>Увійти</Text>
              <View style={styles.inputGroup}>
                {/* Email input field */}
                <TextInput
                  style={[styles.input, isEmailFocused && styles.inputFocused]}
                  value={inputs.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
                <View
                  style={[
                    styles.passwordContainer,
                    isPassFocused && styles.inputFocused,
                  ]}>
                  {/* Password input field */}
                  <TextInput
                    style={styles.password}
                    value={inputs.password}
                    onChangeText={(value) =>
                      handleInputChange("password", value)
                    }
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    autoCapitalize="none"
                    secureTextEntry={!isPasswordVisible}
                    onFocus={() => setIsPassFocused(true)}
                    onBlur={() => setIsPassFocused(false)}
                  />
                  {/* Button to toggle password visibility */}
                  <Pressable
                    style={styles.button}
                    onPress={togglePasswordVisibility}>
                    <Text style={styles.buttonText}>
                      {isPasswordVisible ? "Скрыть" : "Показати"}
                    </Text>
                  </Pressable>
                </View>
              </View>
              {/* Login button */}
              <Pressable onPress={onLogin} style={styles.submitButton}>
                <Text style={styles.submitButtonText}> Увійти</Text>
              </Pressable>
              <View style={styles.enterButton}>
                {/* Registration link */}
                <Text style={styles.enterButtonText}>Немає акаунту?</Text>
                <Pressable>
                  <Text
                    style={styles.regLink}
                    onPress={() => navigation.navigate("Registration")}>
                    {" "}
                    Зареєструватися
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
  keyboardContainer: {
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
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    letterSpacing: 0.3,
    marginBottom: 33,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    color: "#212121",
    fontSize: 16,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 27,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 16,
  },
  password: {
    color: "#212121",
    fontSize: 16,
    width: 200,
  },
  submitButton: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
  },
  enterButton: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  enterButtonText: {
    color: "#1B4371",
    fontSize: 16,
  },
  regLink: {
    color: "#1B4371",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  inputFocused: {
    borderColor: "#FF6C00",
  },
});

export default LoginScreen;
