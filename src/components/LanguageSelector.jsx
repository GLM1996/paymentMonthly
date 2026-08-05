
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage?.startsWith("es")
    ? "es"
    : "en";

  const changeLanguage = async (language) => {
    await i18n.changeLanguage(language);
    localStorage.setItem("mortgageLanguage", language);
  };

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="Language selector"
    >
      <Languages
        className="h-4 w-4 text-red-900"
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => changeLanguage("en")}
        aria-pressed={currentLanguage === "en"}
        className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-bold transition ${
          currentLanguage === "en"
            ? "bg-red-900 text-yellow-400"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        English
      </button>

      <button
        type="button"
        onClick={() => changeLanguage("es")}
        aria-pressed={currentLanguage === "es"}
        className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-bold transition ${
          currentLanguage === "es"
            ? "bg-red-900 text-yellow-400"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Español
      </button>
    </div>
  );
}
