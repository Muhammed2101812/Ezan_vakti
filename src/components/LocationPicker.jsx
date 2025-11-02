import { useState } from "react";
import { MapPin, Search, Loader, AlertCircle } from "lucide-react";
import { useGeolocation } from "../hooks/useGeolocation";
import { useLanguage } from "../hooks/useLanguage";
import { searchCities, reverseGeocode } from "../utils/api";

function LocationPicker({ onLocationSelect }) {
  const { t } = useLanguage();
  const {
    getLocation,
    loading: geolocationLoading,
    error: geolocationError,
  } = useGeolocation();
  const [method, setMethod] = useState("initial"); // initial, gps, manual
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleGpsLocationSelect = async () => {
    setMethod("gps");
    try {
      const coords = await getLocation();
      const locationData = await reverseGeocode(
        coords.latitude,
        coords.longitude,
      );
      onLocationSelect({
        city: locationData.city,
        country: locationData.country,
        displayName: locationData.displayName,
      });
    } catch (err) {
      setError(err.message);
      setMethod("initial");
    }
  };

  const handleCitySearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setLoading(true);
      try {
        const results = await searchCities(query);
        setSearchResults(results);
      } catch (err) {
        setError("Failed to search for locations.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectLocation = (location) => {
    onLocationSelect(location);
  };

  const renderHeader = () => (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {t("welcome", "ui")}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        {t("chooseLocationPrompt", "ui")}
      </p>
    </div>
  );

  const renderInitial = () => (
    <div className="space-y-4">
      <button
        onClick={handleGpsLocationSelect}
        disabled={geolocationLoading}
        className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-50"
      >
        {geolocationLoading ? (
          <Loader className="w-6 h-6 animate-spin" />
        ) : (
          <MapPin className="w-6 h-6" />
        )}
        <span>{t("useGPS", "ui")}</span>
      </button>
      <button
        onClick={() => setMethod("manual")}
        className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        <Search className="w-6 h-6" />
        <span>{t("manualLocation", "ui")}</span>
      </button>
      {(geolocationError || error) && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-5 h-5" />
          <p>{geolocationError || error}</p>
        </div>
      )}
    </div>
  );

  const renderManualSelection = () => (
    <div>
      <input
        type="text"
        placeholder={t("searchCity", "ui")}
        value={searchQuery}
        onChange={(e) => handleCitySearch(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent"
      />
      {loading && (
        <div className="flex justify-center p-8">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      )}
      <div className="max-h-72 overflow-y-auto space-y-2">
        {searchResults.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelectLocation(item)}
            className="p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            {item.displayName}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        {renderHeader()}
        {method === "initial" || method === "gps"
          ? renderInitial()
          : renderManualSelection()}
      </div>
    </div>
  );
}

export default LocationPicker;
