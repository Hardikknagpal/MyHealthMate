import { Text, View } from "react-native";
import HomeScreen from "../src/screens/Homescreen";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import SplashScreen from "../src/components/SplashScreen"; // Import the splash screen


export default function Index() {
  const navigation = useNavigation();
  const [isSplashVisible, setIsSplashVisible] = useState(true);


  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // Hides the header
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      {isSplashVisible ? (
        <SplashScreen onAnimationEnd={() => setIsSplashVisible(false)} />
        
      ) : (
        <HomeScreen />
      )}
    </View>
  );
}
