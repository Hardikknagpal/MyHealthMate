import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons"; // Icons for UI


const getLast7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
        let date = moment().subtract(i, "days");
        return { id: date.format("YYYY-MM-DD"), label: date.format("DD MMM"), day: date.format("ddd") };
    }).reverse();
};

const SleepTrackerScreen = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const [sleepData, setSleepData] = useState({});
    const goal = 8; // Recommended sleep hours
    const last7Days = getLast7Days();

    useEffect(() => {
        const loadSleepData = async () => {
            let data = {};
            for (let day of last7Days) {
                const savedData = await AsyncStorage.getItem(`sleep_${day.id}`);
                data[day.id] = savedData ? JSON.parse(savedData) : 0;
            }
            setSleepData(data);
        };
        loadSleepData();
    }, []);

    const saveSleepData = async (hours) => {
        let newData = { ...sleepData, [selectedDate]: hours };
        setSleepData(newData);
        await AsyncStorage.setItem(`sleep_${selectedDate}`, JSON.stringify(hours));
    };

    return (
        <View style={styles.container}>
            {/* Date Selector */}
            <FlatList
                horizontal
                data={last7Days}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedDate(item.id)} style={{backgroundColor:'#FFF'}}>
                        <View style={[styles.dateItem, selectedDate === item.id && styles.selectedDate]}>
                            <Text style={[styles.dateText, selectedDate === item.id && styles.selectedText]}>
                                {item.label}
                            </Text>
                            <Text style={styles.dayText}>{item.day}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateListContainer}
            />

            {/* Image & Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.circleButton} 
                    onPress={() => saveSleepData(Math.max(0, (sleepData[selectedDate] || 0) - 0.5))}
                >
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>

                <Ionicons name="bed" size={70} color="#ff5733" />
                <TouchableOpacity 
                    style={styles.circleButton} 
                    onPress={() => saveSleepData(Math.min(goal, (sleepData[selectedDate] || 0) + 0.5))}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            
            <Text style={styles.sleepText}>0.5 Hour Adjustments</Text>

            {/* Sleep Progress */}
            <Text style={styles.sleepHours}>
                <Text style={styles.boldText}>{sleepData[selectedDate] || 0}</Text> of {goal} Hours
            </Text>
            <ProgressBar progress={(sleepData[selectedDate] || 0) / goal} color="#7B61FF" style={styles.progressBar} />

            {/* Sleep Tip */}
            <Text style={styles.tipHeader}>Sleep Tip</Text>
            <View style={styles.tipBox}>
                <Text style={styles.tipText}>🌙 A good night's sleep improves focus and boosts energy levels. Stick to a routine!</Text>
            </View>

            {/* Sleep Chart */}
            <Text style={styles.chartTitle}>Daily Sleep Duration</Text>
            <BarChart
                data={{
                    labels: last7Days.map(d => d.day),
                    datasets: [{ data: last7Days.map(d => sleepData[d.id] || 0) }]
                }}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: "#FFF",
                    backgroundGradientTo: "#FFF",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(123, 97, 255, ${opacity})`,
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
    container: { backgroundColor: "#fff", padding:10 },

    dateListContainer: { paddingVertical: 5 },
    dateItem: {
        alignItems: "center",
        marginHorizontal: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#E0E0E0",
    },
    selectedDate: { backgroundColor: "#D1C4E9" },
    dateText: { fontSize: 16, fontWeight: "bold", color: "#333" },
    selectedText: { color: "#7B61FF" },
    dayText: { fontSize: 14, color: "#666" },

    buttonContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 15 },
    circleButton: { backgroundColor: "#7B61FF", borderRadius: 25, width: 40, height: 40, justifyContent: "center", alignItems: "center" },
    buttonText: { color: "#FFF", fontSize: 30, fontWeight: "bold" },
    sleepImage: { width: 120, height: 120, resizeMode: "contain", marginHorizontal: 20 },
    sleepText: { fontSize: 16, fontWeight: "bold", color: "#333", textAlign: "center", marginTop: 5 },

    sleepHours: { textAlign: "center", fontSize: 18, marginTop: 10, color: "#333" },
    boldText: { fontWeight: "bold", fontSize: 20, color: "#7B61FF" },
    progressBar: { height: 10, borderRadius: 5, marginVertical: 10 },

    tipHeader: { textAlign: "center", fontSize: 18, fontWeight: "bold", color: "#000", marginTop: 15 },
    tipBox: { backgroundColor: "#EDE7F6", padding: 12, borderRadius: 10, marginVertical: 8 },
    tipText: { fontSize: 14, color: "#7B61FF", textAlign: "center" },

    chartTitle: { textAlign: "center", fontSize: 18, fontWeight: "bold", marginVertical: 10, color: "#333" },
    chart: { borderRadius: 10, alignSelf: "center" },
});

export default SleepTrackerScreen;
