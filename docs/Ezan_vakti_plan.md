# 🕌 EZAN VAKTİ UYGULAMASI - DETAYLI GELİŞTİRME PLANI

## 📋 Proje Özeti

**Proje Adı:** Prayer Times Lite
**Amaç:** Minimal, dikkat dağıtmayan, sadece vakit gösteren web uygulaması
**Hedef Platform:** Web (Responsive, mobile-first)
**Teknoloji:** React + Vite + TailwindCSS
**Diller:** Türkçe, İngilizce, Arapça

**Temel Özellikler:**

- 6 vakit gösterimi (İmsak, Güneş, Öğle, İkindi, Akşam, Yatsı)
- Bir sonraki vakite countdown + progress bar
- GPS ve manuel konum seçimi
- Karanlık/Aydınlık tema
- Çoklu dil desteği
- Offline-ready (LocalStorage cache)

---

## 🛠 Teknoloji Stack

```json
{
  "framework": "React 18.3+",
  "buildTool": "Vite 6.x",
  "styling": "TailwindCSS 4.x",
  "dateLibrary": "day.js",
  "icons": "lucide-react",
  "storage": "LocalStorage API",
  "geolocation": "Browser Geolocation API",
  "api": {
    "primary": "ezanvakti.imsakiyem.com",
    "fallback": "aladhan.com"
  }
}
```

**Neden Bu Stack?**

- **Vite:** Çok hızlı dev server, modern build[^1]
- **TailwindCSS v4:** CSS-first config, dark mode built-in[^2][^3]
- **day.js:** Hafif (2KB), timezone desteği, kolay countdown[^4]
- **lucide-react:** Modern, SVG ikonlar, tree-shakeable

---

## 📁 Klasör Yapısı

```
prayer-times-lite/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── sounds/          # (opsiyonel) ezan sesi
│   ├── components/
│   │   ├── Header.jsx       # Logo, tema toggle, dil seçici
│   │   ├── LocationPicker.jsx  # GPS + manuel seçim
│   │   ├── CountdownTimer.jsx  # Bir sonraki vakite sayaç
│   │   ├── PrayerTimesGrid.jsx # 6 vaktin listesi
│   │   ├── ProgressBar.jsx  # Vakitler arası progress
│   │   └── ErrorBoundary.jsx   # Hata yakalama
│   ├── hooks/
│   │   ├── useGeolocation.js   # GPS hook
│   │   ├── usePrayerTimes.js   # API çağrıları + cache
│   │   ├── useTheme.js         # Dark mode toggle
│   │   └── useLanguage.js      # Çoklu dil
│   ├── utils/
│   │   ├── api.js           # API fonksiyonları
│   │   ├── storage.js       # LocalStorage wrapper
│   │   ├── timeCalculations.js  # Vakit hesaplamaları
│   │   └── locationHelpers.js   # Şehir/ilçe arama
│   ├── constants/
│   │   ├── translations.js  # Çeviri dosyaları
│   │   └── config.js        # API URLs, limits
│   ├── App.jsx              # Ana component
│   ├── index.css            # TailwindCSS + custom styles
│   └── main.jsx             # React entry point
├── .env                     # Çevre değişkenleri
├── package.json
├── vite.config.js
└── tailwind.config.js       # v4 CSS-first config
```

---

## 🎨 Tasarım Sistemi

### Renk Paleti (Yeşil Tonlar, Modern)

```css
/* index.css */
@import "tailwindcss";

@theme {
  --color-primary-50: #ecfdf5;
  --color-primary-100: #d1fae5;
  --color-primary-500: #10b981; /* Ana yeşil */
  --color-primary-600: #059669;
  --color-primary-700: #047857;
  --color-primary-900: #064e3b;

  --color-accent: #f59e0b; /* Amber - aktif vakit vurgusu */

  --font-display: "Inter", system-ui, sans-serif;
  --font-arabic: "Noto Naskh Arabic", serif;
}

/* Dark mode custom variant (TailwindCSS v4) */
@custom-variant dark (&:where(.dark, .dark *));
```

### Tipografi

```html
<!-- Google Fonts CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;600&display=swap"
  rel="stylesheet"
/>
```

---

## 🧩 Component Detayları

### 1. App.jsx (Ana Yapı)

