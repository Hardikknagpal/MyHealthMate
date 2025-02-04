// import SleepTracker from "../src/screens/SleepTracker";
// export default SleepTracker;


import { useNavigation } from "expo-router";
import { useEffect } from "react";
import SleepTracker from "../src/screens/SleepTracker";

export default function SleepTrackerScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Sleep Tracker" });
  }, [navigation]);

  return <SleepTracker />;
}
