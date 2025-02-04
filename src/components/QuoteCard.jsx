import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import quotes from '../assets/quotes';

const { width } = Dimensions.get('window');

const QuoteCard = () => {
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    const intervalId = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5000);
    
    return () => clearInterval(intervalId); 
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.quoteText}>{currentQuote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    width: width - 40,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    // height:80
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
  },
});

export default QuoteCard;