```jsx
// PSEUDO-CODE (AI Studio'ya ver)
import { useState, useEffect } from "react";
import Header from "./components/Header";
import LocationPicker from "./components/LocationPicker";
import CountdownTimer from "./components/CountdownTimer";
import PrayerTimesGrid from "./components/PrayerTimesGrid";
import { usePrayerTimes } from "./hooks/usePrayerTimes";
import { useTheme } from "./hooks/useTheme";
import { useLanguage } from "./hooks/useLanguage";

function App() {
  const [location, setLocation] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { prayerTimes, loading, error } = usePrayerTimes(location);

  // İlk yükleme: Kayıtlı konum var mı kontrol et
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) setLocation(JSON.parse(savedLocation));
  }, []);

  // Konum yoksa LocationPicker göster
  if (!location) {
    return <LocationPicker onLocationSelect={setLocation} />;
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors">
        <Header
          theme={theme}
          onThemeToggle={toggleTheme}
          language={language}
          onLanguageChange={setLanguage}
          location={location}
          onLocationChange={() => setLocation(null)}
        />

        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}

        {prayerTimes && (
          <>
            <CountdownTimer prayerTimes={prayerTimes} />
            <PrayerTimesGrid prayerTimes={prayerTimes} language={language} />
          </>
        )}
      </div>
    </div>
  );
}
```

### 2. LocationPicker.jsx

**Özellikler:**

- İki seçenek: GPS veya Manuel
- GPS butonu: Geolocation API kullan
- Manuel: Ülke → Şehir → İlçe dropdown cascade
- Arama özelliği: Yazmaya başlayınca filtrele

```jsx
// PSEUDO-CODE
import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { fetchCountries, fetchStates, fetchDistricts } from '../utils/api';

function LocationPicker({ onLocationSelect }) {
  const [method, setMethod] = useState(null); // 'gps' | 'manual'
  const { getLocation, loading, error } = useGeolocation();

  const handleGPS = async () => {
    const coords = await getLocation();
    // Koordinatları reverse geocode et
    const location = await reverseGeocode(coords);
    onLocationSelect(location);
  };

  const handleManual = async (country, state, district) => {
    onLocationSelect({ country, state, district, districtId });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!method && (
        // İki buton: GPS veya Manuel
      )}
      {method === 'gps' && (
        // GPS yükleniyor animasyonu
      )}
      {method === 'manual' && (
        // Cascade dropdown'lar
      )}
    </div>
  );
}
```

### 3. CountdownTimer.jsx

**Özellikler:**

- Bir sonraki vakite kalan süre (HH:MM:SS)
- Dairesel progress bar (SVG)
- Gerçek zamanlı güncelleme (her saniye)

```jsx
// PSEUDO-CODE
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

function CountdownTimer({ prayerTimes }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const nextPrayer = getNextPrayer(prayerTimes, now);
      const diff = dayjs(nextPrayer.time).diff(now);
      const dur = dayjs.duration(diff);

      setTimeLeft(`${dur.hours()}:${dur.minutes()}:${dur.seconds()}`);
      setPercentage(calculatePercentage(now, nextPrayer));
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  return (
    <div className="text-center py-12">
      {/* SVG Circular Progress Bar */}
      <svg className="w-64 h-64 mx-auto">
        <circle stroke="currentColor" className="text-gray-200" />
        <circle
          stroke="currentColor"
          className="text-primary-500"
          strokeDasharray={`${percentage} 100`}
        />
      </svg>
      <h2 className="text-5xl font-bold">{timeLeft}</h2>
      <p className="text-gray-600">Öğle namazına kalan süre</p>
    </div>
  );
}
```

### 4. PrayerTimesGrid.jsx

**Özellikler:**

- 6 vakit kartları
- Aktif vakti vurgula (amber renk)
- Geçmiş vakitler soluk
- İkonlar (güneş, ay vs.)

