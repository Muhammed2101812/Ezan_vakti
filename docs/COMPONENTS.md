# 🧩 Components Documentation

This document details all React components used in the Prayer Times Lite application, including their purpose, props, and usage.

## 🏗️ Component Structure

```
src/components/
├── Header.jsx
├── LocationPicker.jsx
├── CountdownTimer.jsx
├── PrayerTimesGrid.jsx
├── ProgressBar.jsx
└── ErrorBoundary.jsx
```

## 📋 Component List

### 1. Header.jsx

#### Purpose

The Header component displays the application header with controls for theme switching, language selection, and location management.

#### Props

| Prop             | Type     | Required | Description                                 |
| ---------------- | -------- | -------- | ------------------------------------------- |
| theme            | string   | Yes      | Current theme ("light" or "dark")           |
| onThemeToggle    | function | Yes      | Callback to toggle the theme                |
| language         | string   | Yes      | Current language code ("tr", "en", or "ar") |
| onLanguageChange | function | Yes      | Callback to change language                 |
| location         | object   | Yes      | Location object with name information       |
| onLocationChange | function | Yes      | Callback to change location                 |

#### Usage Example

```jsx
<Header
  theme={currentTheme}
  onThemeToggle={toggleTheme}
  language={currentLanguage}
  onLanguageChange={setLanguage}
  location={userLocation}
  onLocationChange={changeLocation}
/>
```

#### Internal State

- Manages the language selector dropdown state
- Handles responsive behavior for mobile view

#### UI Elements

- App logo
- Theme toggle button (sun/moon icon)
- Language selector dropdown (TR/EN/AR)
- Location display
- Change location button

---

### 2. LocationPicker.jsx

#### Purpose

The LocationPicker component allows users to select their location either through GPS or manual selection from country → state → district hierarchy.

#### Props

| Prop             | Type     | Required | Description                           |
| ---------------- | -------- | -------- | ------------------------------------- |
| onLocationSelect | function | Yes      | Callback to handle location selection |

#### Usage Example

```jsx
<LocationPicker onLocationSelect={handleLocationSelect} />
```

#### Internal State

- `method`: Current selection method ('gps' or 'manual')
- `loading`: Loading state for GPS requests
- `error`: Error state for location retrieval
- `selectedCountry`: Currently selected country
- `selectedState`: Currently selected state
- `selectedDistrict`: Currently selected district

#### UI Elements

- Two selection method buttons (GPS and Manual)
- GPS loading indicator
- Country dropdown with search
- State dropdown with search
- District dropdown with search
- Location confirmation button
- Error messages display

#### API Integration

- Uses `fetchCountries`, `fetchStates`, `fetchDistricts` from `api.js`
- Implements `useGeolocation` hook for GPS functionality
- Uses reverse geocoding for GPS to location mapping

---

### 3. CountdownTimer.jsx

#### Purpose

The CountdownTimer component displays the time remaining until the next prayer with a visual circular progress bar.

#### Props

| Prop        | Type   | Required | Description                        |
| ----------- | ------ | -------- | ---------------------------------- |
| prayerTimes | object | Yes      | Object containing all prayer times |
| language    | string | Yes      | Current language for translations  |

#### Usage Example

```jsx
<CountdownTimer prayerTimes={currentPrayerTimes} language={currentLanguage} />
```

#### Internal State

- `timeLeft`: Formatted time string (HH:MM:SS) until next prayer
- `percentage`: Percentage of progress through the day
- `nextPrayerName`: Name of the next prayer in selected language

#### UI Elements

- Circular SVG progress bar
- Large countdown display (HH:MM:SS)
- Prayer name text
- Optional current time display

#### Features

- Updates every second
- Real-time calculation of time until next prayer
- Visual progress representation
- Multilingual prayer name display
- Smooth animation for progress updates

---

### 4. PrayerTimesGrid.jsx

#### Purpose

The PrayerTimesGrid component displays all 6 daily prayer times in a responsive grid layout with visual indicators for active, past, and upcoming prayers.

#### Props

