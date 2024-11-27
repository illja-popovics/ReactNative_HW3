import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  StatusBar,
} from "react-native";

import AddPhotoComponent from "../assets/icons/AddPhotoComponent";
const image = require("../assets/photo_bg.png");
const photoBlock = null;

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onRegistration = () => {
    if (!email || !password || !login) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі необхідні поля");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert(
        "Помилка",
        "Будь ласка, введіть коректну адресу електронної пошти"
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert("Помилка", "Пароль повинен бути не менше 6 символів");
      return;
    }
    Alert.alert("Тест", `${login} + ${email} + ${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screenContainer}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <ImageBackground source={image} resizeMode="cover" style={styles.background}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardWrapper}
            keyboardVerticalOffset={Platform.OS === "ios" ? -100 : 0}>
            <View style={styles.formContainer}>
              <View style={styles.avatarWrapper}>
                <Image style={styles.avatar} source={photoBlock} />
                <AddPhotoComponent style={styles.photoIcon} />
              </View>
              <Text style={styles.headerText}>Реєстрація</Text>
              <View style={styles.inputFields}>
                <TextInput
                  style={[styles.textInput, isLoginFocused && styles.textInputFocused]}
                  placeholder="Логін"
                  value={login}
                  onChangeText={setLogin}
                  placeholderTextColor="#BDBDBD"
                  keyboardType="default"
                  autoCapitalize="none"
                  onFocus={() => setIsLoginFocused(true)}
                  onBlur={() => setIsLoginFocused(false)}
                />
                <TextInput
                  style={[styles.textInput, isEmailFocused && styles.textInputFocused]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
                <View
                  style={[
                    styles.passwordField,
                    isPasswordFocused && styles.textInputFocused,
                  ]}>
                  <TextInput
                    style={styles.passwordInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    autoCapitalize="none"
                    secureTextEntry={!isPasswordVisible}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                  <Pressable style={styles.toggleButton} onPress={togglePasswordVisibility}>
                    <Text style={styles.toggleText}>
                      {isPasswordVisible ? "Сховати" : "Показати"}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <Pressable onPress={onRegistration} style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Зареєстуватися</Text>
              </Pressable>
              <View style={styles.loginPrompt}>
                <Text style={styles.loginText}>Вже є акаунт?</Text>
                <Pressable>
                  <Text style={styles.loginLink}>Увійти</Text>
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
  screenContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  keyboardWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    padding: 16,
  },
  avatarWrapper: {
    width: 132,
    height: 120,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -66 }],
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  photoIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  headerText: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    marginVertical: 32,
  },
  inputFields: {
    marginBottom: 27,
  },
  textInput: {
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
  textInputFocused: {
    borderColor: "#FF6C00",
  },
  passwordField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 16,
  },
  passwordInput: {
    color: "#212121",
    fontSize: 16,
    flex: 1,
  },
  toggleButton: {
    marginLeft: 10,
  },
  toggleText: {
    color: "#1B4371",
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  loginText: {
    color: "#1B4371",
    fontSize: 16,
  },
  loginLink: {
    color: "#1B4371",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default RegistrationScreen;