```jsx
// PSEUDO-CODE
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";

const PRAYER_ICONS = {
  fajr: Moon,
  sunrise: Sunrise,
  dhuhr: Sun,
  asr: Sun,
  maghrib: Sunset,
  isha: Moon,
};

function PrayerTimesGrid({ prayerTimes, language }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 pb-8">
      {Object.entries(prayerTimes).map(([key, time]) => {
        const Icon = PRAYER_ICONS[key];
        const isActive = checkIfActive(time);
        const isPast = checkIfPast(time);

        return (
          <div
            key={key}
            className={`
              p-6 rounded-xl shadow-lg
              ${isActive ? "bg-accent text-white scale-105" : "bg-white dark:bg-gray-800"}
              ${isPast ? "opacity-50" : ""}
              transition-all duration-300
            `}
          >
            <Icon className="w-8 h-8 mb-2" />
            <h3>{translate(key, language)}</h3>
            <p className="text-2xl font-bold">{time}</p>
          </div>
        );
      })}
    </div>
  );
}
```

---

## 🔌 API Entegrasyonu Stratejisi

### API Kullanım Planı[^5]

```javascript
// utils/api.js

const API_BASE = "https://ezanvakti.imsakiyem.com/api";
const CACHE_DURATION = 30; // 30 gün

// 1. Konum Seçimi: Ülke/Şehir/İlçe
export async function fetchCountries() {
  const response = await fetch(`${API_BASE}/locations/countries`);
  return response.json();
}

export async function fetchStates(countryId) {
  const response = await fetch(
    `${API_BASE}/locations/states?countryId=${countryId}`,
  );
  return response.json();
}

export async function fetchDistricts(stateId) {
  const response = await fetch(
    `${API_BASE}/locations/districts?stateId=${stateId}`,
  );
  return response.json();
}

// 2. Vakit Verileri: Aylık çek, cache'le
export async function fetchPrayerTimes(districtId, startDate) {
  const cacheKey = `prayer_${districtId}_${startDate}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    const daysPassed = dayjs().diff(dayjs(timestamp), "days");
    if (daysPassed < CACHE_DURATION) return data;
  }

  // API çağrısı
  const response = await fetch(
    `${API_BASE}/prayer-times/${districtId}/monthly?startDate=${startDate}`,
  );
  const data = await response.json();

  // Cache'e kaydet
  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      data,
      timestamp: new Date().toISOString(),
    }),
  );

  return data;
}

