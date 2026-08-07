import {
  Banknote,
  CalendarDays,
  CircleDollarSign,
  FileText,
  HandCoins,
  HeartHandshake,
  Home,
  Landmark,
  Percent,
  PiggyBank,
  Users,
  Calculator,
  Shield,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

import { fmt$, fmt$2 } from "../utils/mortgage";

// Ajusta únicamente estas dos rutas.
import logo from "/img/logo.webp";
import logo1 from "/img/logo1.webp";

function formatPercentage(value, decimals = 2) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0%";
  }

  return `${numericValue.toFixed(decimals)}%`;
}

function formatSetting(value, mode, options = {}) {
  const { decimals = 2, amountSuffix = "" } = options;

  if (mode === "amount") {
    return `${fmt$2(value)}${amountSuffix}`;
  }

  return `${(Number(value) || 0).toFixed(decimals)}%`;
}

function SummaryItem({ icon: Icon, value, label, optional = false }) {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[60px] flex-col items-center justify-center border-b border-r border-[#ead9b5] px-2 py-2 text-center last:border-r-0">
      <Icon
        className="mb-1 h-4 w-4 text-[#8c0b12]"
        strokeWidth={2.2}
        aria-hidden="true"
      />

      <p className="text-[7px] font-extrabold leading-tight text-[#3f352e]">
        {label}
      </p>

      <p className="mt-1 text-[10px] font-black leading-tight text-[#3f352e]">
        {value}
      </p>

      {optional && (
        <p className="mt-0.5 text-[6px] font-semibold text-[#796b60]">
          {t("mortgageForm.optional", "Opcional")}
        </p>
      )}
    </div>
  );
}

function FooterBrand() {
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#fffdf8]">
      <div className="mx-auto mb-2 h-px w-[92%] bg-[#d8c29b]" />

      <div className="flex items-end justify-between gap-6 px-7 pb-4">
        <div className="max-w-[520px]">
          <p className="font-serif text-[11px] italic leading-relaxed text-[#6f5547]">
            {t("mortgageFooter.bottomMessage")}
          </p>
        </div>

        <img
          src={logo1}
          width="120"
          height="123"
          alt=""
          className="h-14 w-auto object-contain"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  );
}

function PageHeader({ title, subtitle }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-start justify-between gap-6 px-8 pt-7">
        <img
          src={logo}
          width="200"
          height="119"
          alt={t("headerApp.logoAlt")}
          className="h-[68px] w-auto object-contain"
          crossOrigin="anonymous"
        />

        <div className="pt-1 text-right">
          <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#7d6f64]">
            {t("header.disclaimer")}
          </p>
        </div>
      </div>

      <div className="mt-4 px-8 text-center">
        <h1 className="text-[22px] font-black uppercase tracking-tight text-[#7f090f]">
          {title}
        </h1>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#9a7d52]">
          {subtitle}
        </p>
      </div>
    </>
  );
}

