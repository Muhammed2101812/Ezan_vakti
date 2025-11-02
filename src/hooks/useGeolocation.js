// hooks/useGeolocation.js
import { useState } from "react";

/**
 * Custom hook for getting user's geolocation
 * @returns {{getLocation: function, loading: boolean, error: string|null}}
 */
export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Get user's current position
   * @returns {Promise<Object>} Object with latitude and longitude
   */
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMsg = "Geolocation is not supported by your browser";
        setError(errorMsg);
        reject(new Error(errorMsg));
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(coords);
        },
        (err) => {
          setLoading(false);

          let errorMsg = "An unknown error occurred";
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMsg = "Location access denied by user";
              break;
            case err.POSITION_UNAVAILABLE:
              errorMsg = "Location information is unavailable";
              break;
            case err.TIMEOUT:
              errorMsg = "Location request timed out";
              break;
            default:
              errorMsg = err.message || errorMsg;
          }

          setError(errorMsg);
          reject(new Error(errorMsg));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000, // Accept cached position up to 1 minute old
        },
      );
    });
  };

  return { getLocation, loading, error };
}
