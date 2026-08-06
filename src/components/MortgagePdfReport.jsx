import {
  BadgeDollarSign,
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
  ReceiptText,
  Scale,
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

function SummaryItem({ icon: Icon, value, label }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8c0b12] text-white">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-[11px] font-extrabold leading-tight text-[#4c4037]">
          {value}
        </p>
        <p className="truncate text-[8px] font-semibold uppercase tracking-wide text-[#866f5f]">
          {label}
        </p>
      </div>
    </div>
  );
}

function FooterBrand() {
  const { t } = useTranslation();

  return (
    <div className="mt-auto">
      <div className="mx-auto mb-3 h-px w-[92%] bg-[#d8c29b]" />

      <div className="flex items-end justify-between gap-6 px-7 pb-5">
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
          <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#a58a62]">
            {t("header.eyebrow")}
          </p>
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

  return (
    <article
      data-pdf-page
      className="mortgage-pdf-page flex flex-col overflow-hidden bg-[#fffdf8] text-[#4c4037]"
    >
      <PageHeader title={t("header.title")} subtitle={t("header.subtitle")} />

      <div className="mx-8 mt-5 rounded-[18px] border border-[#d8c39a] bg-white px-5 py-4 shadow-[0_6px_18px_rgba(96,68,34,0.08)]">
        <div className="grid grid-cols-4 gap-x-5 gap-y-4">
          <SummaryItem
            icon={Home}
            value={`${summary.loanType} · ${downPaymentLabel}`}
            label={t("mortgageForm.downPayment")}
          />
          <SummaryItem
            icon={Percent}
            value={formatPercentage(summary.interestRate)}
            label={t("mortgageTable.fixedRate")}
          />
          <SummaryItem
            icon={CalendarDays}
            value={`${summary.years} ${t("mortgageForm.years", "years")}`}
            label={t("mortgageTable.loanTerm")}
          />
          <SummaryItem
            icon={ShieldCheck}
            value={upfrontMipLabel}
            label={t("mortgageTable.upfrontMip")}
          />
          <SummaryItem
            icon={Shield}
            value={mortgageInsuranceLabel}
            label={
              isFha
                ? t("mortgageTable.annualFhaMip")
                : t("mortgageTable.annualPmi")
            }
          />
          <SummaryItem
            icon={ReceiptText}
            value={taxesLabel}
            label={t("mortgageTable.annualTaxes")}
          />
          <SummaryItem
            icon={WalletCards}
            value={insuranceLabel}
            label={t("mortgageTable.annualInsurance")}
          />
          <SummaryItem
            icon={Scale}
            value={`${fmt$(summary.minValue)} – ${fmt$(summary.maxValue)}`}
            label={t("mortgageTable.purchasePriceRange")}
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
            {ranges.map((range, index) => (
              <tr
                key={`${range.priceMin}-${range.priceMax}`}
                className={index % 2 === 0 ? "bg-[#fff8e8]" : "bg-white"}
              >
                <td
                  className={`whitespace-nowrap px-2 font-extrabold text-[#7d080e] ${
                    compact ? "py-1.5" : "py-2.5"
                  }`}
                >
                  {fmt$(range.priceMin)} - {fmt$(range.priceMax)}
                </td>
                <td
                  className={`whitespace-nowrap px-2 text-right ${
                    compact ? "py-1.5" : "py-2.5"
                  }`}
                >
                  {fmt$2(range.piMin)} - {fmt$2(range.piMax)}
                </td>
                <td
                  className={`whitespace-nowrap bg-[#f7e3ae] px-2 text-right font-black text-[#8a1719] ${
                    compact ? "py-1.5" : "py-2.5"
                  }`}
                >
                  {fmt$2(range.piDifference)}
                </td>
                <td
                  className={`whitespace-nowrap px-2 text-right ${
                    compact ? "py-1.5" : "py-2.5"
                  }`}
                >
                  {fmt$2(range.miMin)} - {fmt$2(range.miMax)}
                </td>
                <td
                  className={`whitespace-nowrap px-2 text-right ${
                    compact ? "py-1.5" : "py-2.5"
                  }`}
                >
                  {fmt$2(range.taxMin)} - {fmt$2(range.taxMax)}
                </td>
                <td
                  className={`whitespace-nowrap px-2 text-right ${
                    compact ? "py-1.5" : "py-2.5"
                  }`}
                >
                  {fmt$2(range.insuranceMin)} - {fmt$2(range.insuranceMax)}
                </td>
                <td
                  className={`whitespace-nowrap bg-[#f7e3ae] px-2 text-right font-black text-[#7d080e] ${
                    compact ? "py-1.5" : "py-2.5"
                  }`}
                >
                  {fmt$2(range.totalMin)} - {fmt$2(range.totalMax)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#efbd3d] via-[#f6d463] to-[#efbd3d] px-4 py-3 text-center">
          <CircleDollarSign className="h-4 w-4 shrink-0 text-[#7d080e]" />
          <p className="text-[10px] font-black text-[#7d080e]">
            {t("mortgageTable.formula")}
          </p>
        </div>
      </div>

      <div className="mx-8 mt-5 grid grid-cols-2 gap-4">
        <div className="rounded-[14px] border border-[#dcc99f] bg-white p-4">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[#8a0a10]" />
            <div>
              <h3 className="text-[10px] font-black uppercase text-[#7d080e]">
                {t("mortgageTable.importantNotes")}
              </h3>
              <p className="mt-1 text-[8px] leading-relaxed text-[#6d625a]">
                {t("mortgageTable.noteEstimates")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[14px] border border-[#dcc99f] bg-white p-4">
          <div className="flex items-start gap-3">
            <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-[#8a0a10]" />
            <div>
              <h3 className="text-[10px] font-black uppercase text-[#7d080e]">
                {t("mortgageFooter.notes.lender.title")}
              </h3>
              <p className="mt-1 text-[8px] leading-relaxed text-[#6d625a]">
                {t("mortgageTable.noteLender")}
              </p>
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

function PageTwo() {
  const { t } = useTranslation();

  return (
    <article
      data-pdf-page
      className="mortgage-pdf-page flex flex-col overflow-hidden bg-[#fffdf8] text-[#4c4037]"
    >
      <PageHeader
        title={t("mortgageFooter.composition.title")}
        subtitle={t("header.subtitle")}
      />

      <div className="mx-auto mt-4 max-w-[680px] px-8 text-center">
        <p className="text-[10px] leading-relaxed text-[#6e6259]">
          {t("mortgageFooter.composition.description")}
        </p>
      </div>

      <div className="mx-8 mt-5 grid grid-cols-2 gap-4">
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

      <div className="mx-8 mt-6">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#d7c19a]" />
          <h2 className="text-center text-[13px] font-black uppercase text-[#7d080e]">
            {t("mortgageFooter.increases.title")}
          </h2>
          <div className="h-px flex-1 bg-[#d7c19a]" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
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

      <div className="mx-8 mt-6 rounded-[16px] border border-[#d7c19a] bg-[#fff8e9] p-5">
        <div className="flex items-start gap-3">
          <HandCoins className="mt-0.5 h-6 w-6 shrink-0 text-[#8a0a10]" />
          <div>
            <h2 className="text-[11px] font-black uppercase text-[#7d080e]">
              {t("mortgageFooter.notes.title")}
            </h2>

            <div className="mt-2 grid grid-cols-2 gap-5">
              <div>
                <p className="text-[9px] font-black text-[#5f4b3d]">
                  {t("mortgageFooter.notes.estimates.title")}
                </p>
                <p className="mt-1 text-[8px] leading-relaxed text-[#6d625a]">
                  {t("mortgageFooter.notes.estimates.first")}
                </p>
                <p className="mt-1 text-[8px] leading-relaxed text-[#6d625a]">
                  {t("mortgageFooter.notes.estimates.second")}
                </p>
              </div>

              <div>
                <p className="text-[9px] font-black text-[#5f4b3d]">
                  {t("mortgageFooter.notes.lender.title")}
                </p>
                <p className="mt-1 text-[8px] leading-relaxed text-[#6d625a]">
                  {t("mortgageFooter.notes.lender.first")}
                </p>
                <p className="mt-1 text-[8px] leading-relaxed text-[#6d625a]">
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
        <PageTwo />
      </div>
    </div>,
    document.body,
  );
}
