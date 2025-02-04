import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const CaloriesTracker = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Unlock this feature with our Premium Subscription!
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Join Prime and Unlock More Features!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CaloriesTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0077b6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
