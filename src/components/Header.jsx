import React from "react";
import { Info, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="relative overflow-hidden bg-white px-5 py-6 md:px-8 md:py-7">
      {/* Top-left decorative lines */}
      <div
        className="pointer-events-none absolute left-0 top-0"
        aria-hidden="true"
      >
        <div className="absolute left-0 top-0 h-2 w-32 bg-red-900 md:w-44" />
        <div className="absolute left-0 top-2 h-1.5 w-24 bg-yellow-500 md:w-32" />

        <div className="absolute left-0 top-0 h-24 w-2 bg-red-900 md:h-28" />
        <div className="absolute left-2 top-0 h-16 w-1.5 bg-yellow-500 md:h-20" />

        <div className="absolute left-5 top-5 h-2 w-2 rounded-full bg-yellow-500" />
      </div>

      <div className="relative z-10">
        {/* Main header area */}
        <div className="grid items-center gap-5 md:grid-cols-[1fr_auto]">
          {/* Text content */}
          <div className="pl-2 text-center md:pl-4 md:text-left">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.24em] text-yellow-600">
              {t("header.eyebrow")}
            </p>

            <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-wide text-red-900 md:text-4xl">
              {t("header.title")}
            </h1>

            <div className="my-3 flex items-center justify-center gap-2 md:justify-start">
              <div className="h-0.5 w-14 bg-gradient-to-r from-red-900 to-yellow-500" />

              <div className="h-2.5 w-2.5 rotate-45 bg-yellow-500" />

              <div className="h-0.5 w-20 bg-gradient-to-r from-yellow-500 to-transparent" />
            </div>

            <h2 className="text-lg font-bold uppercase tracking-[0.12em] text-yellow-600 md:text-2xl">
              {t("header.subtitle")}
            </h2>
          </div>

          {/* Company logo */}
          <div className="flex justify-center md:justify-end">
            <div className="flex min-h-[92px] min-w-[180px] items-center justify-center border-l-0 border-red-100 px-4 md:border-l">
              <img
                src="/logo.jpeg"
                alt={t("header.logoAlt")}
                crossOrigin="anonymous"
                className="max-h-24 w-auto max-w-[210px] object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom information area */}
        <div className="mt-6 border-t border-yellow-300 pt-4">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="flex max-w-3xl items-start gap-2 text-center text-sm leading-relaxed text-gray-700 md:text-left md:text-base">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-800" />

              <span>
                <strong className="text-red-900">
                  {t("header.location")}
                </strong>

                <span className="mx-2 text-yellow-600">•</span>

                {t("header.description")}
              </span>
            </p>

            <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-yellow-500 bg-yellow-50 px-3 py-1.5 text-xs font-medium text-gray-700">
              <Info className="h-3.5 w-3.5 text-yellow-600" />

              <span>{t("header.disclaimer")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-0 flex h-1 w-full"
        aria-hidden="true"
      >
        <div className="w-1/3 bg-red-900" />
        <div className="w-2/3 bg-yellow-500" />
      </div>
    </header>
  );
};

export default Header;