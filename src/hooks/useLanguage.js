// hooks/useLanguage.js
import { useState, useEffect } from "react";
import { translate } from "../constants/translations";
import { languageStorage } from "../utils/storage";

/**
 * Custom hook for managing language state
 * @returns {{language: string, setLanguage: function, t: function}}
 */
export function useLanguage() {
  const [language, setLanguage] = useState(languageStorage.get());

  useEffect(() => {
    // Update document language attribute
    document.documentElement.lang = language;

    // Update direction attribute for RTL languages
    const isRTL = language === "ar"; // Arabic is RTL
    document.documentElement.dir = isRTL ? "rtl" : "ltr";

    // Save to localStorage
    languageStorage.set(language);
  }, [language]);

  // Translation function
  const t = (key, section = "prayerNames") => {
    return translate(key, language, section);
  };

  return { language, setLanguage, t };
}
