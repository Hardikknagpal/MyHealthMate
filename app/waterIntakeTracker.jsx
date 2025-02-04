// import WaterIntakeTracker from "../src/screens/WaterIntakeTracker";
// export default WaterIntakeTracker;


import { useNavigation } from "expo-router";
import { useEffect } from "react";
import WaterIntakeTracker from "../src/screens/WaterIntakeTracker";

export default function WaterIntakeTrackerScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Water Intake Tracker" });
  }, [navigation]);

  return <WaterIntakeTracker />;
}
