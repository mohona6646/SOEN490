import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import AppButton from "./components/AppButton";
import AppTextInput from "./components/AppTextInput";
import Links from "./components/Links";
import Screen from "./components/Screen";
import ScreenSubtitle from "./components/ScreenSubtitle";
import ScreenTitle from "./components/ScreenTitle";
import SignUpScreen from "./screens/SignUpScreen";
import Login from "./screens/login";

export default function App() {
  return (
    // <SignUpScreen />
    <Login />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
