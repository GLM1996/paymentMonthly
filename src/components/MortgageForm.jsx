
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Home,
  DollarSign,
  Calendar,
  Percent,
  PiggyBank,
  Calculator,
  Shield,
  FileText,
} from "lucide-react";

const INITIAL_VALUES = {
  minValue: "200000",
  maxValue: "600000",
  interval: "50000",
  years: "30",
  interestRate: "6.0",
  downPayment: "3.5",
  loanType: "FHA",
  ufmip: "1.75",
  taxes: "0.75",
  insurance: "0.45",
};

/*
 * IMPORTANTE:
 * Este componente debe estar fuera de MortgageForm.
 * Así React no lo recrea en cada pulsación y el input conserva el foco.
 */
function MortgageInput({
  icon: Icon,
  field,
  label,
  value,
  onChange,
  suffix,
  hint,
  step = "any",
  min,
  disabled = false,
}) {
  return (
    <div>
      <label
        htmlFor={field}
        className="mb-0.5 block text-[10px] font-bold text-red-900"
      >
        {Icon && (
          <Icon
            className="mr-0.5 inline h-3 w-3"
            aria-hidden="true"
          />
        )}

        {label}
      </label>

      <div
        className={`flex items-center overflow-hidden rounded-md border-2 transition-colors ${
          disabled
            ? "border-gray-300 bg-gray-100"
            : "border-yellow-500 bg-white focus-within:border-red-700"
        }`}
      >
        <input
          id={field}
          name={field}
          type="number"
          value={value}
          step={step}
          min={min}
          disabled={disabled}
          onChange={(event) => onChange(field, event.target.value)}
          className="w-full bg-transparent px-2 py-1.5 text-sm outline-none disabled:cursor-not-allowed disabled:text-gray-500"
        />

        {suffix && (
          <span className="shrink-0 pr-2 text-xs font-semibold text-gray-500">
            {suffix}
          </span>
        )}
      </div>

      {hint && (
        <p className="mt-0.5 text-[9px] text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
}

export default function MortgageForm({ onCalculate }) {
  const { t } = useTranslation();
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChange = (field, value) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleLoanTypeChange = (loanType) => {
    setValues((currentValues) => ({
      ...currentValues,
      loanType,
      ufmip:
        loanType === "FHA"
          ? currentValues.ufmip || "1.75"
          : "0",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      "minValue",
      "maxValue",
      "interval",
      "years",
      "interestRate",
      "downPayment",
      "taxes",
      "insurance",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => values[field].trim() === "",
    );

    if (hasEmptyField) {
      alert(
        t(
          "mortgageForm.completeRequiredFields",
          "Please complete all required fields.",
        ),
      );
      return;
    }

    const minValue = Number(values.minValue);
    const maxValue = Number(values.maxValue);
    const interval = Number(values.interval);

    if (minValue <= 0) {
      alert(
        t(
          "mortgageForm.invalidMinimumPrice",
          "The minimum price must be greater than zero.",
        ),
      );
      return;
    }

    if (maxValue <= minValue) {
      alert(
        t(
          "mortgageForm.invalidMaximumPrice",
          "The maximum price must be greater than the minimum price.",
        ),
      );
      return;
    }

    if (interval <= 0) {
      alert(
        t(
          "mortgageForm.invalidInterval",
          "The price interval must be greater than zero.",
        ),
      );
      return;
    }

    onCalculate(values);
  };

  const isFha = values.loanType === "FHA";

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl border-2 border-red-800 bg-white p-4 shadow-lg"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-red-800 p-2">
          <Home className="h-5 w-5 text-yellow-400" />
        </div>

        <div>
          <h2 className="text-lg font-bold leading-tight text-red-900">
            {t("mortgageForm.title")}
          </h2>

          <p className="text-[10px] text-gray-600">
            {t("mortgageForm.subtitle")}
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">
        <MortgageInput
          icon={DollarSign}
          field="minValue"
          label={t("mortgageForm.minimumPrice")}
          value={values.minValue}
          onChange={handleChange}
          step="1000"
          min="0"
        />

        <MortgageInput
          icon={DollarSign}
          field="maxValue"
          label={t("mortgageForm.maximumPrice")}
          value={values.maxValue}
          onChange={handleChange}
          step="1000"
          min="0"
        />

        <MortgageInput
          icon={DollarSign}
          field="interval"
          label={t("mortgageForm.priceInterval")}
          value={values.interval}
          onChange={handleChange}
          step="1000"
          min="0"
        />

        <MortgageInput
          icon={Calendar}
          field="years"
          label={t("mortgageForm.loanTerm")}
          value={values.years}
          onChange={handleChange}
          suffix={t("mortgageForm.years")}
          step="1"
          min="1"
        />

        <MortgageInput
          icon={Percent}
          field="interestRate"
          label={t("mortgageForm.interestRate")}
          value={values.interestRate}
          onChange={handleChange}
          suffix="%"
          step="0.01"
          min="0"
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">
        <MortgageInput
          icon={PiggyBank}
          field="downPayment"
          label={t("mortgageForm.downPayment")}
          value={values.downPayment}
          onChange={handleChange}
          suffix="%"
          step="0.01"
          min="0"
        />

        <MortgageInput
          icon={Shield}
          field="ufmip"
          label={t("mortgageForm.upfrontMip")}
          value={values.ufmip}
          onChange={handleChange}
          suffix="%"
          hint={
            isFha
              ? t("mortgageForm.fhaOnly")
              : t("mortgageForm.notApplicable", "Not applicable")
          }
          step="0.01"
          min="0"
          disabled={!isFha}
        />

        <MortgageInput
          icon={FileText}
          field="taxes"
          label={t("mortgageForm.propertyTaxes")}
          value={values.taxes}
          onChange={handleChange}
          suffix="%"
          hint={t("mortgageForm.annualRate")}
          step="0.01"
          min="0"
        />

        <MortgageInput
          icon={Shield}
          field="insurance"
          label={t("mortgageForm.homeownersInsurance")}
          value={values.insurance}
          onChange={handleChange}
          suffix="%"
          hint={t("mortgageForm.annualRate")}
          step="0.01"
          min="0"
        />

        <div>
          <label className="mb-0.5 block text-[10px] font-bold text-red-900">
            {t("mortgageForm.loanType")}
          </label>

          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => handleLoanTypeChange("FHA")}
              aria-pressed={isFha}
              className={`flex-1 cursor-pointer rounded-md py-1.5 text-xs font-bold transition ${
                isFha
                  ? "border-2 border-yellow-500 bg-red-800 text-yellow-400"
                  : "border-2 border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              FHA
            </button>

            <button
              type="button"
              onClick={() => handleLoanTypeChange("CONV")}
              aria-pressed={!isFha}
              className={`flex-1 cursor-pointer rounded-md py-1.5 text-xs font-bold transition ${
                !isFha
                  ? "border-2 border-yellow-500 bg-red-800 text-yellow-400"
                  : "border-2 border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t("mortgageForm.conventional")}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-800 to-red-700 py-2.5 text-sm font-bold text-yellow-400 shadow-lg transition hover:from-red-900 hover:to-red-800"
      >
        <Calculator className="h-4 w-4" />
        {t("mortgageForm.calculate")}
      </button>
    </form>
  );
}
