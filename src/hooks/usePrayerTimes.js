// hooks/usePrayerTimes.js
import { useState, useEffect, useCallback } from "react";
import { fetchPrayerTimes, fetchPrayerTimesByCoords } from "../utils/api";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(relativeTime);

/**
 * A custom hook to manage prayer times, including fetching, caching, and calculating the next prayer.
 * @param {object} location - The location for which to fetch prayer times. Can be an object with `city` and `country` or `lat` and `lon`.
 * @param {number} calculationMethod - The calculation method to use for the prayer times API.
 * @returns {object} An object containing the prayer times, loading state, error state, and other related data.
 */
export function usePrayerTimes(location, calculationMethod) {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);

  const refetch = useCallback(
    async (background = false) => {
      if (!location) return;

      if (!background) {
        setLoading(true);
      }
      setError(null);

      let cacheKey,
        cached = null;
      if (location.city && location.country) {
        cacheKey = `prayer_${location.country}_${location.city}_${calculationMethod}_${dayjs().format("YYYY-MM-DD")}`;
      } else if (location.lat && location.lon) {
        cacheKey = `prayer_coords_${location.lat}_${location.lon}_${calculationMethod}_${dayjs().format("YYYY-MM-DD")}`;
      }

      if (cacheKey) {
        const stored = localStorage.getItem(cacheKey);
        if (stored) {
          const { data, timestamp } = JSON.parse(stored);
          const hoursPassed = dayjs().diff(dayjs(timestamp), "hours");
          if (hoursPassed < 24) {
            cached = data;
          }
        }
      }

      try {
        let data;
        if (location.city && location.country) {
          data = await fetchPrayerTimes(
            location.city,
            location.country,
            calculationMethod,
          );
        } else if (location.lat && location.lon) {
          data = await fetchPrayerTimesByCoords(
            location.lat,
            location.lon,
            calculationMethod,
          );
        } else {
          throw new Error(
            "Invalid location: must have city/country or coordinates",
          );
        }

        setPrayerTimes(data);

        if (data && cacheKey) {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              data,
              timestamp: new Date().toISOString(),
            }),
          );
        }
      } catch (err) {
        console.error("Error fetching prayer times:", err);

        if (cached) {
          setPrayerTimes(cached);
          setError(null);
        } else {
          if (!background) {
            setError(err.message);
          }
        }
      } finally {
        if (!background) {
          setLoading(false);
        }
      }
    },
    [location, calculationMethod],
  );

  /**
   * Calculates the next prayer based on the current time.
   * @param {object} times - The prayer times for the current day.
   * @returns {object|null} The next prayer object, or null if the prayer times are not available.
   */
  const getNextPrayer = (times) => {
    if (!times) return null;

    const now = dayjs();
    const timeKeys = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

    const prayerTimesToday = timeKeys.map((key) => {
      const [hours, minutes] = times[key].split(":").map(Number);
      const prayerTime = now.hour(hours).minute(minutes).second(0);
      return { key, time: prayerTime, name: key };
    });

    const next = prayerTimesToday.find((prayer) => prayer.time.isAfter(now));

    if (next) {
      return next;
    }

    const tomorrow = now.add(1, "day");
    const [hours, minutes] = times.fajr.split(":").map(Number);
    const tomorrowFajr = tomorrow.hour(hours).minute(minutes).second(0);

    return { key: "fajr", time: tomorrowFajr, name: "fajr" };
  };

  /**
   * Calculates the time until the next prayer.
   * @param {object} nextPrayerTime - The next prayer time object.
   * @returns {object|null} An object with the hours, minutes, and seconds until the next prayer, or null if the next prayer time is not available.
   */
  const getTimeUntilNextPrayer = (nextPrayerTime) => {
    if (!nextPrayerTime) return null;

    const now = dayjs();
    let diff = nextPrayerTime.time.diff(now);

    if (diff < 0) {
      const tomorrow = now.add(1, "day");
      const [hours, minutes] = nextPrayerTime.time
        .format("HH:mm")
        .split(":")
        .map(Number);
      const tomorrowTime = tomorrow.hour(hours).minute(minutes).second(0);
      diff = tomorrowTime.diff(now);
    }

    const duration = dayjs.duration(diff);
    return {
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
      totalSeconds: Math.floor(diff / 1000),
    };
  };

  useEffect(() => {
    if (location) {
      refetch();
    } else {
      setPrayerTimes(null);
      setError(null);
      setLoading(false);
    }
  }, [location, calculationMethod, refetch]);

  useEffect(() => {
    if (prayerTimes) {
      const next = getNextPrayer(prayerTimes);
      setNextPrayer(next);
    }
  }, [prayerTimes]);

  useEffect(() => {
    let midnightTimer;

    const setMidnightRefresh = () => {
      const now = dayjs();
      const nextMidnight = now.add(1, "day").startOf("day");
      const timeUntilMidnight = nextMidnight.diff(now);

      midnightTimer = setTimeout(() => {
        if (location) {
          refetch();
          setMidnightRefresh();
        }
      }, timeUntilMidnight);
    };

    if (location) {
      setMidnightRefresh();
    }

    return () => {
      if (midnightTimer) {
        clearTimeout(midnightTimer);
      }
    };
  }, [location, refetch]);

  return {
    prayerTimes,
    loading,
    error,
    refetch,
    nextPrayer,
    timeUntilNext: nextPrayer ? getTimeUntilNextPrayer(nextPrayer) : null,
    today: dayjs().format("YYYY-MM-DD"),
  };
}
