// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Card } from "react-native-paper";
// import { Ionicons } from "@expo/vector-icons"; // Icons for UI
// import Header from '../components/Header'
// import QuoteCard from '../components/QuoteCard';
// import { router } from "expo-router";

// const HomeScreen = () => {
//   const [steps, setSteps] = useState(3500);
//   const totalSteps = 10000;

//   const [water, setWater] = useState(8);
//   const waterGoal = 14;

//   const [sleep, setSleep] = useState(6);
//   const sleepGoal = 8;

//   const [calories, setCalories] = useState(478);

//   return (
//     <View style={{flex:1}}>
//         <Header/>
    
//     <View style={styles.container}>
//     <QuoteCard/>
        
//       <Text style={styles.header}>Health Trackers</Text>

//       <View style={styles.grid}>
//         {/* Steps Tracker */}
//         {/* <TouchableOpacity > */}
//         <Card style={styles.card} onPress={() => router.push("/stepstracker")}>
//           <Card.Content>
//             <View style={styles.cardContent}>
//               <Ionicons name="walk" size={30} color="#0077b6" />
//               <Text style={styles.text}>Steps</Text>
//               <Text style={styles.subText}>{steps} / {totalSteps}</Text>
//             </View>
//           </Card.Content>
//         </Card>
//         {/* </TouchableOpacity> */}

//         {/* Water Intake */}
//         <Card style={styles.card} onPress={() => router.push("/waterIntakeTracker")}>
//           <Card.Content>
//             <View style={styles.cardContent}>
//               <Ionicons name="water" size={30} color="#1e90ff" />
//               <View style={styles.row}>
//                 <TouchableOpacity onPress={() => setWater(Math.max(0, water - 1))}>
//                   <Ionicons name="remove-circle-outline" size={24} color="black" />
//                 </TouchableOpacity>
//                 <Text style={styles.subText}>{water} / {waterGoal} </Text>

//                 <TouchableOpacity onPress={() => setWater(Math.min(waterGoal, water + 1))}>
//                   <Ionicons name="add-circle-outline" size={24} color="black" />
//                 </TouchableOpacity>
                
//               </View>
//               <Text>Glasses</Text>
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Sleep Tracker */}
//         <Card style={styles.card} onPress={() => router.push("/sleeptracker")}>
//           <Card.Content>
//             <View style={styles.cardContent}>
//               <Ionicons name="bed" size={30} color="#ff5733" />
//               <Text style={styles.text}>Sleep</Text>
//               <Text style={styles.subText}>{sleep} / {sleepGoal} Hrs</Text>
//             </View>
//           </Card.Content>
//         </Card>

//         {/* Calories Tracker */}
//         <Card style={styles.card} onPress={() => router.push("/caloriesTracker")}>
//           <Card.Content>
//             <View style={styles.cardContent}>
//               <Ionicons name="flame" size={30} color="#f39c12" />
//               <Text style={styles.text}>Calories</Text>
//               <Text style={styles.subText}>{calories} Cal</Text>
//             </View>
//           </Card.Content>
//         </Card>

//         <Card 
//           style={[styles.card, styles.fullWidthCard]} 
//           onPress={() => router.push("/weeklyOverview")}
//         >
//           <Card.Content>
//             <View style={styles.cardContent}>
//               <Ionicons name="calendar-outline" size={30} color="#2c3e50" />
//               <Text style={styles.text}>Weekly Overview</Text>
//               <Text style={styles.subText}>View your weekly progress</Text>
//             </View>
//           </Card.Content>
//         </Card>
//       </View>
//     </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
//   header: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#333", marginTop:15 },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   card: {
//     width: "47%",
//     padding: 15,
//     borderRadius: 12,
//     backgroundColor: "#ffffff",
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//     alignItems: "center",
//   },
//   cardContent: { alignItems: "center", justifyContent: "center" },
//   fullWidthCard: {
//     width: "100%",
//     backgroundColor: "#e3f2fd",  // Light blue for distinction
//     borderWidth: 1,
//     borderColor: "#90caf9",
//     marginTop:60
//   },
  
//   text: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
//   subText: { fontSize: 14, color: "#555", marginTop: 3 , fontWeight: "bold"},
//   row: { flexDirection: "row", alignItems: "center", marginTop: 5 },
// });

// export default HomeScreen;











import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import QuoteCard from '../components/QuoteCard';

const HomeScreen = () => {
  // State variables for each health metric
  const [steps, setSteps] = useState(0);
  const totalSteps = 10000;

  const [water, setWater] = useState(0);
  const waterGoal = 14;

  const [sleep, setSleep] = useState(0);
  const sleepGoal = 8;

  const [calories, setCalories] = useState(0);

  // Function to load stored health data from AsyncStorage
  const loadHealthData = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)
      
      const savedSteps = await AsyncStorage.getItem(`steps_${today}`);
      const savedWater = await AsyncStorage.getItem(`water_${today}`);
      const savedSleep = await AsyncStorage.getItem(`sleep_${today}`);
      const savedCalories = await AsyncStorage.getItem(`calories_${today}`);

      if (savedSteps !== null) setSteps(JSON.parse(savedSteps));
      if (savedWater !== null) setWater(JSON.parse(savedWater));
      if (savedSleep !== null) setSleep(JSON.parse(savedSleep));
      if (savedCalories !== null) setCalories(JSON.parse(savedCalories));
    } catch (error) {
      console.error("Error loading health data:", error);
    }
  };

  // Reload data when the screen is focused (when user returns)
  useFocusEffect(
    useCallback(() => {
      loadHealthData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={styles.container}>
        <QuoteCard />

        <Text style={styles.header}>Health Trackers</Text>

        <View style={styles.grid}>
          {/* Steps Tracker */}
          <Card style={styles.card} onPress={() => router.push("/stepstracker")}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Ionicons name="walk" size={30} color="#0077b6" />
                <Text style={styles.text}>Steps</Text>
                <Text style={styles.subText}>{steps} / {totalSteps}</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Water Intake */}
          <Card style={styles.card} onPress={() => router.push("/waterIntakeTracker")}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Ionicons name="water" size={30} color="#1e90ff" />
                <Text style={styles.text}>Water</Text>
                <Text style={styles.subText}>{water} / {waterGoal} Glasses</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Sleep Tracker */}
          <Card style={styles.card} onPress={() => router.push("/sleeptracker")}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Ionicons name="bed" size={30} color="#ff5733" />
                <Text style={styles.text}>Sleep</Text>
                <Text style={styles.subText}>{sleep} / {sleepGoal} Hrs</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Calories Tracker */}
          <Card style={styles.card} onPress={() => router.push("/caloriesTracker")}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Ionicons name="flame" size={30} color="#f39c12" />
                <Text style={styles.text}>Calories</Text>
                <Text style={styles.subText}>{calories} Cal</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Weekly Overview */}
          <Card style={[styles.card, styles.fullWidthCard]} onPress={() => router.push("/weeklyOverview")}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Ionicons name="calendar-outline" size={30} color="#2c3e50" />
                <Text style={styles.text}>Weekly Overview</Text>
                <Text style={styles.subText}>View your weekly progress</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f8f9fa" },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#333", marginTop: 15 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" },
  card: {
    width: "47%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  cardContent: { alignItems: "center", justifyContent: "center" },
  fullWidthCard: {
    width: "100%",
    backgroundColor: "#e3f2fd",
    borderWidth: 1,
    borderColor: "#90caf9",
    marginTop: 60,
  },
  text: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  subText: { fontSize: 14, color: "#555", marginTop: 3, fontWeight: "bold" },
});

export default HomeScreen;
