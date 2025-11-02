import { useState, useEffect } from "react";
import { Settings, MapPin } from "lucide-react";
import LocationPicker from "./components/LocationPicker";
import PrayerTimesGrid from "./components/PrayerTimesGrid";
import CountdownTimer from "./components/CountdownTimer";
import CalculationMethodPicker from "./components/CalculationMethodPicker";
import { usePrayerTimes } from "./hooks/usePrayerTimes";
import { userLocationStorage, calculationMethodStorage } from "./utils/storage";
import { useLanguage } from "./hooks/useLanguage";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [location, setLocation] = useState(userLocationStorage.get());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMethodPickerOpen, setIsMethodPickerOpen] = useState(false);
  const [calculationMethod, setCalculationMethod] = useState(
    calculationMethodStorage.get(),
  );
  const { t, setLanguage, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (location) {
      userLocationStorage.set(location);
    } else {
      userLocationStorage.remove();
    }
  }, [location]);

  useEffect(() => {
    calculationMethodStorage.set(calculationMethod);
  }, [calculationMethod]);

  const { prayerTimes, loading, error, nextPrayer, timeUntilNext } =
    usePrayerTimes(location, calculationMethod);

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setCalculationMethod(13); // Reset to default when location changes
  };

  if (!location) {
    return <LocationPicker onLocationSelect={handleLocationSelect} />;
  }

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary-500" />
            <span className="font-semibold text-lg">
              {location.displayName}
            </span>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        </header>

        {/* Main Content */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
          </div>
        )}

        {error && (
          <div className="p-6 text-center bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p>{error}</p>
            <button
              className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              onClick={() => window.location.reload()}
            >
              {t("retry", "ui")}
            </button>
          </div>
        )}

        {prayerTimes && !loading && (
          <div className="space-y-8">
            <CountdownTimer
              nextPrayer={nextPrayer}
              timeUntilNext={timeUntilNext}
            />
            <PrayerTimesGrid
              prayerTimes={prayerTimes}
              nextPrayer={nextPrayer}
            />
          </div>
        )}
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSettingsOpen(false);
            }
          }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6">{t("settings", "ui")}</h2>

            {/* Theme Toggle */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg">{t("theme", "ui")}</span>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-lg font-semibold bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-colors"
              >
                {theme === "dark" ? t("lightMode", "ui") : t("darkMode", "ui")}
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg">{t("language", "ui")}</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>

            {/* Calculation Method */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg">{t("calculationMethod", "ui")}</span>
              <button
                onClick={() => setIsMethodPickerOpen(true)}
                className="px-4 py-2 rounded-lg font-semibold bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-colors"
              >
                {t("change", "ui")}
              </button>
            </div>

            {/* Change Location */}
            <div className="mt-8">
              <button
                onClick={() => {
                  setLocation(null);
                  setIsSettingsOpen(false);
                }}
                className="w-full px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
              >
                {t("changeLocation", "ui")}
              </button>
            </div>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {isMethodPickerOpen && (
        <CalculationMethodPicker
          currentMethod={calculationMethod}
          onMethodSelect={(method) => {
            setCalculationMethod(method);
            setIsMethodPickerOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