function PageOne({ summary, ranges }) {
  const { t } = useTranslation();
  const isFha = summary.loanType === "FHA";

  const downPaymentLabel = formatSetting(
    summary.downPayment,
    summary.downPaymentMode,
  );

  const mortgageInsuranceLabel = isFha
    ? formatSetting(summary.fhaMip, summary.fhaMipMode, {
        amountSuffix:
          summary.fhaMipMode === "amount"
            ? ` ${t("mortgageTable.perYear")}`
            : "",
      })
    : Number(summary.conventionalPmi) > 0
      ? formatSetting(summary.conventionalPmi, summary.conventionalPmiMode, {
          amountSuffix:
            summary.conventionalPmiMode === "amount"
              ? ` ${t("mortgageTable.perYear")}`
              : "",
        })
      : t("mortgageTable.notApplicable");

  const upfrontMipLabel = isFha
    ? formatSetting(summary.ufmip, summary.ufmipMode)
    : t("mortgageTable.notApplicable");

  const taxesLabel = formatSetting(summary.taxes, summary.taxesMode, {
    amountSuffix:
      summary.taxesMode === "amount" ? ` ${t("mortgageTable.perYear")}` : "",
  });

  const insuranceLabel = formatSetting(
    summary.insurance,
    summary.insuranceMode,
    {
      amountSuffix:
        summary.insuranceMode === "amount"
          ? ` ${t("mortgageTable.perYear")}`
          : "",
    },
  );

  const compact = ranges.length > 10;

  const perfectPayment = Number(summary.perfectPayment) || 0;

  const perfectPaymentRangeIndex =
    perfectPayment > 0
      ? ranges.findIndex((range) => {
          const totalMin = Number(range.totalMin) || 0;
          const totalMax = Number(range.totalMax) || 0;

          return perfectPayment >= totalMin && perfectPayment <= totalMax;
        })
      : -1;

  return (
    <article
      data-pdf-page
      className="mortgage-pdf-page flex flex-col overflow-hidden bg-[#fffdf8] text-[#4c4037]"
    >
      <PageHeader title={t("header.title")} subtitle={t("header.subtitle")} />

      <div className="mx-8 mt-5 overflow-hidden rounded-[10px] border border-[#d8c39a] bg-white">
        <div className="flex items-center gap-2 bg-gradient-to-r from-[#790309] to-[#9e0c12] px-3 py-1.5 text-white">
          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#e7c365] bg-white text-[#8c0b12]">
            <Calculator
              className="h-3 w-3"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </div>

          <h2 className="text-[9px] font-black uppercase tracking-wide">
            {t("mortgageTable.calculatedScenario", "Escenario calculado")}
          </h2>
        </div>

        <div className="grid grid-cols-6">
          <SummaryItem
            icon={Home}
            value={summary.loanType}
            label={t("mortgageForm.loanType", "Tipo de préstamo")}
          />

          <SummaryItem
            icon={CalendarDays}
            value={fmt$(summary.minValue)}
            label={t("mortgageForm.minimumPrice", "Precio mínimo")}
          />

          <SummaryItem
            icon={Home}
            value={fmt$(summary.maxValue)}
            label={t("mortgageForm.maximumPrice", "Precio máximo")}
          />

          <SummaryItem
            icon={Calculator}
            value={fmt$(summary.interval)}
            label={t("mortgageForm.priceInterval", "Intervalo de precio")}
          />

          <SummaryItem
            icon={CalendarDays}
            value={`${summary.years} ${t("mortgageForm.years", "años")}`}
            label={t("mortgageForm.loanTerm", "Plazo")}
          />

          <SummaryItem
            icon={Percent}
            value={formatPercentage(summary.interestRate)}
            label={t("mortgageForm.interestRate", "Tasa de interés")}
          />

          <SummaryItem
            icon={PiggyBank}
            value={downPaymentLabel}
            label={t("mortgageForm.downPayment", "Pago inicial")}
          />

          <SummaryItem
            icon={ShieldCheck}
            value={upfrontMipLabel}
            label={t("mortgageTable.upfrontMip", "MIP inicial FHA")}
          />

          <SummaryItem
            icon={Shield}
            value={mortgageInsuranceLabel}
            label={
              isFha
                ? t("mortgageTable.annualFhaMip", "MIP anual FHA")
                : t("mortgageTable.annualPmi", "PMI anual")
            }
          />

          <SummaryItem
            icon={Landmark}
            value={taxesLabel}
            label={t("mortgageTable.annualTaxes", "Impuestos de propiedad")}
          />

          <SummaryItem
            icon={WalletCards}
            value={insuranceLabel}
            label={t(
              "mortgageTable.annualInsurance",
              "Seguro de propietario anual",
            )}
          />

          <SummaryItem
            icon={Users}
            value={fmt$2(summary.hoaMonthly || 0)}
            label={t("mortgageTable.monthlyHoa", "HOA mensual")}
            optional
          />
        </div>
      </div>

      <div className="mx-8 mt-5 overflow-hidden rounded-[16px] border border-[#d9c18e] bg-white shadow-[0_7px_18px_rgba(96,68,34,0.08)]">
        <table
          className={`w-full table-fixed border-collapse ${
            compact ? "text-[7px]" : "text-[8px]"
          }`}
        >
          <colgroup>
            <col className="w-[17%]" />
            <col className="w-[16%]" />
            <col className="w-[12%]" />
            <col className="w-[16%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
          </colgroup>

          <thead>
            <tr className="bg-[#7d080e] text-[#f3cf73]">
              <th className="px-2 py-3 text-left font-black leading-tight">
                {t("mortgageTable.purchasePriceRange")}
              </th>
              <th className="px-2 py-3 text-right font-black leading-tight">
                {t("mortgageTable.principalInterest")}
              </th>
              <th className="px-2 py-3 text-right font-black leading-tight">
                {t("mortgageTable.piDifference")}
              </th>
              <th className="px-2 py-3 text-right font-black leading-tight">
                {t("mortgageTable.mortgageInsurance")}
              </th>
              <th className="px-2 py-3 text-right font-black leading-tight">
                {t("mortgageTable.propertyTaxesMonth")}
              </th>
              <th className="px-2 py-3 text-right font-black leading-tight">
                {t("mortgageTable.homeownersInsurance")}
              </th>
              <th className="px-2 py-3 text-right font-black leading-tight">
                {t("mortgageTable.totalMonthlyPayment")}
              </th>
            </tr>
          </thead>

          <tbody>
            {ranges.map((range, index) => {
              const isPerfectPaymentRange = index === perfectPaymentRangeIndex;

              const rowBackground = isPerfectPaymentRange
                ? "bg-[#dff4e7]"
                : index % 2 === 0
                  ? "bg-[#fff8e8]"
                  : "bg-white";

              const emphasizedBackground = isPerfectPaymentRange
                ? "bg-[#c8ebd5]"
                : "bg-[#f7e3ae]";

              return (
                <tr
                  key={`${range.priceMin}-${range.priceMax}`}
                  className={rowBackground}
                >
                  <td
                    className={`whitespace-nowrap px-2 font-extrabold ${
                      compact ? "py-1.5" : "py-2.5"
                    } ${
                      isPerfectPaymentRange
                        ? "text-[#14532d]"
                        : "text-[#7d080e]"
                    }`}
                  >
                    {fmt$(range.priceMin)} - {fmt$(range.priceMax)}
                  </td>

                  <td
                    className={`whitespace-nowrap px-2 text-right ${
                      compact ? "py-1.5" : "py-2.5"
                    } ${
                      isPerfectPaymentRange ? "font-bold text-[#14532d]" : ""
                    }`}
                  >
                    {fmt$2(range.piMin)} - {fmt$2(range.piMax)}
                  </td>

                  <td
                    className={`whitespace-nowrap px-2 text-right font-black ${
                      compact ? "py-1.5" : "py-2.5"
                    } ${emphasizedBackground} ${
                      isPerfectPaymentRange
                        ? "text-[#14532d]"
                        : "text-[#8a1719]"
                    }`}
                  >
                    {fmt$2(range.piDifference)}
                  </td>

                  <td
                    className={`whitespace-nowrap px-2 text-right ${
                      compact ? "py-1.5" : "py-2.5"
                    } ${
                      isPerfectPaymentRange ? "font-bold text-[#14532d]" : ""
                    }`}
                  >
                    {fmt$2(range.miMin)} - {fmt$2(range.miMax)}
                  </td>

                  <td
                    className={`whitespace-nowrap px-2 text-right ${
                      compact ? "py-1.5" : "py-2.5"
                    } ${
                      isPerfectPaymentRange ? "font-bold text-[#14532d]" : ""
                    }`}
                  >
                    {fmt$2(range.taxMin)} - {fmt$2(range.taxMax)}
                  </td>

                  <td
                    className={`whitespace-nowrap px-2 text-right ${
                      compact ? "py-1.5" : "py-2.5"
                    } ${
                      isPerfectPaymentRange ? "font-bold text-[#14532d]" : ""
                    }`}
                  >
                    {fmt$2(range.insuranceMin)} - {fmt$2(range.insuranceMax)}
                  </td>

                  <td
                    className={`whitespace-nowrap px-2 text-right font-black ${
                      compact ? "py-1.5" : "py-2.5"
                    } ${emphasizedBackground} ${
                      isPerfectPaymentRange
                        ? "text-[#14532d]"
                        : "text-[#7d080e]"
                    }`}
                  >
                    {fmt$2(range.totalMin)} - {fmt$2(range.totalMax)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#efbd3d] via-[#f6d463] to-[#efbd3d] px-4 py-3 text-center">
          <CircleDollarSign className="h-4 w-4 shrink-0 text-[#7d080e]" />
          <p className="text-[10px] font-black text-[#7d080e]">
            {t("mortgageTable.formula")}
          </p>
        </div>
      </div>

      <div className="mx-8 mt-3 rounded-[14px] border border-[#d7c19a] bg-[#fff8e9] p-3">
        <div className="flex items-start gap-3">
          <HandCoins className="mt-0.5 h-5 w-5 shrink-0 text-[#8a0a10]" />

          <div>
            <h2 className="text-[10px] font-black uppercase text-[#7d080e]">
              {t("mortgageFooter.notes.title")}
            </h2>

            <div className="mt-1.5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[8px] font-black text-[#5f4b3d]">
                  {t("mortgageFooter.notes.estimates.title")}
                </p>

                <p className="mt-0.5 text-[7px] leading-relaxed text-[#6d625a]">
                  {t("mortgageFooter.notes.estimates.first")}
                </p>

                <p className="mt-0.5 text-[7px] leading-relaxed text-[#6d625a]">
                  {t("mortgageFooter.notes.estimates.second")}
                </p>
              </div>

              <div>
                <p className="text-[8px] font-black text-[#5f4b3d]">
                  {t("mortgageFooter.notes.lender.title")}
                </p>

                <p className="mt-0.5 text-[7px] leading-relaxed text-[#6d625a]">
                  {t("mortgageFooter.notes.lender.first")}
                </p>

                <p className="mt-0.5 text-[7px] leading-relaxed text-[#6d625a]">
                  {t("mortgageFooter.notes.lender.second")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBrand />
    </article>
  );
}

function PaymentPart({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-3 rounded-[15px] border border-[#dcc79f] bg-white p-4 shadow-[0_5px_14px_rgba(96,68,34,0.07)]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8a0a10] text-white">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>

      <div>
        <h3 className="text-[10px] font-black uppercase text-[#7d080e]">
          {title}
        </h3>
        <p className="mt-1 text-[8px] leading-relaxed text-[#6d625a]">
          {description}
        </p>
      </div>
    </div>
  );
}

function DecisionCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-[15px] border border-[#dcc79f] bg-white px-4 py-4 text-center shadow-[0_5px_14px_rgba(96,68,34,0.07)]">
      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#8a0a10] text-white">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <h3 className="mt-2 text-[9px] font-black uppercase text-[#7d080e]">
        {title}
      </h3>
      <p className="mt-1 text-[8px] leading-relaxed text-[#6d625a]">
        {description}
      </p>
    </div>
  );
}

function MonthlyPaymentFormula() {
  const { t } = useTranslation();

  const parts = [
    {
      icon: Banknote,
      label: t(
        "mortgageFooter.formula.principalInterest",
        "Principal + Interest",
      ),
    },
    {
      icon: ShieldCheck,
      label: t("mortgageFooter.formula.mortgageInsurance", "MIP / PMI"),
    },
    {
      icon: Landmark,
      label: t("mortgageFooter.formula.propertyTaxes", "Property Taxes"),
    },
    {
      icon: Shield,
      label: t(
        "mortgageFooter.formula.homeownersInsurance",
        "Homeowners Insurance",
      ),
    },
  ];

  return (
    <div className="mx-8 mt-5 overflow-hidden rounded-[16px] border border-[#d8c39a] bg-white">
      <div className="flex items-center justify-center gap-2 bg-[#7d080e] px-4 py-2 text-center">
        <CircleDollarSign
          className="h-4 w-4 text-[#f3cf73]"
          strokeWidth={2.2}
        />

        <h2 className="text-[10px] font-black uppercase tracking-[0.08em] text-[#f3cf73]">
          {t(
            "mortgageFooter.formula.title",
            "How your monthly payment is calculated",
          )}
        </h2>
      </div>

      <div className="px-5 py-5">
        <div className="flex items-stretch justify-center gap-2">
          {parts.map(({ icon: Icon, label }, index) => (
            <div key={label} className="contents">
              <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-[12px] border border-[#e1cfaa] bg-[#fffaf0] px-2 py-3 text-center">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#8a0a10] text-white">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </div>

                <p className="text-[7px] font-black uppercase leading-tight text-[#5a473b]">
                  {label}
                </p>
              </div>

              {index < parts.length - 1 && (
                <div className="flex shrink-0 items-center justify-center px-0.5">
                  <span className="text-[18px] font-black text-[#a58a62]">
                    +
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="my-3 flex items-center justify-center">
          <div className="h-px flex-1 bg-[#e4d3b2]" />

          <div className="mx-3 flex h-7 w-7 items-center justify-center rounded-full border border-[#d8bd83] bg-[#fff6df] text-[#8a0a10]">
            <span className="text-[15px] font-black">=</span>
          </div>

          <div className="h-px flex-1 bg-[#e4d3b2]" />
        </div>

        <div className="mx-auto flex max-w-[390px] items-center justify-center gap-3 rounded-[14px] border-2 border-[#8a0a10] bg-[#fff4d8] px-5 py-3 text-center">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#8a0a10] text-white">
            <CircleDollarSign className="h-5 w-5" strokeWidth={2.2} />
          </div>

          <div>
            <p className="text-[7px] font-extrabold uppercase tracking-[0.12em] text-[#8a0a10]">
              {t(
                "mortgageFooter.formula.resultLabel",
                "Estimated monthly payment",
              )}
            </p>

            <p className="mt-0.5 text-[11px] font-black uppercase leading-tight text-[#5a1719]">
              {t("mortgageFooter.formula.result", "Total Monthly Payment")}
            </p>
          </div>
        </div>

        <p className="mt-3 text-center text-[7px] font-semibold leading-relaxed text-[#78685d]">
          {t(
            "mortgageFooter.formula.note",
            "Total monthly payment = P&I + MIP/PMI + Property Taxes + Homeowners Insurance",
          )}
        </p>
      </div>
    </div>
  );
}

function PaymentBreakdownChart({ summary, ranges }) {
  const { t } = useTranslation();

  const perfectPayment = Number(summary?.perfectPayment) || 0;

  const matchingRangeIndex =
    perfectPayment > 0
      ? ranges.findIndex((range) => {
          const totalMin = Number(range.totalMin) || 0;
          const totalMax = Number(range.totalMax) || 0;

          return perfectPayment >= totalMin && perfectPayment <= totalMax;
        })
      : -1;

  const selectedRange =
    ranges[matchingRangeIndex >= 0 ? matchingRangeIndex : 0];

  if (!selectedRange) {
    return null;
  }

  const average = (min, max) => {
    const minValue = Number(min) || 0;
    const maxValue = Number(max) || 0;

    return (minValue + maxValue) / 2;
  };

  const parts = [
    {
      key: "pi",
      label: "P+I",
      value: average(selectedRange.piMin, selectedRange.piMax),
      color: "#8f070d",
      textColor: "#ffffff",
    },
    {
      key: "mi",
      label: "MI",
      value: average(selectedRange.miMin, selectedRange.miMax),
      color: "#d2a13b",
      textColor: "#ffffff",
    },
    {
      key: "tax",
      label: t("mortgageFooter.chart.tax", "Tax"),
      value: average(selectedRange.taxMin, selectedRange.taxMax),
      color: "#9c642d",
      textColor: "#ffffff",
    },
    {
      key: "insurance",
      label: t("mortgageFooter.chart.hi", "HI"),
      value: average(selectedRange.insuranceMin, selectedRange.insuranceMax),
      color: "#a88c60",
      textColor: "#ffffff",
    },
  ];

  const paymentTotal = parts.reduce((total, part) => total + part.value, 0);

  if (paymentTotal <= 0) {
    return null;
  }

  /*
   * SVG reducido para que PageTwo no consuma tanta altura
   * y deje libre el espacio del FooterBrand.
   */
  const size = 240;
  const center = size / 2;

  const outerRadius = 94;
  const innerRadius = 52;

  const gapDegrees = 1.5;

  const polarToCartesian = (cx, cy, radius, angleDegrees) => {
    const angleRadians = ((angleDegrees - 90) * Math.PI) / 180;

    return {
      x: cx + radius * Math.cos(angleRadians),
      y: cy + radius * Math.sin(angleRadians),
    };
  };

  const createDonutPath = (cx, cy, outer, inner, startAngle, endAngle) => {
    const outerStart = polarToCartesian(cx, cy, outer, endAngle);

    const outerEnd = polarToCartesian(cx, cy, outer, startAngle);

    const innerStart = polarToCartesian(cx, cy, inner, startAngle);

    const innerEnd = polarToCartesian(cx, cy, inner, endAngle);

    const angleSize = endAngle - startAngle;

    const largeArcFlag = angleSize > 180 ? 1 : 0;

    return [
      `M ${outerStart.x} ${outerStart.y}`,
      `A ${outer} ${outer} 0 ${largeArcFlag} 0 ${outerEnd.x} ${outerEnd.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${inner} ${inner} 0 ${largeArcFlag} 1 ${innerEnd.x} ${innerEnd.y}`,
      "Z",
    ].join(" ");
  };

  /*
   * Dejamos los segmentos pequeños agrupados en la zona
   * superior izquierda, parecido a la imagen de referencia.
   */
  let currentAngle = 4;

  const renderedParts = parts.map((part) => {
    const percentage = part.value / paymentTotal;
    const rawAngle = percentage * 360;

    const startAngle = currentAngle + gapDegrees / 2;

    const endAngle = currentAngle + rawAngle - gapDegrees / 2;

    const middleAngle = (startAngle + endAngle) / 2;

    currentAngle += rawAngle;

    /*
     * P+I tiene mucho espacio, por eso el texto puede ir
     * más centrado dentro del segmento.
     *
     * Los segmentos pequeños llevan el texto más cerca
     * del borde exterior para aprovechar mejor el espacio.
     */
    const labelRadius = part.key === "pi" ? 76 : part.rawAngle < 18 ? 78 : 75;

    const labelPosition = polarToCartesian(
      center,
      center,
      labelRadius,
      middleAngle,
    );

    return {
      ...part,
      rawAngle,
      startAngle,
      endAngle,
      middleAngle,
      labelX: labelPosition.x,
      labelY: labelPosition.y,
      path: createDonutPath(
        center,
        center,
        outerRadius,
        innerRadius,
        startAngle,
        endAngle,
      ),
    };
  });

  return (
    <div className="mx-8 mt-3 rounded-[14px] border border-[#d8c39a] bg-white px-4 py-2.5 shadow-[0_4px_10px_rgba(96,68,34,0.05)]">
      <div className="flex items-center justify-center gap-6">
        <div className="shrink-0">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="h-[190px] w-[190px] overflow-visible"
            role="img"
            aria-label={t(
              "mortgageFooter.chart.title",
              "Monthly payment breakdown",
            )}
          >
            {renderedParts.map((part) => (
              <path key={part.key} d={part.path} fill={part.color} />
            ))}

            <circle
              cx={center}
              cy={center}
              r={innerRadius - 1}
              fill="#fffdf8"
            />

            {renderedParts.map((part) => {
              const isPi = part.key === "pi";

              /*
               * Segmentos pequeños:
               * label + valor dentro de su mismo color.
               */
              if (!isPi) {
                const tinySegment = part.rawAngle < 13;

                return (
                  <g key={`${part.key}-text`}>
                    <text
                      x={part.labelX}
                      y={part.labelY - (tinySegment ? 3.5 : 5)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={part.textColor}
                      fontSize={tinySegment ? "5" : "6"}
                      fontWeight="900"
                    >
                      {part.label}
                    </text>

                    <text
                      x={part.labelX}
                      y={part.labelY + (tinySegment ? 4 : 5)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={part.textColor}
                      fontSize={tinySegment ? "5.5" : "6.5"}
                      fontWeight="900"
                    >
                      {fmt$2(part.value)}
                    </text>
                  </g>
                );
              }

              /*
               * P+I va directamente dentro del segmento rojo.
               */
              return (
                <g key={`${part.key}-text`}>
                  <text
                    x={part.labelX}
                    y={part.labelY - 6}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={part.textColor}
                    fontSize="7"
                    fontWeight="900"
                  >
                    {part.label}
                  </text>

                  <text
                    x={part.labelX}
                    y={part.labelY + 6}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={part.textColor}
                    fontSize="9"
                    fontWeight="900"
                  >
                    {fmt$2(part.value)}
                  </text>
                </g>
              );
            })}

            <text
              x={center}
              y={center - 8}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#7d080e"
              fontSize="6.5"
              fontWeight="900"
              letterSpacing="0.5"
            >
              {t(
                "mortgageFooter.chart.yourPayment",
                "Your Payment",
              ).toUpperCase()}
            </text>

            <text
              x={center}
              y={center + 9}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#3f352e"
              fontSize="14"
              fontWeight="900"
            >
              {fmt$2(paymentTotal)}
            </text>
          </svg>
        </div>

        <div className="min-w-0 max-w-[330px] flex-1">
          <h2 className="text-[10px] font-black uppercase text-[#7d080e]">
            {t("mortgageFooter.chart.title", "Monthly payment breakdown")}
          </h2>

          <p className="mt-1 text-[7px] leading-relaxed text-[#6d625a]">
            {t(
              "mortgageFooter.chart.description",
              "Estimated composition of the monthly payment for the selected scenario.",
            )}
          </p>

          <div className="mt-2 rounded-[10px] border border-[#ead9b5] bg-[#fffaf0] px-3 py-2">
            <p className="text-[7px] font-bold leading-relaxed text-[#6d625a]">
              {t(
                "mortgageFooter.formula.note",
                "Total monthly payment = P&I + MIP/PMI + Property Taxes + Homeowners Insurance",
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageTwo({ summary, ranges }) {
  const { t } = useTranslation();

  return (
    <article
      data-pdf-page
      className="mortgage-pdf-page relative flex flex-col overflow-hidden bg-[#fffdf8] pb-[82px] text-[#4c4037]"
    >
      <PageHeader
        title={t("mortgageFooter.composition.title")}
        subtitle={t("header.subtitle")}
      />

      <div className="mx-auto mt-3 max-w-[680px] px-8 text-center">
        <p className="text-[9px] leading-relaxed text-[#6e6259]">
          {t("mortgageFooter.composition.description")}
        </p>
      </div>

      <MonthlyPaymentFormula />

      <PaymentBreakdownChart summary={summary} ranges={ranges} />

      <div className="mx-8 mt-3 grid grid-cols-2 gap-2.5">
        <PaymentPart
          icon={PiggyBank}
          title={t("mortgageFooter.paymentParts.principal.title")}
          description={t("mortgageFooter.paymentParts.principal.description")}
        />

        <PaymentPart
          icon={Banknote}
          title={t("mortgageFooter.paymentParts.interest.title")}
          description={t("mortgageFooter.paymentParts.interest.description")}
        />

        <PaymentPart
          icon={Landmark}
          title={t("mortgageFooter.paymentParts.taxes.title")}
          description={t("mortgageFooter.paymentParts.taxes.description")}
        />

        <PaymentPart
          icon={Shield}
          title={t("mortgageFooter.paymentParts.insurance.title")}
          description={t("mortgageFooter.paymentParts.insurance.description")}
        />

        <div className="col-span-2">
          <PaymentPart
            icon={ShieldCheck}
            title={t("mortgageFooter.paymentParts.mortgageInsurance.title")}
            description={t(
              "mortgageFooter.paymentParts.mortgageInsurance.description",
            )}
          />
        </div>
      </div>

      <div className="mx-8 mt-3">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#d7c19a]" />

          <h2 className="text-center text-[11px] font-black uppercase text-[#7d080e]">
            {t("mortgageFooter.increases.title")}
          </h2>

          <div className="h-px flex-1 bg-[#d7c19a]" />
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2.5">
          <DecisionCard
            icon={TrendingUp}
            title={t("mortgageFooter.increases.morePayment.title")}
            description={t("mortgageFooter.increases.morePayment.description")}
          />

          <DecisionCard
            icon={TrendingDown}
            title={t("mortgageFooter.increases.lessPayment.title")}
            description={t("mortgageFooter.increases.lessPayment.description")}
          />

          <DecisionCard
            icon={HeartHandshake}
            title={t("mortgageFooter.increases.yourDecision.title")}
            description={t("mortgageFooter.increases.yourDecision.description")}
          />
        </div>
      </div>

      <div className="mx-8 mt-3 rounded-[14px] border border-[#d7c19a] bg-[#fff8e9] p-3">
        <div className="flex items-start gap-3">
          <HandCoins className="mt-0.5 h-5 w-5 shrink-0 text-[#8a0a10]" />

          <div>
            <h2 className="text-[10px] font-black uppercase text-[#7d080e]">
              {t("mortgageFooter.notes.title")}
            </h2>

            <div className="mt-1.5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[8px] font-black text-[#5f4b3d]">
                  {t("mortgageFooter.notes.estimates.title")}
                </p>

                <p className="mt-0.5 text-[7px] leading-relaxed text-[#6d625a]">
                  {t("mortgageFooter.notes.estimates.first")}
                </p>

                <p className="mt-0.5 text-[7px] leading-relaxed text-[#6d625a]">
                  {t("mortgageFooter.notes.estimates.second")}
                </p>
              </div>

              <div>
                <p className="text-[8px] font-black text-[#5f4b3d]">
                  {t("mortgageFooter.notes.lender.title")}
                </p>

                <p className="mt-0.5 text-[7px] leading-relaxed text-[#6d625a]">
                  {t("mortgageFooter.notes.lender.first")}
                </p>

                <p className="mt-0.5 text-[7px] leading-relaxed text-[#6d625a]">
                  {t("mortgageFooter.notes.lender.second")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBrand />
    </article>
  );
}

export default function MortgagePdfReport({ summary, ranges, reportRef }) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      aria-hidden="true"
      className="mortgage-print-portal pointer-events-none fixed left-[-10000px] top-0 z-[-1]"
    >
      <div ref={reportRef}>
        <PageOne summary={summary} ranges={ranges} />
        <PageTwo summary={summary} ranges={ranges} />
      </div>
    </div>,
    document.body,
  );
}
