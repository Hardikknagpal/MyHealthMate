# MyHealthMate - Mini Health Tracker App

## 📌 Project Overview
MyHealthMate is a **Mini Health Tracker App** built using **React Native (Expo)**. The app allows users to log basic health metrics such as **water intake, steps, and sleep hours** daily and view their progress for the week. The goal is to promote healthy habits through a simple and intuitive interface.

## ✨ Key Features
### **1. Home Screen**
- Displays health metrics: **Steps, Water Intake, Sleep, Calories**
- Users can **navigate to individual tracker screens** to log their daily health stats
- Motivational **quotes** that change periodically

### **2. Daily Log Screens**
- Users can log:
  - **Steps** (e.g., 5000 steps)
  - **Water Intake** (e.g., 2.5L)
  - **Sleep Hours** (e.g., 7 hours)
  - **Calories** (e.g., 1800 kcal)
- Navigation from the **Home Screen Cards** to specific **log screens**
- Data storage using **AsyncStorage** for persistence

### **3. Weekly Overview Screen**
- **Displays a bar chart** showing daily water, steps, and sleep progress

### **4. Splash Screen**
- A **smooth animated intro** with icons related to fitness, water, sleep, and health
- The app name **fades in after the icons** before transitioning to the home screen

### **5. Settings Screen**
- **User Profile Section** (Profile Image, Name, Email)
- Basic settings options like **Account, Notifications, Privacy, Help, and Logout**

## 🛠️ Tech Stack
- **Framework**: React Native (Expo)
- **Navigation**: Expo Router
- **Data Storage**: AsyncStorage
- **UI Components**: React Native Paper, Expo Vector Icons
- **Charts**: react-native-chart-kit

## 🚀 Installation & Setup
### **Prerequisites**
- Install **Expo CLI**

## 📂 Folder Structure
```
MyHealthMate/
│── app/
│   ├── index.js             # Entry Point (Home Screen)
│   ├── stepstracker.js      # Steps Log Screen
│   ├── watertracker.js      # Water Log Screen
│   ├── sleeptracker.js      # Sleep Log Screen
│   ├── caloriestracker.js   # Calories Log Screen
│   ├── settings.js          # Settings Screen
│── src/
│   ├── components/
│   │   ├── Header.js        # Custom Header
│   │   ├── QuoteCard.js     # Motivational Quote Box
│   ├── screens/
│   │   ├── HomeScreen.js    # Main Home Screen
│   │   ├── StepsTracker.js  # Steps Log Screen UI
│   │   ├── WaterTracker.js  # Water Log Screen UI
│   │   ├── SleepTracker.js  # Sleep Log Screen UI
│   │   ├── CaloriesTracker.js # Calories Log Screen UI
│   │   ├── SettingsScreen.js # Settings UI
│── assets/                  # Images and Icons
│── App.js                   # Main Navigation Setup
│── package.json             # Dependencies
│── README.md                # Project Documentation
```

## 🎥 Demo Video
📌 **A short video demonstration** showcasing:
- **Logging daily health metrics**
- **Navigating between tracker screens**
- **Viewing the weekly summary bar chart**
🔗 (https://drive.google.com/drive/folders/1Gs0T0XJc6Y7o_Ncf6jhVlJCv-rMLP5LE)

## 📌 Future Enhancements (Optional Features)
- **Daily Goal Tracking**: Set daily health goals and track progress
- **Notifications**: Reminder to log daily health data
- **Dark Mode**: UI improvement for better accessibility

---
💡 **Developed by Hardik Nagpal**

