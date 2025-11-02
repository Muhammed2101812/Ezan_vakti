import { memo } from "react";
import { Moon, Sunrise, Sun, Sunset } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import dayjs from "dayjs";

const PRAYER_ICONS = {
  fajr: { icon: Moon, label: "Fajr" },
  sunrise: { icon: Sunrise, label: "Sunrise" },
  dhuhr: { icon: Sun, label: "Dhuhr" },
  asr: { icon: Sun, label: "Asr" },
  maghrib: { icon: Sunset, label: "Maghrib" },
  isha: { icon: Moon, label: "Isha" },
};

function PrayerTimesGrid({ prayerTimes, nextPrayer }) {
  const { t } = useLanguage();
  const now = dayjs();

  if (!prayerTimes) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-800 p-6 rounded-2xl animate-pulse"
          >
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const PRAYER_ORDER = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
      {PRAYER_ORDER.map((key) => {
        const prayer = prayerTimes[key];
        const isNext = nextPrayer && nextPrayer.key === key;
        const prayerTime = dayjs(prayer, "HH:mm");
        const hasPassed = now.isAfter(prayerTime);

        const Icon = PRAYER_ICONS[key]?.icon || Sun;

        return (
          <div
            key={key}
            className={`p-4 sm:p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 ${
              isNext
                ? "bg-primary-500 text-white shadow-lg"
                : hasPassed
                  ? "bg-white/60 dark:bg-gray-800/60 opacity-70"
                  : "bg-white dark:bg-gray-800 shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">{t(key, "prayerNames")}</h3>
              <Icon
                className={`w-6 h-6 ${isNext ? "text-white" : "text-primary-500"}`}
              />
            </div>
            <p
              className={`text-3xl font-bold ${isNext ? "text-white" : "text-gray-900 dark:text-white"}`}
            >
              {prayer}
            </p>
            {isNext && (
              <p className="text-sm font-medium text-white/80 mt-1">
                {t("nextPrayer", "ui")}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(PrayerTimesGrid);
