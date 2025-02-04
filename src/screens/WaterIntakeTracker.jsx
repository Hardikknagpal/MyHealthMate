import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProgressBar } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import moment from "moment";

const getLast7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
        let date = moment().subtract(i, "days");
        return { id: date.format("YYYY-MM-DD"), label: date.format("DD MMM"), day: date.format("ddd") };
    }).reverse();
};

const WaterTrackerScreen = () => {
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const [waterData, setWaterData] = useState({});
    const goal = 14;
    const last7Days = getLast7Days();

    useEffect(() => {
        const loadWaterData = async () => {
            let data = {};
            for (let day of last7Days) {
                const savedData = await AsyncStorage.getItem(`water_${day.id}`);
                data[day.id] = savedData ? JSON.parse(savedData) : 0;
            }
            setWaterData(data);
        };
        loadWaterData();
    }, []);

    const saveWaterData = async (count) => {
        let newData = { ...waterData, [selectedDate]: count };
        setWaterData(newData);
        await AsyncStorage.setItem(`water_${selectedDate}`, JSON.stringify(count));
    };

    return (
        <View style={styles.container}>
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
                    onPress={() => saveWaterData(Math.max(0, (waterData[selectedDate] || 0) - 1))}
                >
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>

                <Image source={require("../assets/images/glassWater.png")} style={styles.glassImage} />

                <TouchableOpacity 
                    style={styles.circleButton} 
                    onPress={() => saveWaterData(Math.min(goal, (waterData[selectedDate] || 0) + 1))}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            
            <Text style={styles.glassText}>1 Glass (250 ml)</Text>

            {/* Water Intake Progress */}
            <Text style={styles.waterText}>
                <Text style={styles.boldText}>{waterData[selectedDate] || 0}</Text> of {goal} Glasses
            </Text>
            <ProgressBar progress={(waterData[selectedDate] || 0) / goal} color="#0077CC" style={styles.progressBar} />

            {/* Today's Tip */}
            <Text style={styles.tipHeader}>Today's Tip</Text>
            <View style={styles.tipBox}>
                <Text style={styles.tipText}>💧 Make drinking water a daily habit. Stay hydrated and drink more in summer!</Text>
            </View>

            {/* Water Intake Chart */}
            <Text style={styles.chartTitle}>Daily Water Intake</Text>
            <BarChart
                data={{
                    labels: last7Days.map(d => d.day),
                    datasets: [{ data: last7Days.map(d => waterData[d.id] || 0) }]
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
    selectedDate: { backgroundColor: "#E0E0E0" },
    dateText: { fontSize: 16, fontWeight: "bold", color: "#333" },
    selectedText: { color: "#0077CC" },
    dayText: { fontSize: 14, color: "#666" },

    buttonContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 15 },
    circleButton: { backgroundColor: "#0077CC", borderRadius: 25, width: 40, height: 40, justifyContent: "center", alignItems: "center" },
    buttonText: { color: "#FFF", fontSize: 30, fontWeight: "bold" },
    glassImage: { width: 120, height: 120, resizeMode: "contain", marginHorizontal: 20 },
    glassText: { fontSize: 16, fontWeight: "bold", color: "#333", textAlign: "center", marginTop: 5 },

    waterText: { textAlign: "center", fontSize: 18, marginTop: 10, color: "#333" },
    boldText: { fontWeight: "bold", fontSize: 20, color: "#0077CC" },
    progressBar: { height: 10, borderRadius: 5, marginVertical: 10 },

    tipHeader: { textAlign: "center", fontSize: 18, fontWeight: "bold", color: "#000", marginTop: 15 },
    tipBox: { backgroundColor: "#E3F2FD", padding: 12, borderRadius: 10, marginVertical: 8 },
    tipText: { fontSize: 14, color: "#0077CC", textAlign: "center" },

    chartTitle: { textAlign: "center", fontSize: 18, fontWeight: "bold", marginVertical: 10, color: "#333" },
    chart: { borderRadius: 10, alignSelf: "center" },
});

export default WaterTrackerScreen;
