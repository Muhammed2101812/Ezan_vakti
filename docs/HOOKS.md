# 🔌 Hooks Documentation

This document details all custom React hooks used in the Prayer Times Lite application, including their purpose, usage, and implementation details.

## 📋 Hook List

### 1. useGeolocation.js

#### Purpose

The `useGeolocation` hook provides access to the browser's Geolocation API, handling the complexity of requesting location permissions and retrieving coordinates.

#### Implementation

```javascript
import { useState } from "react";

export function useGeolocation() {
  // Implementation details as per the plan
}
```

#### State Values

| State     | Type        | Description                                  |
| --------- | ----------- | -------------------------------------------- |
| `loading` | boolean     | Indicates if location request is in progress |
| `error`   | string/null | Error message if location request fails      |

#### Returned Object

| Property      | Type        | Description                             |
| ------------- | ----------- | --------------------------------------- |
| `getLocation` | function    | Async function to request user location |
| `loading`     | boolean     | Loading state                           |
| `error`       | string/null | Error state                             |

#### `getLocation` Function

- Returns a Promise that resolves to a coordinates object: `{ latitude: number, longitude: number }`
- Handles browser compatibility checks
- Implements high accuracy settings with a 10-second timeout
- Provides detailed error messages for different failure types:
  - `PERMISSION_DENIED`: When user denies location access
  - `POSITION_UNAVAILABLE`: When location information is unavailable
  - `TIMEOUT`: When location request times out
  - `NOT_SUPPORTED`: When browser doesn't support geolocation

#### Usage Example

```javascript
import { useGeolocation } from "../hooks/useGeolocation";

function MyComponent() {
  const { getLocation, loading, error } = useGeolocation();

  const handleGetLocation = async () => {
    try {
      const coordinates = await getLocation();
      console.log(
        `Lat: ${coordinates.latitude}, Lng: ${coordinates.longitude}`,
      );
    } catch (err) {
      console.error("Location error:", err);
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation} disabled={loading}>
        {loading ? "Getting location..." : "Get Location"}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

#### Error Handling

- Comprehensive error handling for all geolocation API error types
- User-friendly error messages
- Graceful fallback options for users who deny permissions

---

### 2. usePrayerTimes.js

#### Purpose

The `usePrayerTimes` hook manages the retrieval and caching of prayer times for a specific location, handling API calls, error management, and automatic updates.

#### Implementation

```javascript
import { useState, useEffect } from "react";
import { fetchPrayerTimes } from "../utils/api";
import dayjs from "dayjs";
```

#### State Values

| State         | Type        | Description                                     |
| ------------- | ----------- | ----------------------------------------------- |
| `prayerTimes` | object/null | Prayer times data object (null if not loaded)   |
| `loading`     | boolean     | Indicates if prayer time request is in progress |
| `error`       | string/null | Error message if prayer time request fails      |

#### Props

| Prop       | Type   | Description                                                   |
| ---------- | ------ | ------------------------------------------------------------- |
| `location` | object | Location object containing districtId and other location data |

#### Returned Object

| Property      | Type        | Description                               |
| ------------- | ----------- | ----------------------------------------- |
| `prayerTimes` | object/null | Current prayer times data                 |
| `loading`     | boolean     | Loading state                             |
| `error`       | string/null | Error state                               |
| `refetch`     | function    | Function to manually refetch prayer times |

#### Features

- Automatic fetching when location changes
- LocalStorage caching with 30-day expiration
- Parsing of time data into dayjs objects for easy comparison
- Automatic refetching at midnight for new day's data
- Fallback to cached data when API is unavailable
- Error handling when API or network fails

#### Usage Example

```javascript
import { usePrayerTimes } from "../hooks/usePrayerTimes";

