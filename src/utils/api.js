// utils/api.js
import dayjs from "dayjs";

const API_BASE = "https://api.aladhan.com/v1";
const CACHE_DURATION = 30; // 30 days

/**
 * Search for cities by name
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching cities
 */
export async function searchCities(query) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&accept-language=en&limit=10`,
    );
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return data
      .filter(
        (item) =>
          item.address &&
          (item.address.city || item.address.town || item.address.village) &&
          item.address.country,
      )
      .map((item) => ({
        id: item.place_id,
        displayName: item.display_name,
        city: item.address.city || item.address.town || item.address.village,
        country: item.address.country,
      }));
  } catch (error) {
    console.error(`Failed to search cities:`, error);
    return [];
  }
}

/**
 * Fetch prayer times for a city and country
 * @param {string} city - Name of the city
 * @param {string} country - Name of the country
 * @param {string} date - Date in YYYY-MM-DD format (default: today)
 * @returns {Promise<Object>} Prayer times for the specified date
 */
export async function fetchPrayerTimes(
  city,
  country,
  method = 13,
  date = dayjs().format("YYYY-MM-DD"),
) {
  try {
    const response = await fetch(
      `${API_BASE}/timingsByCity?city=${city}&country=${country}&method=${method}`,
    );
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    const timings = data.data.timings;
    return {
      fajr: timings.Fajr,
      sunrise: timings.Sunrise,
      dhuhr: timings.Dhuhr,
      asr: timings.Asr,
      maghrib: timings.Maghrib,
      isha: timings.Isha,
      date: data.data.date.gregorian.date,
    };
  } catch (error) {
    console.error("Failed to fetch prayer times:", error);
    throw new Error(
      "Unable to fetch prayer times. Please check your connection and try again.",
    );
  }
}

/**
 * Fetch prayer times by coordinates using Aladhan API
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} method - Calculation method
 * @returns {Promise<Object>} Prayer times for the location
 */
export async function fetchPrayerTimesByCoords(lat, lon, method = 13) {
  const url = `${API_BASE}/timings?latitude=${lat}&longitude=${lon}&method=${method}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch prayer times by coordinates");
  }
  const data = await response.json();

  const timings = data.data.timings;
  return {
    fajr: timings.Fajr,
    sunrise: timings.Sunrise,
    dhuhr: timings.Dhuhr,
    asr: timings.Asr,
    maghrib: timings.Maghrib,
    isha: timings.Isha,
    date: data.data.date.gregorian.date,
  };
}

/**
 * Reverse geocode coordinates to get location information
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Location information
 */
export async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to reverse geocode");
    }
    const data = await response.json();

    const address = data.address;
    const city = address.city || address.town || address.village;
    const country = address.country;

    return {
      lat,
      lon,
      city,
      country,
      displayName: data.display_name,
    };
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return {
      lat,
      lon,
      city: `Area near ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
      country: null,
      displayName: `Location (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
    };
  }
}
