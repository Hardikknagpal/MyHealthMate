import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons"; // Icons for UI

const getLast7Days = () => {
  return Array.from({ length: 7 }, (_, i) => {
    let date = moment().subtract(i, "days");
    return {
      id: date.format("YYYY-MM-DD"),
      label: date.format("DD MMM"),
      day: date.format("ddd"),
    };
  }).reverse();
};

const StepsTrackerScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [stepsData, setStepsData] = useState({});
  const goal = 10000;
  const last7Days = getLast7Days();

  useEffect(() => {
    const loadStepsData = async () => {
      let data = {};
      for (let day of last7Days) {
        const savedData = await AsyncStorage.getItem(`steps_${day.id}`);
        data[day.id] = savedData ? JSON.parse(savedData) : 0;
      }
      setStepsData(data);
    };
    loadStepsData();
  }, []);

  const saveStepsData = async (count) => {
    let newData = { ...stepsData, [selectedDate]: count };
    setStepsData(newData);
    await AsyncStorage.setItem(`steps_${selectedDate}`, JSON.stringify(count));
  };

  return (
    <View style={styles.container}>
      

      {/* Date Selector */}
      <FlatList
        horizontal
        data={last7Days}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item.id)}
            style={{ backgroundColor: "#FFF" }}
          >
            <View
              style={[
                styles.dateItem,
                selectedDate === item.id && styles.selectedDate,
              ]}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === item.id && styles.selectedText,
                ]}
              >
                {item.label}
              </Text>
              <Text style={styles.dayText}>{item.day}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateListContainer}
      />

      {/* Connect Device Prompt */}
      <View style={styles.connectContainer}>
        {/* <Text style={styles.connectText}> */}
        <TouchableOpacity onPress={() => Linking.openSettings()}>
          <Text style={styles.highlightText}>
            Connect your fitness device for accurate tracking.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Image & Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() =>
            saveStepsData(Math.max(0, (stepsData[selectedDate] || 0) - 500))
          }
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Ionicons name="walk" size={70} color="#0077b6" />
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() =>
            saveStepsData(Math.min(goal, (stepsData[selectedDate] || 0) + 500))
          }
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.stepsText}>500 Steps per Increment</Text>

      {/* Steps Progress */}
      <Text style={styles.stepsProgressText}>
        <Text style={styles.boldText}>{stepsData[selectedDate] || 0}</Text> of{" "}
        {goal} Steps
      </Text>
      <ProgressBar
        progress={(stepsData[selectedDate] || 0) / goal}
        color="#0077CC"
        style={styles.progressBar}
      />

      {/* Today's Motivation */}
      <Text style={styles.tipHeader}>Today's Motivation</Text>
      <View style={styles.tipBox}>
        <Text style={styles.tipText}>
          🚶‍♂️ "Every step counts! A small step today leads to a healthier
          tomorrow."
        </Text>
      </View>

      {/* Steps Chart */}
      <Text style={styles.chartTitle}>Daily Step Count</Text>
      <BarChart
        data={{
          labels: last7Days.map((d) => d.day),
          datasets: [{ data: last7Days.map((d) => stepsData[d.id] || 0) }],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#FFF",
          backgroundGradientTo: "#FFF",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 119, 204, ${opacity})`,
          labelColor: () => "#333",
          barPercentage: 0.6,
          propsForLabels: { fontSize: 14 },
        }}
        style={styles.chart}
        fromZero
        showValuesOnTopOfBars
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 10 },

  connectContainer: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  connectText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    flexDirection: "row",
  },
  highlightText: {
    fontWeight: "bold",
    color: "#0077CC",
    paddingTop: 15,
  },

  // connectButton: { backgroundColor: "#0077CC", padding: 8, borderRadius: 8 },
  // connectButtonText: { color: "#FFF", fontSize: 12, fontWeight: "bold", textAlign: "center" },

  dateListContainer: { paddingVertical: 5 },
  dateItem: {
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
  },
  selectedDate: { backgroundColor: "#E0E0E0" },
  dateText: { fontSize: 16, fontWeight: "bold", color: "#333" },
  selectedText: { color: "#0077CC" },
  dayText: { fontSize: 14, color: "#666" },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  circleButton: {
    backgroundColor: "#0077CC",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontSize: 30, fontWeight: "bold" },
  stepsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 5,
  },

  stepsProgressText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    color: "#333",
  },
  boldText: { fontWeight: "bold", fontSize: 20, color: "#0077CC" },
  progressBar: { height: 10, borderRadius: 5, marginVertical: 10 },

  tipHeader: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 25,
  },
  tipBox: {
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  tipText: { fontSize: 14, color: "#0077CC", textAlign: "center" },

  chartTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
    marginTop:20
  },
  chart: { borderRadius: 10, alignSelf: "center" },
});

export default StepsTrackerScreen;
