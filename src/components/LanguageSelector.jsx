import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage?.startsWith("es")
    ? "es"
    : "en";

  const changeLanguage = async (language) => {
    if (language === currentLanguage) return;

    await i18n.changeLanguage(language);
    localStorage.setItem("mortgageLanguage", language);
  };

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 p-1 shadow-sm"
      role="group"
      aria-label={
        currentLanguage === "es"
          ? "Selector de idioma"
          : "Language selector"
      }
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md text-red-900">
        <Languages
          className="h-4 w-4"
          aria-hidden="true"
        />
      </span>

      <button
        type="button"
        onClick={() => changeLanguage("en")}
        aria-pressed={currentLanguage === "en"}
        className={`cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-800 focus-visible:ring-offset-1 ${
          currentLanguage === "en"
            ? "bg-red-900 text-yellow-400 shadow-sm"
            : "text-gray-600 hover:bg-white hover:text-red-900"
        }`}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => changeLanguage("es")}
        aria-pressed={currentLanguage === "es"}
        className={`cursor-pointer rounded-md px-2.5 py-1 text-[11px] font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-800 focus-visible:ring-offset-1 ${
          currentLanguage === "es"
            ? "bg-red-900 text-yellow-400 shadow-sm"
            : "text-gray-600 hover:bg-white hover:text-red-900"
        }`}
      >
        ES
      </button>
    </div>
  );
}
