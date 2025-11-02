# 📖 Usage Guide

This guide explains how to use the Prayer Times Lite application, including all features and functionality.

## 🚀 Getting Started

### Initial Launch

1. After starting the development server (`npm run dev`), open your browser to the provided URL (usually `http://localhost:5173`)
2. The first screen will prompt you to select a location
3. Choose between GPS detection or manual location selection

### Location Selection

#### Option 1: GPS Location

1. Click the "Use GPS" button
2. Allow the browser to access your location when prompted
3. The application will automatically detect your location and retrieve prayer times
4. If successful, you'll see the prayer times grid and countdown timer

#### Option 2: Manual Location

1. Click the "Manual Selection" button
2. Select your country (default is Turkey)
3. Choose your state/city from the dropdown
4. Select your district from the final dropdown
5. Confirm your selection to load prayer times

### Home Screen Layout

Once a location is selected, you'll see:

1. **Header**: Contains app logo, theme toggle, language selector, and location display
2. **Countdown Timer**: Large display showing time remaining until the next prayer
3. **Prayer Times Grid**: Visual grid showing all 6 daily prayer times
4. **Progress Visualization**: Circular progress bar showing progression through the day

## 🕐 Understanding Prayer Times

### The 6 Daily Prayers

- **Fajr (İmsak)**: Dawn prayer before sunrise
- **Sunrise (Güneş)**: Time of sunrise
- **Dhuhr (Öğle)**: Midday prayer after the sun passes its highest point
- **Asr (İkindi)**: Afternoon prayer
- **Maghrib (Akşam)**: Evening prayer just after sunset
- **Isha (Yatsı)**: Night prayer

### Prayer Status Indicators

- **Active Prayer**: Highlighted with amber color, indicating the current prayer time period
- **Upcoming Prayers**: Displayed with normal colors, showing future prayer times
- **Past Prayers**: Displayed with reduced opacity (50%), indicating already completed prayers

## 🎨 Using the Interface

### Theme Toggle

- Click the sun/moon icon in the header to switch between light and dark mode
- Theme preference is saved to LocalStorage and remembered between sessions
- The entire application interface updates to match your selected theme

### Language Selection

- Use the language selector in the header to switch between Turkish, English, and Arabic
- All prayer names and UI elements will update to your selected language
- Arabic text will display with proper RTL (right-to-left) formatting
- Language preference is saved to LocalStorage

### Location Management

- To change your location, click the "Change Location" button in the header
- This returns you to the location selection screen
- Your new location will be saved and used for future sessions

## ⏱️ Countdown Timer

### Real-time Updates

- The countdown timer updates every second
- Shows hours, minutes, and seconds until the next prayer
- Includes a circular progress bar that visually represents progression through the day
- Automatically switches to the next prayer when the current one is reached

### Progress Visualization

- The circular progress bar fills as the day progresses
- At the start of the day, the bar is empty
- As each prayer time passes, the bar fills incrementally
- The bar completes when the last prayer of the day is reached

## 📱 Mobile Usage

### Touch Interactions

- All buttons and controls are designed with adequate touch targets (minimum 44px)
- The prayer times grid is responsive and works well on small screens
- The countdown timer is prominently displayed for easy visibility

### Orientation Changes

- The application layout adapts to both portrait and landscape orientations
- Text remains readable and properly formatted in both orientations

## 🔧 Settings and Preferences

### Saved Preferences

The application automatically saves several preferences:

- Selected location
- Chosen theme (light/dark mode)
- Selected language
- Any other user preferences

### Data Persistence

- All preferences are stored locally in the browser's LocalStorage
- Data persists between browser sessions
- No personal data is sent to external servers

## 🔍 Troubleshooting Common Issues

### Location Not Detected

- Ensure location services are enabled on your device
- Check that your browser has permission to access location data
- Try refreshing the page if GPS takes too long to respond
- Use manual selection as an alternative

### Incorrect Prayer Times

- Verify that your location is correctly selected
- Check that your device's date and time are accurate
- If times seem incorrect, try switching to a different location and back
- Note that prayer times vary by day and location

### Application Not Loading

- Verify that you're running the development server (`npm run dev`)
- Check the browser console for any error messages
- Clear your browser cache and reload the page
- Ensure you're using a supported browser

### API Connection Issues

- The application will use cached prayer times if the API is unavailable
- Check your internet connection
- If problems persist, try again later when the API server is available

## 🌍 Multilingual Features

### Language Support

- Turkish: Default language for Turkish users
- English: For international users
- Arabic: With proper RTL text rendering

### Text Rendering

- Arabic text uses the Noto Naskh Arabic font for proper display
- All prayer names are correctly translated
- UI elements adapt to the selected language

## 🛡️ Privacy and Data

### Data Collection

- The application does not collect or store any personal information
- Location data is only used to fetch relevant prayer times
- No data is transmitted to any server other than the prayer times API

### Local Storage

- All user preferences are stored locally in your browser
- Data remains on your device and is never transmitted
- You can clear this data by clearing your browser's LocalStorage

## 🧭 Navigation

### Screen Navigation

- The application is designed for single-screen use
- To change locations, use the "Change Location" button in the header
- Theme and language can be changed at any time via the header controls

### Accessibility Features

- The interface includes proper ARIA labels
- Sufficient color contrast for readability
- Keyboard navigation support for all interactive elements
- Screen reader compatibility

## 🌙 Dark Mode Benefits

### When to Use Dark Mode

- Low-light environments to reduce eye strain
- Nighttime prayer time viewing
- Personal preference for darker interfaces

### Automatic Switching

- While the application doesn't automatically switch themes based on time, your preference is remembered

## 🔄 Refreshing Data

### Manual Refresh

- The application automatically fetches new prayer times daily
- If you need to force a refresh, you can change your location and change it back
- Prayer times are cached for 30 days but update automatically as needed

## 📊 Understanding the Progress System

### Daily Progress

- The circular progress bar represents your position in the daily prayer cycle
- It starts empty at midnight and fills as you progress through the daily prayers
- This provides a visual representation of your progress through the day's prayer obligations

### Countdown Interpretation

- The countdown always shows time until the next prayer
- After the last prayer of the day, it typically counts down to the first prayer of the next day
