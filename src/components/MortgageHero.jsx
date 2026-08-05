import React from "react";
import { BadgeInfo, Target } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function MortgageHero() {
  const { t } = useTranslation();

  return (
    <header className="w-full">
      <div className="grid grid-cols-1 gap-5 px-5 py-5 md:grid-cols-[minmax(0,1fr)_290px] md:px-8">
        {/* Contenido principal */}
        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#b27325] sm:text-xs">
            {t(
              "mortgageHero.eyebrow",
              "Calculadora educativa de pago hipotecario",
            )}
          </p>

          <h1 className="max-w-4xl font-serif text-[28px] font-bold uppercase leading-[0.98] tracking-[-0.02em] text-[#7f1f21] sm:text-4xl lg:text-[42px]">
            {t(
              "mortgageHero.title",
              "Comparador de pagos hipotecarios según el precio de la vivienda",
            )}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-5 text-[#4f4a43] sm:text-[15px] sm:leading-6">
            {t(
              "mortgageHero.description",
              "Descubra cómo cambia su pago mensual según el precio de la casa, la tasa, el enganche y otros costos. Compare rangos y entienda cuánto sube o baja su pago antes de tomar una decisión.",
            )}
          </p>

          <div className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-[#e4cda7] bg-[#fff9ef] px-3 py-1.5 text-[10px] font-bold text-[#744c2a] sm:text-xs">
            <BadgeInfo
              className="h-3.5 w-3.5 shrink-0 text-[#c28a35]"
              strokeWidth={2}
              aria-hidden="true"
            />

            <span>
              {t(
                "mortgageHero.educationalTool",
                "Herramienta educativa",
              )}
            </span>

            <span
              className="h-1 w-1 rounded-full bg-[#9b6532]"
              aria-hidden="true"
            />

            <span>
              {t(
                "mortgageHero.notOfficialQuote",
                "No es una cotización oficial",
              )}
            </span>
          </div>
        </div>

        {/* Columna derecha */}
        <aside className="flex flex-col gap-3">
          {/* Logo */}
          <div className="flex min-h-[88px] items-center justify-center rounded-xl border-2 border-[#e7c993] bg-white px-5 py-3 shadow-sm">
            <img
              src={`${import.meta.env.BASE_URL}img/logo.jpeg`}
              alt={t(
                "mortgageHero.logoAlt",
                "Juan Carlos Carrera Realtors",
              )}
              className="h-16 w-auto max-w-full object-contain"
            />
          </div>

          {/* Objetivo */}
          <div className="rounded-xl border border-[#eadfc9] bg-[#fffaf1] px-4 py-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f8eee1] text-[#8a2627]">
                <Target
                  className="h-5 w-5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-xs font-extrabold text-[#65272a]">
                  {t(
                    "mortgageHero.objectiveTitle",
                    "Objetivo de esta calculadora",
                  )}
                </h2>

                <p className="mt-1 text-[10px] leading-4 text-[#4f4740]">
                  {t(
                    "mortgageHero.objectiveDescription",
                    "Ayudarle a entender cómo se calcula el pago mensual y cuánto representa subir o bajar de precio en una vivienda.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}