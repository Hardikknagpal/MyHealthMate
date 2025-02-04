import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Icons
import { router } from "expo-router"; // Import Expo Router

const Header = () => {
  return (
    <View style={styles.header}>
      {/* App Icon */}
      <Ionicons name="heart" size={24} color="#fff" />

      {/* App Name */}
      <Text style={styles.title}>MyHealthMate</Text>

      {/* Settings Icon (Now Clickable) */}
      <TouchableOpacity onPress={() => router.push("/settings")}>
        <Ionicons name="settings-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0077b6",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Header;
