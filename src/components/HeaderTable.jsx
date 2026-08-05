import {
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ResultsSectionHeader() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#e7dcc7] bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Título */}
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f8eee3] text-[#8a171b]">
          <BarChart3
            className="h-6 w-6"
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-black uppercase leading-6 tracking-wide text-[#7d1519] md:text-lg">
            {t("resultsSection.title")}
          </h2>

          <p className="mt-1.5 text-sm leading-6 text-[#655b52]">
            {t("resultsSection.subtitle")}
          </p>
        </div>
      </div>

      {/* Nota */}
      <div className="flex shrink-0 items-start gap-3 rounded-lg border border-[#ead7ad] bg-[#fff8e9] px-4 py-3 md:max-w-[390px]">
        <Lightbulb
          className="mt-0.5 h-5 w-5 shrink-0 text-[#c2872c]"
          strokeWidth={2}
          aria-hidden="true"
        />

        <p className="text-sm leading-6 text-[#6d5739]">
          {t("resultsSection.noteBefore")}{" "}
          <span className="font-extrabold text-[#7d1519]">
            {t("resultsSection.differentialLabel")}
          </span>{" "}
          {t("resultsSection.noteAfter")}
        </p>
      </div>
    </div>
  );
}