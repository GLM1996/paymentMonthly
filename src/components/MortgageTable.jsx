import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Calculator,
  Calendar,
  ClipboardList,
  Download,
  FileText,
  Home,
  LoaderCircle,
  Percent,
  Printer,
  Shield,
  ShieldCheck,
} from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import { fmt$, fmt$2, groupIntoRanges } from "../utils/mortgage";
import HeaderTable from "./HeaderTable";
import MortgagePdfReport from "./MortgagePdfReport";

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

  return formatPercentage(value, decimals);
}

async function waitForImages(element) {
  const images = Array.from(element.querySelectorAll("img"));

  await Promise.all(
    images.map(
      (image) =>
        new Promise((resolve) => {
          if (image.complete && image.naturalWidth > 0) {
            resolve();
            return;
          }

          image.addEventListener("load", resolve, {
            once: true,
          });

          image.addEventListener("error", resolve, {
            once: true,
          });
        }),
    ),
  );
}

export default function MortgageTable({ data }) {
  const { t, i18n } = useTranslation();
  const reportRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  if (!data || !Array.isArray(data.results) || data.results.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-yellow-500 bg-white p-10 text-center shadow-lg">
        <Calculator className="mx-auto mb-3 h-12 w-12 text-gray-400" />

        <p className="text-lg text-gray-500">{t("mortgageTable.empty")}</p>
      </div>
    );
  }

  const { results, summary } = data;
  const ranges = groupIntoRanges(results);

  const perfectPayment = Number(summary.perfectPayment) || 0;

  const perfectPaymentRangeIndex =
    perfectPayment > 0
      ? ranges.findIndex((range) => {
          const totalMin = Number(range.totalMin) || 0;
          const totalMax = Number(range.totalMax) || 0;

          return perfectPayment >= totalMin && perfectPayment <= totalMax;
        })
      : -1;
  const isFha = summary.loanType === "FHA";

  const downPaymentLabel = formatSetting(
    summary.downPayment,
    summary.downPaymentMode,
  );

  const mortgageInsuranceLabel = isFha
    ? formatSetting(summary.fhaMip, summary.fhaMipMode)
    : formatSetting(summary.conventionalPmi, summary.conventionalPmiMode);

  const upfrontMipLabel = isFha
    ? formatSetting(summary.ufmip, summary.ufmipMode)
    : t("mortgageTable.notApplicable");

  const mortgageInsuranceChipLabel = isFha
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

  const chips = [
    {
      icon: Home,
      label: `${summary.loanType} · ${downPaymentLabel}`,
      sub: t("mortgageForm.downPayment"),
    },
    {
      icon: Percent,
      label: formatPercentage(summary.interestRate),
      sub: t("mortgageTable.fixedRate"),
    },
    {
      icon: Calendar,
      label: `${summary.years} ${t("mortgageForm.years", "years")}`,
      sub: t("mortgageTable.loanTerm"),
    },
    {
      icon: ShieldCheck,
      label: upfrontMipLabel,
      sub: t("mortgageTable.upfrontMip"),
    },
    {
      icon: Shield,
      label: mortgageInsuranceChipLabel,
      sub: isFha
        ? t("mortgageTable.annualFhaMip")
        : t("mortgageTable.annualPmi"),
    },
    {
      icon: FileText,
      label: taxesLabel,
      sub: t("mortgageTable.annualTaxes"),
    },
    {
      icon: Shield,
      label: insuranceLabel,
      sub: t("mortgageTable.annualInsurance"),
    },
  ];

  const buildMortgagePdf = async () => {
    const reportElement = reportRef.current;

    if (!reportElement) {
      throw new Error(
        t("mortgageTable.emptyCapture", "The generated capture is empty."),
      );
    }

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    await waitForImages(reportElement);

    const pages = Array.from(reportElement.querySelectorAll("[data-pdf-page]"));

    if (pages.length !== 2) {
      throw new Error(
        t("mortgageTable.emptyCapture", "The generated capture is empty."),
      );
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter",
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let index = 0; index < pages.length; index += 1) {
      const page = pages[index];

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#fffdf8",
        logging: false,
        scrollX: 0,
        scrollY: 0,
        width: page.scrollWidth,
        height: page.scrollHeight,
        windowWidth: page.scrollWidth,
        windowHeight: page.scrollHeight,
        imageTimeout: 15000,
      });

      if (!canvas.width || !canvas.height) {
        throw new Error(
          t("mortgageTable.emptyCapture", "The generated capture is empty."),
        );
      }

      if (index > 0) {
        pdf.addPage("letter", "portrait");
      }

      const imageData = canvas.toDataURL("image/jpeg", 0.95);

      pdf.addImage(
        imageData,
        "JPEG",
        0,
        0,
        pageWidth,
        pageHeight,
        undefined,
        "FAST",
      );
    }

    return pdf;
  };

  const handlePrint = async () => {
    if (downloading) return;

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert(
        t(
          "mortgageTable.popupBlocked",
          "Please allow pop-ups to open the printable PDF.",
        ),
      );

      return;
    }

    printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${t("common.generatingPdf")}</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 24px;
          font-family: Arial, sans-serif;
          background: #ffffff;
        "
      >
        ${t("common.generatingPdf")}
      </body>
    </html>
  `);

    printWindow.document.close();

    try {
      setDownloading(true);

      const pdf = await buildMortgagePdf();
      const pdfBlob = pdf.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);

      printWindow.location.replace(pdfUrl);

      window.setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 300000);
    } catch (error) {
      console.error("Error opening printable PDF:", error);

      printWindow.close();

      alert(
        `${t(
          "mortgageTable.printError",
          "The printable PDF could not be opened.",
        )}\n\n${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadPDF = async () => {
    const reportElement = reportRef.current;

    if (!reportElement || downloading) {
      return;
    }

    try {
      setDownloading(true);

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await waitForImages(reportElement);

      const pages = Array.from(
        reportElement.querySelectorAll("[data-pdf-page]"),
      );

      if (pages.length !== 2) {
        throw new Error(
          t("mortgageTable.emptyCapture", "The generated capture is empty."),
        );
      }

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter",
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let index = 0; index < pages.length; index += 1) {
        const page = pages[index];

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#fffdf8",
          logging: false,
          scrollX: 0,
          scrollY: 0,
          width: page.scrollWidth,
          height: page.scrollHeight,
          windowWidth: page.scrollWidth,
          windowHeight: page.scrollHeight,
          imageTimeout: 15000,
        });

        if (!canvas.width || !canvas.height) {
          throw new Error(
            t("mortgageTable.emptyCapture", "The generated capture is empty."),
          );
        }

        if (index > 0) {
          pdf.addPage("letter", "portrait");
        }

        const imageData = canvas.toDataURL("image/jpeg", 0.95);

        pdf.addImage(
          imageData,
          "JPEG",
          0,
          0,
          pageWidth,
          pageHeight,
          undefined,
          "FAST",
        );
      }

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
      setDownloading(false);
    }
  };

  return (
    <div>
      <div className="no-print mb-4 mt-1 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-900 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
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
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-red-900 bg-white px-5 py-2 text-sm font-bold text-red-900 shadow-sm transition-colors hover:bg-red-50"
        >
          <Printer className="h-4 w-4" />
          {t("common.print")}
        </button>
      </div>

      <section className="printable-mortgage overflow-hidden rounded-2xl border-2 border-red-800 bg-white shadow-lg">
        <HeaderTable />

        <div className="grid grid-cols-2 gap-2 border-b-2 border-yellow-500 bg-yellow-50 p-3 sm:grid-cols-3 lg:grid-cols-7">
          {chips.map((chip, index) => {
            const Icon = chip.icon;

            return (
              <div
                key={`${chip.sub}-${index}`}
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
                <th className="px-4 py-3 text-center font-bold print:px-2 print:py-2">
                  {t("mortgageTable.purchasePriceRange")}
                </th>

                <th className="px-4 py-3 text-center font-bold print:px-2 print:py-2">
                  {t("mortgageTable.principalInterest")}
                </th>

                <th className="px-4 py-3 text-center font-bold print:px-2 print:py-2">
                  {t("mortgageTable.piDifference")}
                </th>

                <th className="px-4 py-3 text-center font-bold print:px-2 print:py-2">
                  {t("mortgageTable.mortgageInsurance")}
                </th>

                <th className="px-4 py-3 text-center font-bold print:px-2 print:py-2">
                  {t("mortgageTable.propertyTaxesMonth")}
                </th>

                <th className="px-4 py-3 text-center font-bold print:px-2 print:py-2">
                  {t("mortgageTable.homeownersInsurance")}
                </th>

                <th className="px-4 py-3 text-center font-bold print:px-2 print:py-2">
                  {t("mortgageTable.totalMonthlyPayment")}
                </th>
              </tr>
            </thead>

            <tbody>
              {ranges.map((range, index) => {
                const isPerfectPaymentRange =
                  index === perfectPaymentRangeIndex;

                const rowBackground = isPerfectPaymentRange
                  ? "bg-emerald-100"
                  : index % 2 === 0
                    ? "bg-yellow-50"
                    : "bg-white";

                const highlightedCellBackground = isPerfectPaymentRange
                  ? "bg-emerald-100"
                  : "bg-yellow-100";

                return (
                  <tr
                    key={`${range.priceMin}-${range.priceMax}`}
                    className={`${rowBackground} ${
                      isPerfectPaymentRange
                        ? "border-y-2 border-emerald-600"
                        : ""
                    }`}
                  >
                    <td
                      className={`whitespace-nowrap px-4 py-3 text-center font-bold print:px-2 print:py-2 ${
                        isPerfectPaymentRange
                          ? "bg-emerald-100 text-emerald-950"
                          : "text-red-900"
                      }`}
                    >
                      {fmt$(range.priceMin)} - {fmt$(range.priceMax)}
                    </td>

                    <td
                      className={`whitespace-nowrap px-4 py-3 text-center print:px-2 print:py-2 ${
                        isPerfectPaymentRange
                          ? "bg-emerald-100 font-bold text-emerald-950"
                          : ""
                      }`}
                    >
                      {fmt$2(range.piMin)} - {fmt$2(range.piMax)}
                    </td>

                    <td
                      className={`whitespace-nowrap px-4 py-3 text-center font-bold print:px-2 print:py-2 ${
                        highlightedCellBackground
                      } ${
                        isPerfectPaymentRange
                          ? "text-emerald-950"
                          : "text-red-800"
                      }`}
                    >
                      {fmt$2(range.piDifference)}
                    </td>

                    <td
                      className={`whitespace-nowrap px-4 py-3 text-center print:px-2 print:py-2 ${
                        isPerfectPaymentRange
                          ? "bg-emerald-100 font-bold text-emerald-950"
                          : ""
                      }`}
                    >
                      {fmt$2(range.miMin)} - {fmt$2(range.miMax)}
                    </td>

                    <td
                      className={`whitespace-nowrap px-4 py-3 text-center print:px-2 print:py-2 ${
                        isPerfectPaymentRange
                          ? "bg-emerald-100 font-bold text-emerald-950"
                          : ""
                      }`}
                    >
                      {fmt$2(range.taxMin)} - {fmt$2(range.taxMax)}
                    </td>

                    <td
                      className={`whitespace-nowrap px-4 py-3 text-center print:px-2 print:py-2 ${
                        isPerfectPaymentRange
                          ? "bg-emerald-100 font-bold text-emerald-950"
                          : ""
                      }`}
                    >
                      {fmt$2(range.insuranceMin)} - {fmt$2(range.insuranceMax)}
                    </td>

                    <td
                      className={`whitespace-nowrap px-4 py-3 text-center font-bold print:px-2 print:py-2 ${
                        highlightedCellBackground
                      } ${
                        isPerfectPaymentRange
                          ? "text-emerald-950"
                          : "text-red-900"
                      }`}
                    >
                      {fmt$2(range.totalMin)} - {fmt$2(range.totalMax)}
                      {isPerfectPaymentRange && (
                        <div className="mt-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-800">
                          {t(
                            "mortgageTable.perfectPaymentRange",
                            "Rango de pago ideal",
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center gap-2 border-t-2 border-red-800 bg-gradient-to-r from-yellow-400 to-yellow-500 p-3 text-center">
          <Calculator className="h-5 w-5 shrink-0 text-red-900" />

          <p className="text-sm font-bold text-red-900 md:text-base">
            {t("mortgageTable.formula")}
          </p>
        </div>
      </section>

      <MortgagePdfReport
        reportRef={reportRef}
        summary={summary}
        ranges={ranges}
      />
    </div>
  );
}
