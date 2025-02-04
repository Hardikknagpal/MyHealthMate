import { useNavigation } from "expo-router";
import { useEffect } from "react";
import StepsTracker from "../src/screens/StepsTracker";

export default function StepTrackerScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Steps Tracker" });
  }, [navigation]);

  return <StepsTracker />;
}
