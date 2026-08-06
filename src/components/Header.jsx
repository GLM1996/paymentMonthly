import React from "react";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="mb-4 w-full border-b-[3px] border-red-800 bg-white px-4 py-3 shadow-sm md:px-6">
      <div className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] md:gap-6">
        {/* Title */}
        <div className="min-w-0 text-center md:text-left">
          <h1 className="text-xl font-extrabold uppercase leading-tight text-red-900">
            {t("headerApp.title")}
          </h1>

          <p className="mt-0.5 text-xs font-semibold text-gray-600 md:text-sm">
            {t("headerApp.subtitle")}
          </p>
        </div>

        {/* Logo */}
        <div className="flex shrink-0 items-center justify-center">
          <img
            src={`${import.meta.env.BASE_URL}img/logo1.webp`}
            width="120"
            height="123"
            alt={t("headerApp.logoAlt")}
            className="h-16 w-auto max-w-[160px] object-contain md:h-20 md:max-w-[190px]"
          />
        </div>

        {/* Contact */}
        <div className="flex min-w-0 flex-col items-center text-center md:items-end md:text-right">
          <p className="max-w-[260px] text-[10px] leading-relaxed text-gray-600 md:text-xs">
            {t("headerApp.helpText")}
          </p>

          <a
            href="tel:+17022976053"
            className="mt-1 inline-flex items-center gap-2 text-base font-bold text-red-900 transition-colors hover:text-red-700 md:text-lg"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <Phone
                className="h-3.5 w-3.5 fill-red-900 text-amber-600"
                aria-hidden="true"
              />
            </span>

            <span>(702) 297-6053</span>
          </a>
        </div>

        {/* Language selector */}
        <div className="flex shrink-0 justify-center md:justify-end">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;