// 3. Rate Limit Yönetimi
export async function apiRequest(url, retries = 3) {
  try {
    const response = await fetch(url);
    if (response.status === 429) {
      // 5 dakika bekle
      await new Promise((resolve) => setTimeout(resolve, 5 * 60 * 1000));
      if (retries > 0) return apiRequest(url, retries - 1);
    }
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
```

### Reverse Geocoding (GPS → İlçe)

GPS koordinatlarından ilçe bulmak için iki yöntem:

**Yöntem 1: Nominatim API (Ücretsiz)**

```javascript
async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const response = await fetch(url);
  const data = await response.json();

  // İlçe adını al
  const district = data.address.town || data.address.city_district;

  // Ezanvakti API'den ilçe ID'sini bul
  const districtData = await searchDistrict(district);
  return districtData;
}
```

**Yöntem 2: Aladhan API (Koordinat bazlı vakit)**

```javascript
async function fetchPrayerTimesByCoords(lat, lon) {
  const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=13`;
  const response = await fetch(url);
  return response.json();
}
```

**Önerim:** İkisini kombine kullan - GPS ile Nominatim'den ilçe al, sonra Ezanvakti API'ye geç.[^6][^5]

---

## 🎯 Custom Hooks

### 1. useGeolocation.js[^7]

```javascript
import { useState } from "react";

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation desteklenmiyor");
        return;
      }

      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setLoading(false);
          setError(err.message);
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 10000 },
      );
    });
  };

  return { getLocation, loading, error };
}
```

### 2. usePrayerTimes.js

```javascript
import { useState, useEffect } from "react";
import { fetchPrayerTimes } from "../utils/api";
import dayjs from "dayjs";

export function usePrayerTimes(location) {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;

    const loadPrayerTimes = async () => {
      setLoading(true);
      try {
        const data = await fetchPrayerTimes(
          location.districtId,
          dayjs().format("YYYY-MM-DD"),
        );

        // Bugünün vakitlerini çıkar
        const today = data.find((d) => d.date === dayjs().format("YYYY-MM-DD"));
        setPrayerTimes(today);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPrayerTimes();
  }, [location]);

  return { prayerTimes, loading, error };
}
```

### 3. useTheme.js[^1]

```javascript
import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
```

### 4. useLanguage.js

```javascript
import { useState, useEffect } from "react";

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "tr";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  return { language, setLanguage };
}
```

---

## 🌍 Çoklu Dil Desteği

```javascript
// constants/translations.js

export const translations = {
  tr: {
    prayerNames: {
      fajr: "İmsak",
      sunrise: "Güneş",
      dhuhr: "Öğle",
      asr: "İkindi",
      maghrib: "Akşam",
      isha: "Yatsı",
    },
    ui: {
      chooseLocation: "Konum Seçin",
      useGPS: "GPS Kullan",
      manualLocation: "Manuel Seç",
      timeUntil: "namazına kalan süre",
      changeLocation: "Konumu Değiştir",
    },
  },
  en: {
    prayerNames: {
      fajr: "Fajr",
      sunrise: "Sunrise",
      dhuhr: "Dhuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",
    },
    ui: {
      chooseLocation: "Choose Location",
      useGPS: "Use GPS",
      manualLocation: "Manual Selection",
      timeUntil: "until prayer",
      changeLocation: "Change Location",
    },
  },
  ar: {
    prayerNames: {
      fajr: "الفجر",
      sunrise: "الشروق",
      dhuhr: "الظهر",
      asr: "العصر",
      maghrib: "المغرب",
      isha: "العشاء",
    },
    ui: {
      chooseLocation: "اختر الموقع",
      useGPS: "استخدم GPS",
      manualLocation: "اختيار يدوي",
      timeUntil: "حتى صلاة",
      changeLocation: "تغيير الموقع",
    },
  },
};

export function translate(key, language, section = "prayerNames") {
  return translations[language]?.[section]?.[key] || key;
}
```

---

## 📝 ADIM ADIM GELİŞTİRME PLANI

Her adım için **AI Studio'ya verebileceğin prompt** hazırladım.

### **ADIM 1: Proje Kurulumu** (30 dakika)

**AI Studio Promptu:**

```
Create a new React project using Vite with the following setup:

1. Initialize project:
   npm create vite@latest prayer-times-lite -- --template react

2. Install dependencies:
   npm install
   npm install -D tailwindcss@latest postcss autoprefixer
   npm install dayjs lucide-react

3. Configure TailwindCSS v4:
   - Create tailwind.config.js with CSS-first approach
   - Set up dark mode with @custom-variant
   - Add custom colors: primary green (#10b981), accent amber (#f59e0b)

4. Create folder structure as specified:
   src/
   ├── components/
   ├── hooks/
   ├── utils/
   ├── constants/

5. Set up index.css with:
   @import "tailwindcss";
   @theme { ... custom colors }
   @custom-variant dark (&:where(.dark, .dark *));

6. Add Google Fonts (Inter, Noto Naskh Arabic) to index.html

Provide complete code for all configuration files.
```

**Beklenen Çıktı:** Çalışan boş React projesi, TailwindCSS configured, dark mode hazır

---

### **ADIM 2: Theme \& Language Hooks** (1 saat)

**AI Studio Promptu:**

```
Create three custom React hooks for our prayer times app:

1. useTheme.js:
   - useState to manage theme (light/dark)
   - Load initial theme from localStorage
   - Toggle function that adds/removes 'dark' class from document.documentElement
   - Save theme to localStorage on change
   - Return { theme, toggleTheme }

2. useLanguage.js:
   - Support 3 languages: 'tr', 'en', 'ar'
   - Load initial language from localStorage (default: 'tr')
   - Update document.documentElement.lang attribute
   - Save to localStorage
   - Return { language, setLanguage }

3. translations.js (constants folder):
   - Create translation object with prayer names in Turkish, English, Arabic
   - Add UI strings (buttons, labels)
   - Export translate() helper function

Include full TypeScript-style JSDoc comments for each function.
Provide example usage in App.jsx.
```

**Beklenen Çıktı:** 3 çalışan hook, translation sistemi

---

### **ADIM 3: Header Component** (45 dakika)

**AI Studio Promptu:**

```
Create a Header component for a prayer times app with:

Features:
- App logo/title (left side)
- Theme toggle button (sun/moon icon from lucide-react)
- Language selector dropdown (TR/EN/AR flags or text)
- Location name display
- "Change Location" button (small, secondary)

Design:
- Sticky header (stays on top when scrolling)
- Glass morphism effect: backdrop-blur-lg, bg-white/80
- Mobile-responsive: collapse to hamburger menu on small screens
- Smooth transitions for theme changes
- Dark mode styles

Props:
- theme, onThemeToggle
- language, onLanguageChange
- location (object with city/district name)
- onLocationChange

Use TailwindCSS classes. Make it modern and minimal.
Provide complete component code with all states and handlers.
```

**Beklenen Çıktı:** Modern, responsive header component

---

### **ADIM 4: API Utility Functions** (1.5 saat)

**AI Studio Promptu:**

```
Create API utility functions for ezanvakti.imsakiyem.com API:

File: utils/api.js

Functions to implement:

1. fetchCountries()
   GET /api/locations/countries
   Return array of countries

2. fetchStates(countryId)
   GET /api/locations/states?countryId={id}
   Return array of states/cities

3. fetchDistricts(stateId)
   GET /api/locations/districts?stateId={id}
   Return array of districts

4. searchDistrict(query)
   GET /api/locations/search/districts?q={query}
   Return matching districts

5. fetchPrayerTimes(districtId, startDate)
   GET /api/prayer-times/{districtId}/monthly?startDate={date}
   - Check localStorage cache first
   - Cache for 30 days
   - Return today's prayer times: { fajr, sunrise, dhuhr, asr, maghrib, isha }

6. handleRateLimit(response)
   - Detect 429 status
   - Wait 5 minutes and retry (max 3 retries)
   - Show user-friendly error

7. reverseGeocode(lat, lon)
   - Use Nominatim API to get district name from coordinates
   - Then search district in ezanvakti API
   - Return districtId and location object

Add proper error handling, timeout (10s), and loading states.
Include JSDoc comments with examples.
```

**Beklenen Çıktı:** API fonksiyonları, cache sistemi, hata yönetimi

---

### **ADIM 5: Geolocation Hook** (30 dakika)

**AI Studio Promptu:**

```
Create useGeolocation custom hook:

Features:
- getLocation() function that returns Promise<{latitude, longitude}>
- Use navigator.geolocation.getCurrentPosition
- Options: enableHighAccuracy: true, timeout: 10000ms
- Loading state while getting location
- Error handling:
  - PERMISSION_DENIED: "GPS izni reddedildi"
  - POSITION_UNAVAILABLE: "Konum tespit edilemedi"
  - TIMEOUT: "Konum alınamadı (zaman aşımı)"
  - NOT_SUPPORTED: "Tarayıcınız GPS desteklemiyor"

Return: { getLocation, loading, error }

Also provide error display component that shows user-friendly messages.
```

**Beklenen Çıktı:** GPS hook + hata mesajları

---

### **ADIM 6: LocationPicker Component** (2 saat)

**AI Studio Promptu:**

```
Create LocationPicker component - the first screen users see:

Layout:
- Centered modal (fixed, takes full screen on mobile)
- Two big buttons:
  1. GPS button (MapPin icon): "Konumumu Kullan"
  2. Manual button (Search icon): "Manuel Seç"

GPS Flow:
- Click → Show loading spinner
- Call useGeolocation
- Show permission request dialog
- On success: reverseGeocode → get district → call onLocationSelect
- On error: Show error message, offer manual selection

Manual Flow:
- Show cascade dropdowns:
  Step 1: Country selector (default: Turkey)
  Step 2: State/City selector (filtered by country)
  Step 3: District selector (filtered by state)
  Step 4: Confirm button
- Each dropdown has search/filter
- Use fetchCountries, fetchStates, fetchDistricts from api.js

Save location to localStorage when selected.

Design:
- Large touch-friendly buttons
- Loading states with spinner
- Error states with retry button
- Smooth animations (fadeIn, slideUp)
- Mobile-first responsive

Props: onLocationSelect(locationObject)

Include all state management and API calls.
```

**Beklenen Çıktı:** Tam çalışan konum seçim ekranı

---

### **ADIM 7: usePrayerTimes Hook** (45 dakika)

**AI Studio Promptu:**

```
Create usePrayerTimes custom hook:

Input: location object (with districtId)

Logic:
1. On location change:
   - Call fetchPrayerTimes(location.districtId, today)
   - Get monthly data
   - Filter today's times
   - Parse times into dayjs objects for easy comparison

2. Return object:
   {
     prayerTimes: {
       fajr: { name: 'İmsak', time: '04:30', dayjs: dayjsObj },
       sunrise: { name: 'Güneş', time: '06:15', ... },
       dhuhr: ...,
       asr: ...,
       maghrib: ...,
       isha: ...
     },
     nextPrayer: { name: 'Öğle', time: '13:05', ... },
     loading: boolean,
     error: string | null,
     refetch: function
   }

3. Automatically refetch at midnight (new day starts)

4. Handle errors gracefully:
   - API down → use cached data
   - No internet → use cached data
   - No cache → show error message

Include helper functions:
- getNextPrayer(currentTime)
- getCurrentPrayer(currentTime)
- calculateTimeUntilNext(currentTime, nextPrayer)

Use day.js for all date operations.
```

**Beklenen Çıktı:** Prayer times hook + yardımcı fonksiyonlar

---

### **ADIM 8: CountdownTimer Component** (1.5 saat)

**AI Studio Promptu:**

```
Create CountdownTimer component with circular progress bar:

Features:
- Shows next prayer name (e.g., "Öğle namazına kalan süre")
- Real-time countdown: HH:MM:SS format
- Circular progress bar (SVG):
  - Outer circle: gray (#e5e7eb)
  - Progress circle: green (#10b981), animated
  - Percentage: time passed / total time between prayers
- Updates every second with setInterval
- Shows current time in small text

Design:
- Center of screen, below header
- Large countdown numbers (text-6xl font)
- Prayer name in multiple languages (use translations)
- Smooth second-by-second animation
- Mobile responsive (smaller circle on mobile)

Technical:
- Use day.js with duration plugin
- Calculate time difference: nextPrayer.time - now
- SVG circle with strokeDasharray for progress animation
- Clean up interval on unmount

Props:
- prayerTimes (from usePrayerTimes)
- language (for translations)

Provide complete SVG circle animation code.
Handle edge case: after last prayer (Isha), show countdown to next Fajr.
```

**Beklenen Çıktı:** Animasyonlu countdown component

---

### **ADIM 9: PrayerTimesGrid Component** (1 saat)

**AI Studio Promptu:**

```
Create PrayerTimesGrid component showing all 6 prayer times:

Layout:
- Grid: 2 columns on mobile, 3 columns on tablet/desktop
- Each prayer card:
  - Icon (Sun/Moon from lucide-react based on time)
  - Prayer name (translated)
  - Time (HH:MM format)
  - Status indicator

Card States:
1. Current/Active prayer:
   - Background: Amber (#f59e0b)
   - Text: White
   - Scale: 105% (slightly larger)
   - Pulse animation

2. Upcoming prayers:
   - Background: White (light mode) / Gray-800 (dark mode)
   - Text: Normal color
   - No animation

3. Past prayers:
   - Opacity: 50%
   - Grayscale filter
   - Smaller scale (95%)

Design:
- Rounded corners (rounded-xl)
- Shadow (shadow-lg)
- Smooth transitions (transition-all duration-300)
- Touch-friendly padding
- Dark mode support

Icons mapping:
- Fajr: Moon
- Sunrise: Sunrise
- Dhuhr: Sun
- Asr: CloudSun
- Maghrib: Sunset
- Isha: Moon

Props:
- prayerTimes (object with 6 prayers)
- language (for translations)
- currentPrayer (string: which one is active)

Include helper function to determine card state.
```

**Beklenen Çıktı:** Grid component, 3 farklı state

---

### **ADIM 10: Ana App.jsx Entegrasyonu** (1 saat)

**AI Studio Promptu:**

```
Integrate all components in App.jsx:

Structure:
1. Check for saved location on mount
2. If no location → show LocationPicker (full screen)
3. If location exists → show main app:
   - Header (sticky)
   - CountdownTimer (centered, large)
   - PrayerTimesGrid (below countdown)
   - Footer (optional: small text with credits)

State Management:
- location (from localStorage or LocationPicker)
- theme (from useTheme)
- language (from useLanguage)
- prayerTimes (from usePrayerTimes)

Loading States:
- Show skeleton/spinner while fetching prayer times
- Shimmer effect for cards

Error States:
- If API fails → show error message with retry button
- If no internet → show cached data with warning banner

Auto-refresh:
- Refresh prayer times at midnight automatically
- Update countdown every second

Special Cases:
- After Isha prayer → show "Yarın İmsak" countdown
- Between prayers → highlight current time slot

Accessibility:
- ARIA labels for all buttons
- Keyboard navigation support
- Screen reader friendly

Provide complete App.jsx with all logic and error handling.
```

**Beklenen Çıktı:** Tam çalışan uygulama

---

### **ADIM 11: Responsive \& Polish** (1 saat)

**AI Studio Promptu:**

```
Add final polish and responsive design improvements:

1. Mobile Optimizations (<640px):
   - Larger touch targets (min 44px)
   - Bigger fonts for countdown
   - Simplified header (hamburger menu)
   - Stack cards vertically if needed
   - Full-width LocationPicker

2. Tablet (640px-1024px):
   - 3-column grid
   - Medium countdown size
   - Side-by-side language/theme toggles

3. Desktop (>1024px):
   - Max-width container (max-w-6xl)
   - Larger progress circle
   - Hover effects on cards
   - Smooth transitions

4. Animations:
   - Fade in on mount
   - Slide up for cards
   - Pulse for active prayer
   - Smooth theme transition (duration-500)

5. Loading States:
   - Skeleton screens for initial load
   - Shimmer effect with CSS animation
   - Spinner for API calls

6. Error Boundaries:
   - Wrap app in ErrorBoundary component
   - Catch and display React errors
   - Provide "Reload" button

7. Performance:
   - Memoize expensive calculations
   - useMemo for filtered prayer times
   - useCallback for handlers
   - Lazy load components if needed

8. Accessibility:
   - Color contrast ratio > 4.5:1
   - Focus indicators
   - Alt text for icons
   - Semantic HTML

Provide updated components with all improvements.
```

**Beklenen Çıktı:** Production-ready UI

---

### **ADIM 12: Testing \& Bug Fixes** (1 saat)

**Test Senaryoları:**

```
Manual Testing Checklist:

□ Konum Seçimi:
  □ GPS izni verildiğinde doğru konum bulunuyor mu?
  □ GPS izni reddedildiğinde manuel seçim açılıyor mu?
  □ Manuel seçimde cascade dropdown çalışıyor mu?
  □ Arama özelliği filtreliyor mu?

□ Vakit Gösterimi:
  □ Tüm 6 vakit doğru gösteriliyor mu?
  □ Aktif vakit vurgulanmış mı?
  □ Geçmiş vakitler soluk mu?

□ Countdown:
  □ Her saniye güncellenіyor mu?
  □ Progress bar animasyonu akıcı mı?
  □ Vakitler arası geçiş sorunsuz mu?
  □ Gece yarısı otomatik yenileniyor mu?

□ Tema:
  □ Dark mode tüm component'lerde çalışıyor mu?
  □ LocalStorage'a kaydediliyor mu?
  □ Sayfa yenilendiğinde hatırlıyor mu?

□ Dil:
  □ 3 dil arasında geçiş yapılıyor mu?
  □ Tüm metinler çevriliyor mu?
  □ Arapça için RTL layout (opsiyonel)

□ Responsive:
  □ Mobile'da düzgün görünüyor mu?
  □ Tablet'te 3 sütun mu?
  □ Desktop'ta max-width sınırlı mı?

□ Hata Durumları:
  □ API çalışmadığında ne oluyor?
  □ İnternet yokken cache gösteriliyor mu?
  □ Timeout'ta retry oluyor mu?

□ Performance:
  □ İlk yükleme < 2 saniye mi?
  □ Countdown sırasında lag var mı?
  □ Memory leak yok mu? (DevTools profiler)
```

**AI Studio Promptu (Bug Fixing):**

```
Review the prayer times app and fix common issues:

1. Countdown accuracy:
   - Ensure setInterval cleanup on unmount
   - Fix timezone issues with dayjs
   - Handle edge case when time passes midnight

2. API error handling:
   - Add retry logic for failed requests
   - Show user-friendly error messages
   - Gracefully fallback to cache

3. Performance:
   - Memoize expensive operations
   - Prevent unnecessary re-renders
   - Optimize SVG animations

4. State persistence:
   - Ensure localStorage writes succeed
   - Handle localStorage quota exceeded
   - Validate stored data before using

5. Responsive issues:
   - Fix layout breaks on small screens
   - Ensure buttons are touch-friendly
   - Test on real mobile devices

Provide fixes for each issue with code examples.
```

**Beklenen Çıktı:** Temiz, bug-free kod

---

### **ADIM 13: Deployment** (30 dakika)

**AI Studio Promptu:**

```
Prepare the app for deployment on Vercel:

1. Create vercel.json configuration:
   - Set build command: npm run build
   - Set output directory: dist
   - Configure redirects (SPA)

2. Environment variables:
   - Create .env.example file
   - Document any API keys (if needed)

3. Build optimization:
   - Minify CSS/JS
   - Tree-shake unused code
   - Optimize bundle size
   - Add gzip compression

4. SEO & Meta tags:
   - Add proper <title>
   - Add meta description
   - Add Open Graph tags
   - Add favicon
   - Add manifest.json for PWA (optional)

5. Performance:
   - Lazy load components
   - Code splitting
   - Preload critical resources

6. Deployment steps:
   - npm run build
   - Test production build locally
   - Deploy to Vercel
   - Verify deployed app

Provide vercel.json, updated index.html, and deployment commands.
```

**Beklenen Çıktı:** Deploy-ready proje

---

## 📊 Proje Timeline

```
Toplam Süre: ~12-15 saat

Gün 1 (4-5 saat):
✅ Adım 1: Proje kurulumu
✅ Adım 2: Hooks (theme, language)
✅ Adım 3: Header component

Gün 2 (5-6 saat):
✅ Adım 4: API utilities
✅ Adım 5: Geolocation hook
✅ Adım 6: LocationPicker

Gün 3 (4-5 saat):
✅ Adım 7: usePrayerTimes hook
✅ Adım 8: CountdownTimer
✅ Adım 9: PrayerTimesGrid

Gün 4 (2-3 saat):
✅ Adım 10: App entegrasyonu
✅ Adım 11: Polish & responsive
✅ Adım 12: Testing
✅ Adım 13: Deployment
```

---

## 🚀 Hemen Başlamak İçin

### İlk Adım (Şimdi Yap)

```bash
# Terminal'de çalıştır:
npm create vite@latest prayer-times-lite -- --template react
cd prayer-times-lite
npm install
npm install -D tailwindcss@latest postcss autoprefixer
npm install dayjs lucide-react
npx tailwindcss init -p
```

### AI Studio'ya Ver (İlk Prompt)

```
I'm building a minimalist prayer times web app. Start with project setup:

Tech Stack:
- React 18 + Vite
- TailwindCSS v4 (CSS-first config)
- day.js for time calculations
- lucide-react for icons

Create initial files:
1. tailwind.config.js with dark mode (@custom-variant)
2. src/index.css with custom theme colors (green: #10b981, amber: #f59e0b)
3. Basic folder structure: components/, hooks/, utils/, constants/
4. App.jsx with dark mode toggle demo

Show me complete code for each file.
```

---

## 💡 Ekstra Özellikler (V2 için)

İlerleyen versiyonlarda ekleyebileceklerin:

1. **PWA Desteği:** Telefona yüklenebilir
2. **Bildirimler:** Ezan vakti gelince browser notification
3. **Widget Mode:** Minimal view (sadece countdown)
4. **Qibla Direction:** Kıble yönü göstergesi
5. **Prayer History:** Kılınan namazları işaretle
6. **Custom Calculation:** Diyanet yerine başka hesaplama metodları
7. **Nearby Mosques:** Google Places API ile yakın camiler
8. **Dualar:** Vakitlere özel dua önerileri

---

## 📚 Referanslar

- **API Docs:** ezanvakti.imsakiyem.com[^5]
- **TailwindCSS v4:** Dark mode setup[^3][^2]
- **Day.js:** Countdown timer[^4]
- **Geolocation:** React hooks[^7]
- **Deployment:** Vercel otomatik deploy

---

## ✅ Başarı Kriterleri

Projenin tamamlandığını şu kriterlere göre değerlendir:

- [x] Konum seçimi (GPS + Manuel) çalışıyor
- [x] 6 vakit doğru gösteriliyor
- [x] Countdown her saniye güncellenіyor
- [x] Dark mode tüm sayfalarda çalışıyor
- [x] 3 dil desteği tam
- [x] Mobile responsive
- [x] API cache sistemi çalışıyor
- [x] Hata durumları yönetiliyor
- [x] LocalStorage veriler kaydediliyor
- [x] Production'da deploy edilmiş

---
