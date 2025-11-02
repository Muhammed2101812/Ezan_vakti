// utils/storage.js

/**
 * Get item from localStorage
 * @param {string} key - Key to retrieve
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Parsed value or defaultValue
 */
export function getItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    // If item is null, undefined, or empty string, return default value.
    if (!item) {
      return defaultValue;
    }
    // Try to parse it as JSON.
    try {
      return JSON.parse(item);
    } catch (e) {
      // If it's not valid JSON, just return the raw string value.
      // This handles values that were not stringified.
      return item;
    }
  } catch (error) {
    console.error(`Error getting item '${key}' from storage:`, error);
    return defaultValue;
  }
}

/**
 * Set item in localStorage
 * @param {string} key - Key to set
 * @param {*} value - Value to store
 */
export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item '${key}' in storage:`, error);
    // Handle storage quota exceeded error
    if (error.name === "QuotaExceededError") {
      console.warn("Storage quota exceeded. Consider clearing old cache.");
    }
  }
}

/**
 * Remove item from localStorage
 * @param {string} key - Key to remove
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item '${key}' from storage:`, error);
  }
}

/**
 * Clear all items from localStorage
 */
export function clearStorage() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
}

/**
 * Creates a storage object for a specific key.
 * @param {string} key - The key to use for the storage object.
 * @param {*} defaultValue - The default value to use if the key doesn't exist.
 * @returns {{get: function, set: function, remove: function}}
 */
export function createStorage(key, defaultValue = null) {
  return {
    get: () => getItem(key, defaultValue),
    set: (value) => setItem(key, value),
    remove: () => removeItem(key),
  };
}

export const userLocationStorage = createStorage("userLocation");
export const languageStorage = createStorage("language", "tr");
export const themeStorage = createStorage("theme", "light");
export const calculationMethodStorage = createStorage("calculationMethod", 13);

/**
 * Check if cache is expired based on timestamp
 * @param {string} timestamp - ISO string timestamp
 * @param {number} maxAgeHours - Maximum age in hours
 * @returns {boolean} True if cache is expired
 */
export function isCacheExpired(timestamp, maxAgeHours = 24) {
  if (!timestamp) return true;

  const cacheTime = new Date(timestamp).getTime();
  const now = new Date().getTime();
  const maxAgeMs = maxAgeHours * 60 * 60 * 1000;

  return now - cacheTime > maxAgeMs;
}

/**
 * Get cached prayer times for a specific date
 * @param {string|number} districtId - District ID
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Object|null} Cached prayer times or null
 */
export function getCachedPrayerTimes(districtId, date) {
  const key = `prayer_${districtId}_${date}`;
  const cached = getItem(key, null);

  if (cached && !isCacheExpired(cached.timestamp, 24)) {
    return cached.data;
  }

  // Remove expired cache
  if (cached) {
    removeItem(key);
  }

  return null;
}

/**
 * Save prayer times to cache
 * @param {string|number} districtId - District ID
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {Object} prayerTimes - Prayer times object
 */
export function setCachedPrayerTimes(districtId, date, prayerTimes) {
  const key = `prayer_${districtId}_${date}`;
  setItem(key, {
    data: prayerTimes,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Clear all prayer times cache
 */
export function clearPrayerTimesCache() {
  try {
    // Iterate through all localStorage keys and remove prayer time caches
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("prayer_")) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error("Error clearing prayer times cache:", error);
  }
}
