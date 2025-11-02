import { useLanguage } from "../hooks/useLanguage";

const calculationMethods = [
  { id: null, name: "Default" },
  { id: 3, name: "Muslim World League" },
  { id: 2, name: "Islamic Society of North America (ISNA)" },
  { id: 5, name: "Egyptian General Authority of Survey" },
  { id: 4, name: "Umm Al-Qura University, Makkah" },
  { id: 1, name: "University of Islamic Sciences, Karachi" },
  { id: 13, name: "Diyanet İşleri Başkanlığı, Turkey" },
];

function CalculationMethodPicker({ onMethodSelect, currentMethod }) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">
          {t("calculationMethod", "ui")}
        </h2>
        <div className="space-y-2">
          {calculationMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => onMethodSelect(method.id)}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${currentMethod === method.id ? "bg-primary-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
            >
              {method.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalculationMethodPicker;
