import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Home,
  Percent,
  Calendar,
  ShieldCheck,
  FileText,
  Shield,
  Calculator,
  ClipboardList,
  Download,
  Printer,
  LoaderCircle,
} from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import { fmt$, fmt$2, groupIntoRanges } from "../utils/mortgage";
import Header from "./Header";

export default function MortgageTable({ data }) {
  const { t, i18n } = useTranslation();
  const mortgageRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  if (!data || !data.results || data.results.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-yellow-500 bg-white p-10 text-center shadow-lg">
        <Calculator className="mx-auto mb-3 h-12 w-12 text-gray-400" />

        <p className="text-lg text-gray-500">{t("mortgageTable.empty")}</p>
      </div>
    );
  }

  const { results, summary } = data;
  const ranges = groupIntoRanges(results);

  const chips = [
    {
      icon: Home,
      label: `${summary.loanType} ${summary.downPayment}%`,
      sub: t("mortgageForm.downPayment"),
    },
    {
      icon: Percent,
      label: `${summary.interestRate}%`,
      sub: t("mortgageTable.fixedRate"),
    },
    {
      icon: Calendar,
      label: `${summary.years} ${t("mortgageForm.years")}`,
      sub: t("mortgageTable.loanTerm"),
    },
    {
      icon: ShieldCheck,
      label: `${summary.ufmip ?? 1.75}%`,
      sub: t("mortgageTable.upfrontMip"),
    },
    {
      icon: FileText,
      label: `${summary.taxes ?? 0.75}%`,
      sub: t("mortgageTable.annualTaxes"),
    },
    {
      icon: Shield,
      label: `${summary.insurance ?? 0.45}%`,
      sub: t("mortgageTable.annualInsurance"),
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = mortgageRef.current;

    if (!element || downloading) return;

    const originalStyles = {
      overflow: element.style.overflow,
      width: element.style.width,
      maxWidth: element.style.maxWidth,
    };

    try {
      setDownloading(true);

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      const images = Array.from(element.querySelectorAll("img"));

      await Promise.all(
        images.map(
          (image) =>
            new Promise((resolve) => {
              if (image.complete) {
                resolve();
                return;
              }

              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
            }),
        ),
      );

      element.style.overflow = "visible";
      element.style.width = `${element.scrollWidth}px`;
      element.style.maxWidth = "none";

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        imageTimeout: 15000,
      });

      if (!canvas.width || !canvas.height) {
        throw new Error(t("mortgageTable.emptyCapture"));
      }

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "letter",
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 5;
      const printableWidth = pageWidth - margin * 2;
      const printableHeight = pageHeight - margin * 2;

      const canvasRatio = canvas.width / canvas.height;
      const pageRatio = printableWidth / printableHeight;

      let imageWidth;
      let imageHeight;

      if (canvasRatio > pageRatio) {
        imageWidth = printableWidth;
        imageHeight = printableWidth / canvasRatio;
      } else {
        imageHeight = printableHeight;
        imageWidth = printableHeight * canvasRatio;
      }

      const x = (pageWidth - imageWidth) / 2;
      const y = (pageHeight - imageHeight) / 2;

      const imageData = canvas.toDataURL("image/jpeg", 0.95);

      pdf.addImage(
        imageData,
        "JPEG",
        x,
        y,
        imageWidth,
        imageHeight,
        undefined,
        "FAST",
      );

      const loanType = String(summary.loanType || "Mortgage")
        .trim()
        .replace(/[^a-zA-Z0-9_-]+/g, "-");

      const language = i18n.resolvedLanguage || "en";
      const date = new Date().toISOString().slice(0, 10);

      pdf.save(`estimated-payment-${loanType}-${language}-${date}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);

      alert(
        `${t("mortgageTable.pdfError")}\n\n${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    } finally {
      element.style.overflow = originalStyles.overflow;
      element.style.width = originalStyles.width;
      element.style.maxWidth = originalStyles.maxWidth;

      setDownloading(false);
    }
  };

  return (
    <div>
      <div className="no-print mb-4 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {downloading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}

          {downloading ? t("common.generatingPdf") : t("common.downloadPdf")}
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-red-900 bg-white px-5 py-2 text-sm font-bold text-red-900 shadow-sm transition-colors hover:bg-red-50"
        >
          <Printer className="h-4 w-4" />
          {t("common.print")}
        </button>
      </div>

      <section
        ref={mortgageRef}
        className="printable-mortgage overflow-hidden rounded-2xl border-2 border-red-800 bg-white shadow-lg"
      >
        <Header />

        <div className="grid grid-cols-2 gap-2 border-b-2 border-yellow-500 bg-yellow-50 p-3 md:grid-cols-6">
          {chips.map((chip) => {
            const Icon = chip.icon;

            return (
              <div
                key={chip.sub}
                className="rounded-lg border border-transparent px-2 py-1.5 text-center"
              >
                <Icon className="mx-auto mb-0.5 h-5 w-5 text-red-800" />

                <p className="text-xs font-bold text-red-900">{chip.label}</p>

                <p className="text-[10px] text-gray-600">{chip.sub}</p>
              </div>
            );
          })}
        </div>

        <div className="overflow-x-auto print:overflow-visible">
          <table className="w-full min-w-[1100px] border-collapse text-sm print:min-w-0 print:text-[8px]">
            <thead>
              <tr className="bg-red-900 text-yellow-400">
                <th className="px-4 py-3 text-left font-bold print:px-2 print:py-2">
                  {t("mortgageTable.purchasePriceRange")}
                </th>

                <th className="px-4 py-3 text-right font-bold print:px-2 print:py-2">
                  {t("mortgageTable.principalInterest")}
                </th>

                <th className="px-4 py-3 text-right font-bold print:px-2 print:py-2">
                  {t("mortgageTable.piDifference")}
                </th>

                <th className="px-4 py-3 text-right font-bold print:px-2 print:py-2">
                  {t("mortgageTable.mortgageInsurance")}
                </th>

                <th className="px-4 py-3 text-right font-bold print:px-2 print:py-2">
                  {t("mortgageTable.propertyTaxesMonth")}
                </th>

                <th className="px-4 py-3 text-right font-bold print:px-2 print:py-2">
                  {t("mortgageTable.homeownersInsurance")}
                </th>

                <th className="px-4 py-3 text-right font-bold print:px-2 print:py-2">
                  {t("mortgageTable.totalMonthlyPayment")}
                </th>
              </tr>
            </thead>

            <tbody>
              {ranges.map((range, index) => (
                <tr
                  key={`${range.priceMin}-${range.priceMax}`}
                  className={index % 2 === 0 ? "bg-yellow-50" : "bg-white"}
                >
                  <td className="whitespace-nowrap px-4 py-3 font-bold text-red-900 print:px-2 print:py-2">
                    {fmt$(range.priceMin)} - {fmt$(range.priceMax)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-right print:px-2 print:py-2">
                    {fmt$2(range.piMin)} - {fmt$2(range.piMax)}
                  </td>

                  <td className="whitespace-nowrap bg-yellow-100 px-4 py-3 text-right font-bold text-red-800 print:px-2 print:py-2">
                    {fmt$2(range.piDifference)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-right print:px-2 print:py-2">
                    {fmt$2(range.miMin)} - {fmt$2(range.miMax)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-right print:px-2 print:py-2">
                    {fmt$2(range.taxMin)} - {fmt$2(range.taxMax)}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-right print:px-2 print:py-2">
                    {fmt$2(range.insuranceMin)} - {fmt$2(range.insuranceMax)}
                  </td>

                  <td className="whitespace-nowrap bg-yellow-100 px-4 py-3 text-right font-bold text-red-900 print:px-2 print:py-2">
                    {fmt$2(range.totalMin)} - {fmt$2(range.totalMax)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center gap-2 border-t-2 border-red-800 bg-gradient-to-r from-yellow-400 to-yellow-500 p-3 text-center">
          <Calculator className="h-5 w-5 shrink-0 text-red-900" />

          <p className="text-sm font-bold text-red-900 md:text-base">
            {t("mortgageTable.formula")}
          </p>
        </div>

        <div className="border-t-2 border-yellow-500 bg-red-50 p-4">
          <h3 className="mb-2 flex items-center gap-2 font-bold text-red-900">
            <ClipboardList className="h-4 w-4" />
            {t("mortgageTable.importantNotes")}
          </h3>

          <ul className="list-inside list-disc space-y-1 text-xs text-gray-700">
            <li>{t("mortgageTable.noteEstimates")}</li>

            <li>
              {t("mortgageTable.noteDifference", {
                downPayment: summary.downPayment ?? 3.5,
                interestRate: Number(summary.interestRate ?? 6).toFixed(2),
                years: summary.years ?? 30,
                ufmip: summary.ufmip ?? 1.75,
              })}
            </li>

            <li>
              {t("mortgageTable.noteTaxes", {
                taxes: summary.taxes ?? 0.75,
              })}
            </li>

            <li>
              {t("mortgageTable.noteInsurance", {
                insurance: summary.insurance ?? 0.45,
              })}
            </li>

            <li>{t("mortgageTable.noteHoa")}</li>

            <li>{t("mortgageTable.noteLender")}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
