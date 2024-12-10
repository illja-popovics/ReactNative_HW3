import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { registerDB } from "../utils/auth";

import AddPhotoComponent from "../assets/icons/AddPhotoIconComponent";
const image = require("../assets/photo_bg.png");
const photo_block = null;

const RegistrationScreen = () => {
  const [inputs, setInputs] = useState({
    email: "", password: "", login: ""
    });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const handleInputChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    };

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onRegistration = () => {
    if (!inputs.email || !inputs.password || !inputs.login) {
      Alert.alert("Помилка", "Будь ласка, заповніть усі необхідні поля");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(inputs.email)) {
      Alert.alert(
        "Помилка",
        "Будь ласка, введіть коректну адресу електронної пошти"
      );
      return;
    }

    if (inputs.password.length < 6) {
      Alert.alert("Помилка", "Пароль повинен бути не менше 6 символів");
      return;
    }
    registerDB({ displayName: inputs.login, email: inputs.email, password: inputs.password}, dispatch);
    navigation.navigate("Login");
    
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
            keyboardVerticalOffset={Platform.OS === "ios" ? -100 : 0}>
            <View style={styles.canva}>
              <View style={styles.avatarBox}>
                <Image style={styles.avatar} source={photo_block} />
                <AddPhotoComponent style={styles.addPhoto} />
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <View style={styles.inputGroup}>
                <TextInput
                  style={[styles.input, isLoginFocused && styles.inputFocused]}
                  placeholder="Логін"
                  value={inputs.login}
                  onChangeText={(value) => handleInputChange("login", value)}
                  placeholderTextColor="#BDBDBD"
                  keyboardType="default"
                  autoCapitalize="none"
                  onFocus={() => setIsLoginFocused(true)}
                  onBlur={() => setIsLoginFocused(false)}
                />
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
                  <TextInput
                    style={styles.password}
                    value={inputs.password}
                    onChangeText={(value) => handleInputChange("password", value)}
                    placeholder="Пароль"
                    placeholderTextColor="#BDBDBD"
                    autoCapitalize="none"
                    secureTextEntry={!isPasswordVisible}
                    onFocus={() => setIsPassFocused(true)}
                    onBlur={() => setIsPassFocused(false)}
                  />
                  <Pressable
                    style={styles.button}
                    onPress={togglePasswordVisibility}>
                    <Text style={styles.buttonText}>
                      {isPasswordVisible ? "Скрыть" : "Показати"}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <Pressable onPress={onRegistration} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Зареєстуватися</Text>
              </Pressable>
              <View style={styles.enterButton}>
                <Text style={styles.enterButtonText}>Вже є акаунт?</Text>
                <Pressable>
                  <Text style={styles.regLink} onPress={() => navigation.navigate("Login")}> Увійти</Text>
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
  avatarBox: {
    width: 132,
    height: 120,
    zIndex: 2,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -46 }],
  },
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addPhoto: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 30,
    fontWeight: 500,
    letterSpacing: 0.3,
    paddingTop: 92,
    paddingBottom: 33,
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
  inputFocused: {
    borderColor: "#FF6C00",
  },
  submitButton: {
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    flexDirection: "column",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
  },
  button: {},
  buttonText: {
    fontSize: 16,
    color: "#1B4371",
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
  },
});

export default RegistrationScreen;
