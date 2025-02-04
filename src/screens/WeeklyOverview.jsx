import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarChart } from "react-native-chart-kit";
import moment from "moment";

const getLast7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
        let date = moment().subtract(i, "days");
        return { id: date.format("YYYY-MM-DD"), label: date.format("DD MMM"), day: date.format("ddd") };
    }).reverse();
};

const WeeklyOverviewScreen = () => {
    const last7Days = getLast7Days();
    const [sleepData, setSleepData] = useState({});
    const [stepsData, setStepsData] = useState({});
    const [waterData, setWaterData] = useState({});

    useEffect(() => {
        const loadData = async () => {
            let sleep = {}, steps = {}, water = {};
            
            for (let day of last7Days) {
                sleep[day.id] = JSON.parse(await AsyncStorage.getItem(`sleep_${day.id}`)) || 0;
                steps[day.id] = JSON.parse(await AsyncStorage.getItem(`steps_${day.id}`)) || 0;
                water[day.id] = JSON.parse(await AsyncStorage.getItem(`water_${day.id}`)) || 0;
            }

            setSleepData(sleep);
            setStepsData(steps);
            setWaterData(water);
        };
        loadData();
    }, []);

    const chartConfig = {
        backgroundGradientFrom: "#FFF",
        backgroundGradientTo: "#FFF",
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        labelColor: () => "#333",
        barPercentage: 0.6,
        propsForLabels: { fontSize: 14 },
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Weekly Overview</Text>

            {/* Steps Chart */}
            <Text style={styles.chartTitle}>Steps</Text>
            <BarChart
                data={{
                    labels: last7Days.map(d => d.day),
                    datasets: [{ data: last7Days.map(d => stepsData[d.id] || 0) }]
                }}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
                fromZero
                showValuesOnTopOfBars
            />

            {/* Water Intake Chart */}
            <Text style={styles.chartTitle}>Water Intake (Glasses)</Text>
            <BarChart
                data={{
                    labels: last7Days.map(d => d.day),
                    datasets: [{ data: last7Days.map(d => waterData[d.id] || 0) }]
                }}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
                fromZero
                showValuesOnTopOfBars
            />

            {/* Sleep Chart */}
            <Text style={styles.chartTitle}>Sleep Duration (Hours)</Text>
            <BarChart
                data={{
                    labels: last7Days.map(d => d.day),
                    datasets: [{ data: last7Days.map(d => sleepData[d.id] || 0) }]
                }}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={chartConfig}
                style={styles.chart}
                fromZero
                showValuesOnTopOfBars
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#333" },
    chartTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15, textAlign: "center", color: "#333" },
    chart: { borderRadius: 10, alignSelf: "center", marginBottom: 20 },
});

export default WeeklyOverviewScreen;
