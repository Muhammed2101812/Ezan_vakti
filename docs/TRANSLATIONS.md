# 🌍 Translations Documentation

This document details the multilingual support system in the Prayer Times Lite application, covering Turkish (TR), English (EN), and Arabic (AR) translations.

## 📋 Overview

The application supports three languages:

- **Turkish (tr)** - Primary language for Turkish users
- **English (en)** - For international users
- **Arabic (ar)** - With proper RTL (right-to-left) support

The translation system is implemented in the `src/constants/translations.js` file and is designed to be easily maintainable and extensible.

## 🏗️ Translation Structure

### Translation Object Format

```javascript
export const translations = {
  tr: {
    prayerNames: {
      /* ... */
    },
    ui: {
      /* ... */
    },
  },
  en: {
    prayerNames: {
      /* ... */
    },
    ui: {
      /* ... */
    },
  },
  ar: {
    prayerNames: {
      /* ... */
    },
    ui: {
      /* ... */
    },
  },
};
```

### Translation Categories

The translation system is organized into two main categories:

1. **Prayer Names (`prayerNames`)**: Translations for the six daily prayer names
2. **UI Elements (`ui`)**: Translations for user interface elements and labels

## 🕋 Prayer Name Translations

### Turkish (tr)

```javascript
prayerNames: {
  fajr: 'İmsak',
  sunrise: 'Güneş',
  dhuhr: 'Öğle',
  asr: 'İkindi',
  maghrib: 'Akşam',
  isha: 'Yatsı'
}
```

### English (en)

```javascript
prayerNames: {
  fajr: 'Fajr',
  sunrise: 'Sunrise',
  dhuhr: 'Dhuhr',
  asr: 'Asr',
  maghrib: 'Maghrib',
  isha: 'Isha'
}
```

### Arabic (ar)

```javascript
prayerNames: {
  fajr: 'الفجر',
  sunrise: 'الشروق',
  dhuhr: 'الظهر',
  asr: 'العصر',
  maghrib: 'المغرب',
  isha: 'العشاء'
}
```

## 🖥️ UI Element Translations

### Turkish (tr)

```javascript
ui: {
  chooseLocation: 'Konum Seçin',
  useGPS: 'GPS Kullan',
  manualLocation: 'Manuel Seç',
  timeUntil: 'namazına kalan süre',
  changeLocation: 'Konumu Değiştir',
  themeToggle: 'Tema Değiştir',
  languageSelect: 'Dil Seçin',
  nextPrayer: 'Sonraki Namaz',
  todayPrayers: 'Bugünkü Namazlar',
  hour: 'Saat',
  minute: 'Dakika',
  second: 'Saniye',
  loading: 'Yükleniyor...',
  error: 'Hata',
  retry: 'Yeniden Dene',
  success: 'Başarılı'
}
```

### English (en)

```javascript
ui: {
  chooseLocation: 'Choose Location',
  useGPS: 'Use GPS',
  manualLocation: 'Manual Selection',
  timeUntil: 'until prayer',
  changeLocation: 'Change Location',
  themeToggle: 'Toggle Theme',
  languageSelect: 'Select Language',
  nextPrayer: 'Next Prayer',
  todayPrayers: 'Today\'s Prayers',
  hour: 'Hour',
  minute: 'Minute',
  second: 'Second',
  loading: 'Loading...',
  error: 'Error',
  retry: 'Retry',
  success: 'Success'
}
```

### Arabic (ar)

```javascript
ui: {
  chooseLocation: 'اختر الموقع',
  useGPS: 'استخدم GPS',
  manualLocation: 'اختيار يدوي',
  timeUntil: 'حتى صلاة',
  changeLocation: 'تغيير الموقع',
  themeToggle: 'تبديل الثيم',
  languageSelect: 'اختر اللغة',
  nextPrayer: 'الصلاة التالية',
  todayPrayers: 'صلوات اليوم',
  hour: 'ساعة',
  minute: 'دقيقة',
  second: 'ثانية',
  loading: 'جاري التحميل...',
  error: 'خطأ',
  retry: 'إعادة المحاولة',
  success: 'ناجح'
}
```

## 🔧 Translation Helper Function

### `translate(key, language, section = 'prayerNames')`

The application includes a helper function to simplify translation retrieval:

```javascript
export function translate(key, language, section = "prayerNames") {
  return translations[language]?.[section]?.[key] || key;
}
```

#### Parameters

