import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SplashScreen = ({ onAnimationEnd }) => {
  const fadeValues = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];
  const textFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    
    Animated.sequence([
      Animated.timing(fadeValues[0], { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(fadeValues[1], { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(fadeValues[2], { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(fadeValues[3], { toValue: 1, duration: 500, useNativeDriver: true }),

      Animated.delay(500), 


      Animated.timing(textFade, { toValue: 1, duration: 800, useNativeDriver: true }),

      Animated.delay(1200), 

      Animated.parallel([
        Animated.timing(fadeValues[0], { toValue: 0, duration: 800, useNativeDriver: true }),
        Animated.timing(fadeValues[1], { toValue: 0, duration: 800, useNativeDriver: true }),
        Animated.timing(fadeValues[2], { toValue: 0, duration: 800, useNativeDriver: true }),
        Animated.timing(fadeValues[3], { toValue: 0, duration: 800, useNativeDriver: true }),
        Animated.timing(textFade, { toValue: 0, duration: 800, useNativeDriver: true }),
      ]),
    ]).start(() => onAnimationEnd());

  }, []);

  return (
    <View style={styles.container}>
      {/* Icon 1 (Top) */}
      <Animated.View style={[styles.iconContainer, { opacity: fadeValues[0], transform: [{ translateY: -80 }] }]}>
        <Ionicons name="fitness" size={50} color="#FF5733" />
      </Animated.View>

      {/* Icon 2 (Right) */}
      <Animated.View style={[styles.iconContainer, { opacity: fadeValues[1], transform: [{ translateX: 80 }] }]}>
        <Ionicons name="water" size={50} color="#3498DB" />
      </Animated.View>

      {/* Icon 3 (Bottom) */}
      <Animated.View style={[styles.iconContainer, { opacity: fadeValues[2], transform: [{ translateY: 80 }] }]}>
        <Ionicons name="heart" size={50} color="#E74C3C" />
      </Animated.View>

      {/* Icon 4 (Left) */}
      <Animated.View style={[styles.iconContainer, { opacity: fadeValues[3], transform: [{ translateX: -80 }] }]}>
        <Ionicons name="bed" size={50} color="#27AE60" />
      </Animated.View>

      {/* App Name (Below Icons) */}
      <Animated.View style={[styles.appNameContainer, { opacity: textFade }]}>
        <Text style={styles.appName}>MyHealthMate</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  iconContainer: {
    position: "absolute",
  },
  appNameContainer: {
    marginTop: 270, 
  },
  appName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#34495E",
  }
});

export default SplashScreen;
