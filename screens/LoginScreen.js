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
  StatusBar,
} from "react-native";

const backgroundImage = require("../assets/photo_bg.png");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onLogin = () => {
    if (!email || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі необхідні поля");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      Alert.alert(
        "Помилка",
        "Будь ласка, введіть правильну адресу електронної пошти"
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert("Помилка", "Пароль повинен бути не менше 6 символів");
      return;
    }

    Alert.alert("тест", `${email} + ${password}`);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screenContainer}>
          <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.backgroundImage}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardAvoidingView}
              keyboardVerticalOffset={Platform.OS === "ios" ? -100 : 0}>
              <View style={styles.formContainer}>
                <Text style={styles.screenTitle}>Увійти</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[
                      styles.textInput,
                      isEmailFocused && styles.focusedInput,
                    ]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Адреса електронної пошти"
                    placeholderTextColor="#BDBDBD"
                    keyboardType="email-address"
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                  />
                  <View
                    style={[
                      styles.passwordWrapper,
                      isPasswordFocused && styles.focusedInput,
                    ]}>
                    <TextInput
                      style={styles.passwordInput}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Пароль"
                      placeholderTextColor="#BDBDBD"
                      secureTextEntry={!isPasswordVisible}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                    />
                    <Pressable
                      style={styles.visibilityButton}
                      onPress={togglePasswordVisibility}>
                      <Text style={styles.visibilityButtonText}>
                        {isPasswordVisible ? "Сховати" : "Показати"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
                <Pressable onPress={onLogin} style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Увійти</Text>
                </Pressable>
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Немає акаунту?</Text>
                  <Pressable>
                    <Text style={styles.registerLink}>Зареєструватися</Text>
                  </Pressable>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formContainer: {
    backgroundColor: "rgb(255, 255, 255)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    padding: 32,
    paddingBottom: 16,
  },
  screenTitle: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    letterSpacing: 0.3,
    marginBottom: 33,
  },
  inputWrapper: {
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
  passwordWrapper: {
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
  passwordInput: {
    color: "#212121",
    fontSize: 16,
    flex: 1,
  },
  visibilityButton: {
    marginLeft: 8,
  },
  visibilityButtonText: {
    fontSize: 16,
    color: "#1B4371",
  },
  focusedInput: {
    borderColor: "#FF6C00",
  },
  loginButton: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    paddingVertical: 16,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
  },
  footer: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#1B4371",
    fontSize: 16,
  },
  registerLink: {
    color: "#1B4371",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;