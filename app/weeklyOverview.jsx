// import WeeklyOverview from "../src/screens/WeeklyOverview";
// export default WeeklyOverview;



import { useNavigation } from "expo-router";
import { useEffect } from "react";
import WeeklyOverview from "../src/screens/WeeklyOverview";

export default function WeeklyOverviewScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: "Weekly Overview" });
  }, [navigation]);

  return <WeeklyOverview />;
}
