// import CaloriesTracker from "../src/screens/CaloriesTracker";
// export default CaloriesTracker;



import { useNavigation } from "expo-router";
import { useEffect } from "react";
import CaloriesTracker from "../src/screens/CaloriesTracker";

export default function CaloriesTrackerScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Calories Tracker" });
  }, [navigation]);

  return <CaloriesTracker />;
}
