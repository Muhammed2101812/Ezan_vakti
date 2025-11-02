import { memo } from "react";
import { useLanguage } from "../hooks/useLanguage";

function CountdownTimer({ nextPrayer, timeUntilNext }) {
  const { t } = useLanguage();

  const formatTime = (time) => {
    if (!time) return { hours: "00", minutes: "00", seconds: "00" };
    return {
      hours: String(time.hours).padStart(2, "0"),
      minutes: String(time.minutes).padStart(2, "0"),
      seconds: String(time.seconds).padStart(2, "0"),
    };
  };

  const formattedTime = formatTime(timeUntilNext);

  return (
    <div className="text-center bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
        {nextPrayer ? t(nextPrayer.key, "prayerNames") : "..."}{" "}
        {t("timeUntil", "ui")}
      </h2>
      <div className="flex justify-center items-baseline space-x-2 md:space-x-4">
        <div className="text-5xl sm:text-7xl font-bold text-primary-500 tracking-tight">
          {formattedTime.hours}
        </div>
        <div className="text-4xl sm:text-6xl font-semibold text-gray-400 dark:text-gray-500">
          :
        </div>
        <div className="text-5xl sm:text-7xl font-bold text-primary-500 tracking-tight">
          {formattedTime.minutes}
        </div>
        <div className="text-4xl sm:text-6xl font-semibold text-gray-400 dark:text-gray-500">
          :
        </div>
        <div className="text-5xl sm:text-7xl font-bold text-primary-500 tracking-tight">
          {formattedTime.seconds}
        </div>
      </div>
    </div>
  );
}

export default memo(CountdownTimer);
