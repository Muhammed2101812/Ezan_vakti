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
      nextPrayer: "Bir sonraki",
      loading: "Yükleniyor...",
      error: "Bir hata oluştu",
      retry: "Tekrar Dene",
      theme: "Tema",
      language: "Dil",
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
      nextPrayer: "Next",
      loading: "Loading...",
      error: "An error occurred",
      retry: "Retry",
      theme: "Theme",
      language: "Language",
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
      nextPrayer: "التالي",
      loading: "جاري التحميل...",
      error: "حدث خطأ ما",
      retry: "إعادة المحاولة",
      theme: "المظهر",
      language: "اللغة",
    },
  },
};

export function translate(key, language, section = "prayerNames") {
  return translations[language]?.[section]?.[key] || key;
}

export const LANGUAGES = [
  { code: "tr", name: "Türkçe", dir: "ltr" },
  { code: "en", name: "English", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
];
