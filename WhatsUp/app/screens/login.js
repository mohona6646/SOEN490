import React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Links from "../components/Links";
import Screen from "../components/Screen";
import ScreenSubtitle from "../components/ScreenSubtitle";
import ScreenTitle from "../components/ScreenTitle";
import logo from "../Images/w3.png";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
//import { useNavigation } from "@react-navigation/core";

export default function Login() {
  // const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        Alert.alert(
          "Logged in sucessfully",
          "Email and password are valid",
          [{ text: "OK", onPress: () => console.log("") }],
          { cancelable: false }
        );
        // navigation.navigate("dashboard");
      })
      .catch((error) => {
        Alert.alert(
          "Try again",
          "Invalid email or password.",
          [{ text: "OK", onPress: () => console.log("") }],
          { cancelable: false }
        );
      });
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);
  return (
    <Screen style={{ padding: 10, marginTop: 5 }}>
      <Image
        source={logo}
        style={{ width: 166, height: 212, alignSelf: "center" }}
      />
      <ScreenTitle title="Login" />
      <ScreenSubtitle subtitle="Please enter your details" />
      <AppTextInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <AppTextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.organizertwo}>
        <Links
          style={styles.link}
          link="Forget Password?"
          onPress={() => console.log("password")}
        />
      </View>
      <AppButton style title="Login" onPress={handleLogin} />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.text}>
          Don't have an account?
          <Links
            style={styles.link}
            link="Sign up"
            onPress={() => console.log("Sign up")}
          />
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
        <View>
          <Text style={{ width: 105, textAlign: "center" }}>Or login with</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
      </View>
      <View style={styles.rowContainer}>
        <FontAwesome
          name="facebook-square"
          size={30}
          style={{
            color: "#3b5998",
            fontSize: 50,
            alignSelf: "center",
          }}
          onPress={() => console.log("Facebook")}
        />
        <FontAwesome
          name="twitter-square"
          size={30}
          style={{
            color: "#00acee",
            fontSize: 50,
            paddingHorizontal: 10,
          }}
          onPress={() => console.log("Facebook")}
        />
        <FontAwesome
          name="google"
          size={30}
          style={{
            color: "#db4a39",
            fontSize: 50,
          }}
          onPress={() => console.log("Facebook")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  organizer: {
    alignItems: "flex-start",
    width: "50%",
  },
  organizertwo: {
    alignItems: "flex-end",
    width: "98%",
  },
  rowContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  roundshape: {
    backgroundColor: "grey",
    height: 65,
    width: 65,
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    borderRadius: 45,
  },
  link: {},
});