function PrayerDisplay() {
  const { prayerTimes, loading, error } = usePrayerTimes(userLocation);

  if (loading) return <div>Loading prayer times...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Prayer Times</h2>
      <p>Fajr: {prayerTimes.fajr}</p>
      <p>Dhuhr: {prayerTimes.dhuhr}</p>
      {/* ... other prayer times */}
    </div>
  );
}
```

#### Helper Functions

The hook internally uses:

- `getNextPrayer(currentTime)` - Determines the next prayer time
- `getCurrentPrayer(currentTime)` - Determines the current prayer time
- `calculateTimeUntilNext(currentTime, nextPrayer)` - Calculates time until next prayer

---

### 3. useTheme.js

#### Purpose

The `useTheme` hook manages the application's theme state, handling theme switching between light and dark modes, and persisting the user's preference to LocalStorage.

#### Implementation

```javascript
import { useState, useEffect } from "react";
```

#### State Values

| State   | Type   | Description                       |
| ------- | ------ | --------------------------------- |
| `theme` | string | Current theme ("light" or "dark") |

#### Returned Object

| Property      | Type     | Description                       |
| ------------- | -------- | --------------------------------- |
| `theme`       | string   | Current theme value               |
| `toggleTheme` | function | Function to toggle between themes |

#### Features

- Persists theme preference to LocalStorage
- Adds/removes the "dark" class from document.documentElement
- Initializes with user's previously saved theme preference
- Provides a toggle function for theme switching

#### Usage Example

```javascript
import { useTheme } from "../hooks/useTheme";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </header>
  );
}
```

#### Side Effects

- On theme change, updates the `dark` class on the document element
- Saves theme preference to LocalStorage
- Maintains theme across browser sessions

---

### 4. useLanguage.js

#### Purpose

The `useLanguage` hook manages the application's language state, handling language switching between Turkish, English, and Arabic, and persisting the user's preference to LocalStorage.

#### Implementation

```javascript
import { useState, useEffect } from "react";
```

#### State Values

| State      | Type   | Description                                 |
| ---------- | ------ | ------------------------------------------- |
| `language` | string | Current language code ("tr", "en", or "ar") |

#### Returned Object

| Property      | Type     | Description                  |
| ------------- | -------- | ---------------------------- |
| `language`    | string   | Current language code        |
| `setLanguage` | function | Function to set the language |

#### Supported Languages

- "tr" - Turkish
- "en" - English
- "ar" - Arabic (with RTL support)

#### Features

- Persists language preference to LocalStorage
- Updates document.documentElement.lang attribute
- Initializes with user's previously saved language preference
- Supports RTL (right-to-left) layout for Arabic

#### Usage Example

```javascript
import { useLanguage } from "../hooks/useLanguage";

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="tr">Türkçe</option>
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
}
```

#### Side Effects

- On language change, updates the lang attribute on the document element
- Saves language preference to LocalStorage
- Maintains language across browser sessions
- Triggers interface updates in components using translations

## 🔄 Hook Best Practices

### State Management

- Each hook manages its own isolated state
- State updates are batched efficiently by React
- Hooks use React's built-in state management with useState

### Side Effects

- useEffect hooks are used appropriately to handle side effects
- Side effects are cleaned up properly to prevent memory leaks
- Dependencies are correctly specified in dependency arrays

### Error Handling

- Hooks handle errors gracefully without crashing the application
- Error states are properly exposed to components using the hooks
- Fallback behavior is implemented for robust operation

### Performance

- Hooks use memoization when appropriate to prevent unnecessary re-renders
- Expensive operations are properly optimized
- Components consuming hooks are optimized for performance

## 🧪 Testing Considerations

### Mocking

- Each hook can be tested in isolation
- API calls and external dependencies should be mocked during testing
- State transitions should be validated through test cases

### Edge Cases

- Hooks should handle null/undefined values gracefully
- Error states should be tested with various error scenarios
- Loading states should be properly handled

## 🔌 Hook Composition

### Combined Usage

Hooks are designed to work together in the main App component:

```jsx
function App() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { prayerTimes, loading, error } = usePrayerTimes(location);

  // Use all three hooks together
}
```

### Dependencies

- Some hooks may have dependencies on others for optimal functionality
- Hooks should be self-contained but work well together
- Proper dependency management ensures hooks work correctly together