- `key` (string): The translation key to look up
- `language` (string): The language code ('tr', 'en', or 'ar')
- `section` (string): The translation section ('prayerNames' or 'ui'), defaults to 'prayerNames'

#### Usage Examples

```javascript
// Translate prayer names
const fajrName = translate("fajr", "tr"); // Returns 'İmsak'
const sunriseName = translate("sunrise", "en"); // Returns 'Sunrise'

// Translate UI elements
const buttonLabel = translate("useGPS", "tr", "ui"); // Returns 'GPS Kullan'
const timeLabel = translate("timeUntil", "en", "ui"); // Returns 'until prayer'
```

## 🌐 Right-to-Left (RTL) Support

### Arabic Text Rendering

The Arabic language requires right-to-left text rendering. The application supports this through:

1. **CSS RTL Properties**: When Arabic is selected, RTL styles are applied
2. **Font Selection**: The Noto Naskh Arabic font is used for proper Arabic text rendering
3. **Layout Adjustments**: Interface elements are mirrored for RTL languages

### Implementation

```css
/* In index.css */
html[dir="rtl"] {
  direction: rtl;
  text-align: right;
}
```

### Language Attribute

The application automatically sets the correct language attribute:

```html
<html lang="ar" dir="rtl">
  <!-- For Arabic -->
  <html lang="tr">
    <!-- For Turkish -->
    <html lang="en">
      <!-- For English -->
    </html>
  </html>
</html>
```

## 🛠️ Implementation in Components

### Using Translations in Components

#### Example: PrayerTimesGrid.jsx

```jsx
import { translate } from "../constants/translations";

function PrayerTimesGrid({ prayerTimes, language }) {
  const prayerKeys = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {prayerKeys.map((key) => (
        <div key={key} className="p-4 rounded">
          <h3>{translate(key, language)}</h3>
          <p>{prayerTimes[key]}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Example: CountdownTimer.jsx

```jsx
import { translate } from "../constants/translations";

function CountdownTimer({ nextPrayer, timeLeft, language }) {
  return (
    <div className="text-center">
      <h2 className="text-5xl font-bold">{timeLeft}</h2>
      <p>
        {translate(nextPrayer, language)}{" "}
        {translate("timeUntil", language, "ui")}
      </p>
    </div>
  );
}
```

## 📝 Adding New Translations

### Adding a New UI String

1. Add the translation key and value to `ui` section in all three languages
2. Use the `translate()` function with section 'ui' to retrieve the translated value

### Adding a New Language

1. Add a new object to the translations export with the language code
2. Add all required translation keys for both `prayerNames` and `ui` sections
3. Update the language selector UI to include the new language option
4. Ensure RTL support if required (for languages like Arabic)

### Example: Adding French Language

```javascript
export const translations = {
  // ... existing languages ...
  fr: {
    prayerNames: {
      fajr: "Fajr",
      sunrise: "Lever du soleil",
      dhuhr: "Dhuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",
    },
    ui: {
      chooseLocation: "Choisir un emplacement",
      useGPS: "Utiliser le GPS",
      // ... other UI translations
    },
  },
};
```

## 🧪 Testing Translations

### Translation Coverage

Ensure that all languages have translations for every key in the translation object to prevent missing translations.

### RTL Testing

For Arabic language:

- Test text alignment (should be right-aligned)
- Verify layout mirroring for interface elements
- Check proper font rendering
- Ensure icons are positioned correctly

### Fallback Mechanism

The translation function includes a fallback mechanism:

```javascript
return translations[language]?.[section]?.[key] || key;
```

If a translation is missing, the original key is returned instead of undefined.

## 🔄 Translation Updates

### Maintenance

- Regularly review translations for accuracy
- Update translations when new UI elements are added
- Verify that all prayer times display correctly in all languages
- Check for cultural appropriateness of translations

### Community Contributions

- Translations can be contributed through pull requests
- New translations should maintain the same structure as existing ones
- Contributors should verify RTL behavior for RTL languages

## 🌍 Cultural Considerations

### Date/Time Formatting

Date and time formatting is handled by dayjs library and adapts to the selected language when possible, though the time format remains consistent across languages (HH:MM) for prayer times.

### Text Direction

- Arabic uses RTL text direction
- Turkish and English use LTR text direction
- The application adapts its layout based on the selected language

### Typography

- Arabic text uses Noto Naskh Arabic font for optimal readability
- Latin scripts use Inter font
- The application handles font switching based on language selection