| Prop        | Type   | Required | Description                        |
| ----------- | ------ | -------- | ---------------------------------- |
| prayerTimes | object | Yes      | Object containing all prayer times |
| language    | string | Yes      | Current language for translations  |

#### Usage Example

```jsx
<PrayerTimesGrid prayerTimes={currentPrayerTimes} language={currentLanguage} />
```

#### Internal State

- Identifies which prayer is currently active
- Determines which prayers are in the past vs. future

#### UI Elements

- Responsive grid (2 columns on mobile, 3 on tablet/desktop)
- Individual prayer cards with:
  - Prayer-specific icon
  - Prayer name in selected language
  - Time in HH:MM format
- Visual styling based on prayer status:
  - Active prayer: amber background with scale and pulse animation
  - Past prayers: 50% opacity
  - Upcoming prayers: normal styling

#### Features

- Responsive design for all screen sizes
- Visual status indicators for prayer times
- Animation for active prayer
- Multilingual prayer name display
- Touch-friendly card sizes

---

### 5. ProgressBar.jsx

#### Purpose

The ProgressBar component provides a visual representation of progress between prayer times, potentially used in conjunction with the CountdownTimer component.

#### Props

| Prop       | Type   | Required | Description                                  |
| ---------- | ------ | -------- | -------------------------------------------- |
| percentage | number | Yes      | Progress percentage (0-100)                  |
| size       | string | No       | Size of the bar ("small", "medium", "large") |

#### Usage Example

```jsx
<ProgressBar percentage={progressPercentage} size="large" />
```

#### Internal State

- Manages the visual representation of the progress percentage

#### UI Elements

- Circular SVG progress indicator
- Percentage value display (optional)
- Customizable size properties

#### Features

- Animated progress updates
- Customizable appearance
- Responsive sizing
- Smooth transitions

---

### 6. ErrorBoundary.jsx

#### Purpose

The ErrorBoundary component catches JavaScript errors anywhere in the child component tree, logs those errors, and displays a fallback UI.

#### Props

| Prop     | Type      | Required | Description                           |
| -------- | --------- | -------- | ------------------------------------- |
| children | ReactNode | Yes      | Child components to wrap              |
| fallback | ReactNode | No       | Fallback UI to show when error occurs |

#### Usage Example

```jsx
<ErrorBoundary fallback={<ErrorMessage />}>
  <AppContent />
</ErrorBoundary>
```

#### Internal State

- `hasError`: Boolean indicating if an error occurred

#### UI Elements

- Fallback UI when an error is caught
- Error message display
- Optional refresh button

#### Features

- Catches errors in component rendering
- Prevents app crashes
- Provides user-friendly error messaging
- Option to recover from errors

## 🎨 Styling Convention

### TailwindCSS Classes

All components use TailwindCSS utility classes with the following conventions:

- Color palette: Primary green (#10b981), accent amber (#f59e0b)
- Responsive breakpoints: Mobile-first approach
- Dark mode variants: Using `dark:` prefix
- Consistent spacing with Tailwind's spacing scale

### Component Styling

- Components should be self-contained with all necessary styling
- Minimal use of custom CSS beyond Tailwind
- Consistent padding and margins across components
- Responsive design built into all components

## 🔌 Component Communication

### Prop Drilling

- Data flows from parent to child components via props
- Callback functions are passed down for child-to-parent communication
- Complex state management is handled in custom hooks

### Event Handling

- Components use React's event handling system
- All user interactions trigger callback functions
- Events are properly typed and documented

## 🧪 Component Testing

### Testing Considerations

- Components should be testable in isolation
- Props should be well-defined and documented
- Components should handle edge cases gracefully
- Error boundaries protect against component crashes

### Accessibility

- All components meet WCAG 2.1 AA standards
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## 🔄 Component Lifecycle

### Mounting

- Components initialize with proper default states
- API calls are made in useEffect hooks when needed
- Event listeners are added if necessary

### Updating

- Components efficiently re-render based on prop changes
- Expensive operations are memoized when appropriate
- State updates are batched for performance

### Unmounting

- Event listeners are removed
- Timers and intervals are cleared
- Subscriptions are cleaned up
