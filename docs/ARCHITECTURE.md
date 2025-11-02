# 🏗️ Architecture Overview

This document describes the architecture of the Prayer Times Lite application, built with React, Vite, and TailwindCSS.

## 📚 Tech Stack

- **Framework:** React 18.3+ for component-based UI
- **Build Tool:** Vite 6.x for fast development server and optimized builds
- **Styling:** TailwindCSS 4.x with CSS-first configuration
- **Date/Time:** day.js for lightweight time calculations and formatting
- **Icons:** lucide-react for consistent UI icons
- **Storage:** Browser LocalStorage for caching and preferences
- **Geolocation:** Browser Geolocation API for location detection
- **APIs:** ezanvakti.imsakiyem.com (primary) and aladhan.com (fallback)

## 📁 Directory Structure

```
prayer-times-lite/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── sounds/          # (future) ezan sounds
│   ├── components/
│   │   ├── Header.jsx       # Logo, theme toggle, language selector
│   │   ├── LocationPicker.jsx  # GPS + manual location selection
│   │   ├── CountdownTimer.jsx  # Next prayer countdown with progress
│   │   ├── PrayerTimesGrid.jsx # Grid display of 6 prayer times
│   │   ├── ProgressBar.jsx  # Visual progress between prayers
│   │   └── ErrorBoundary.jsx   # Error handling component
│   ├── hooks/
│   │   ├── useGeolocation.js   # Geolocation management
│   │   ├── usePrayerTimes.js   # API calls and caching
│   │   ├── useTheme.js         # Theme management (dark/light)
│   │   └── useLanguage.js      # Language management (TR/EN/AR)
│   ├── utils/
│   │   ├── api.js           # API functions and rate limiting
│   │   ├── storage.js       # LocalStorage wrapper
│   │   ├── timeCalculations.js  # Prayer time calculations
│   │   └── locationHelpers.js   # Location search and transformation
│   ├── constants/
│   │   ├── translations.js  # Translation strings
│   │   └── config.js        # Configuration settings
│   ├── App.jsx              # Main application component
│   ├── index.css            # TailwindCSS and custom styles
│   └── main.jsx             # React entry point
├── .env
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🧩 Component Architecture

### Main Components

- **`App.jsx`**: The main component that orchestrates the application flow:
  - Checks for saved location from LocalStorage
  - Shows LocationPicker if no location is set
  - Manages state for theme, language, and prayer times
  - Coordinates all other components

- **`LocationPicker.jsx`**: Handles user location selection:
  - Offers GPS and manual selection options
  - Implements country → state → district cascade
  - Integrates with geolocation and API functions
  - Saves location to LocalStorage

- **`Header.jsx`**: Displays app header with controls:
  - Logo/title display
  - Theme toggle button (light/dark)
  - Language selector (TR/EN/AR)
  - Current location display

- **`CountdownTimer.jsx`**: Shows time until next prayer:
  - Real-time countdown (HH:MM:SS)
  - Circular progress bar visualization
  - Updates every second
  - Shows prayer name in selected language

- **`PrayerTimesGrid.jsx`**: Displays all 6 prayer times:
  - Grid layout with responsive columns
  - Visual indicators for active/past/upcoming prayers
  - Icons representing each prayer time
  - Multilingual prayer names

### Component Communication

Components communicate through React's props and state management:

- Parent components pass callbacks to children for state updates
- Custom hooks manage complex state logic
- Context API is avoided to keep the architecture simple and lightweight

## 🔌 Data Flow

### Location Flow

1. App checks LocalStorage for saved location
2. If no location, shows LocationPicker
3. User selects location (GPS or manual)
4. Location is saved to LocalStorage
5. App fetches prayer times for selected location

### Prayer Times Flow

1. usePrayerTimes hook fetches prayer times from API
2. Data is cached in LocalStorage with expiration
3. Hook calculates next prayer and time remaining
4. Components display prayer times and countdown
5. Automatic refresh occurs at midnight for next day's times

### API Integration

- Primary: ezanvakti.imsakiyem.com API for prayer times
- Fallback: aladhan.com for coordinate-based times
- Rate limiting and retry logic implemented
- Offline-first approach with LocalStorage caching

## 🎨 Styling Architecture

### TailwindCSS v4 Configuration

- CSS-first approach with `@theme` for custom properties
- Custom color palette: Primary green (#10b981), accent amber (#f59e0b)
- Dark mode support with custom variant `@custom-variant dark`
- Responsive design with mobile-first approach
- Typography: Inter (display) and Noto Naskh Arabic (Arabic text)

### Dark Mode Implementation

- Uses Tailwind's dark mode by adding `dark` class to document element
- All components support both light and dark variants
- Theme preference saved to LocalStorage
- System preference detection

## 🔧 Hook Architecture

### Custom Hooks

- **`useGeolocation`**: Encapsulates browser geolocation API
- **`usePrayerTimes`**: Manages API calls and prayer time state
- **`useTheme`**: Handles theme state and LocalStorage persistence
- **`useLanguage`**: Manages language state and UI updates

### Hook Responsibilities

- Each hook manages a specific domain of functionality
- Hooks encapsulate complex logic and side effects
- Cross-hook communication through shared state
- Proper cleanup of side effects (intervals, API calls)

## 🌐 Multilingual Support

### Translation System

- Translation constants for TR/EN/AR
- Dynamic translation function
- Automatic RTL layout for Arabic
- Language preference saved to LocalStorage

### Language Considerations

- Prayer names in all three languages
- UI strings translated
- Date/time formatting based on language
- Arabic text rendering with appropriate font

## 💾 Caching Strategy

### LocalStorage Usage

- Prayer times cached with 30-day expiration
- User settings (theme, language, location) persisted
- API rate limit management
- Offline availability of cached data

### Cache Management

- Automatic invalidation after 30 days
- Manual refresh option for users
- Error fallback to cached data
- Validation of cached objects before use

## ⚡ Performance Optimization

### Bundle Size

- Tree-shaking for unused imports
- Lightweight libraries (day.js instead of moment.js)
- Minimal dependencies
- Component-based code splitting

### Rendering Performance

- Efficient state updates
- Memoization of expensive calculations
- Virtualization for large lists (future)
- Optimized animations and transitions

### Network Efficiency

- Monthly API batch requests vs. daily
- Proper caching to reduce API calls
- Offline-first approach
- API rate limit handling
