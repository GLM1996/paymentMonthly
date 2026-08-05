import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Calculator,
  ChartNoAxesColumnIncreasing,
  CircleHelp,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const INITIAL_VALUES = {
  minValue: "200000",
  maxValue: "600000",
  interval: "50000",
  years: "30",
  interestRate: "6.0",

  downPayment: "3.5",
  downPaymentMode: "percent",

  loanType: "FHA",

  ufmip: "1.75",
  ufmipMode: "percent",

  fhaMip: "0.55",
  fhaMipMode: "percent",

  conventionalPmi: "0.50",
  conventionalPmiMode: "percent",

  taxes: "0.75",
  taxesMode: "percent",

  insurance: "0.45",
  insuranceMode: "percent",
};

function ValueModeSelector({
  mode,
  onChange,
  disabled = false,
}) {
  return (
    <div className="flex shrink-0 border-l border-[#ddc798] bg-[#fffaf0]">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("amount")}
        aria-pressed={mode === "amount"}
        className={`min-w-8 cursor-pointer px-2 py-2 text-[10px] font-bold transition ${
          mode === "amount"
            ? "bg-[#8d060d] text-white"
            : "text-[#725c3b] hover:bg-[#f5ead2]"
        } disabled:cursor-not-allowed disabled:opacity-50`}
      >
        $
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("percent")}
        aria-pressed={mode === "percent"}
        className={`min-w-8 cursor-pointer px-2 py-2 text-[10px] font-bold transition ${
          mode === "percent"
            ? "bg-[#8d060d] text-white"
            : "text-[#725c3b] hover:bg-[#f5ead2]"
        } disabled:cursor-not-allowed disabled:opacity-50`}
      >
        %
      </button>
    </div>
  );
}

function MortgageInput({
  field,
  label,
  value,
  onChange,
  hint,
  step = "any",
  min,
  max,
  disabled = false,
  mode,
  onModeChange,
  prefix,
  suffix,
}) {
  const supportsModes =
    mode === "percent" || mode === "amount";

  const currentPrefix = supportsModes
    ? mode === "amount"
      ? "$"
      : null
    : prefix;

  const currentSuffix = supportsModes
    ? mode === "percent"
      ? "%"
      : null
    : suffix;

  return (
    <div className="min-w-0">
      <label
        htmlFor={field}
        className="mb-1 flex min-h-4 items-center gap-1 text-[10px] font-bold text-[#3d332b]"
      >
        <span>{label}</span>

        {hint && (
          <span
            title={hint}
            className="inline-flex shrink-0 text-[#b5965c]"
          >
            <CircleHelp
              className="h-3 w-3"
              strokeWidth={2}
              aria-hidden="true"
            />
          </span>
        )}
      </label>

      <div
        className={`flex min-h-9 items-center overflow-hidden rounded-md border shadow-[inset_0_1px_2px_rgba(72,45,15,0.06)] transition ${
          disabled
            ? "border-[#ddd7ca] bg-[#f3f1eb]"
            : "border-[#dfc896] bg-white focus-within:border-[#a87424] focus-within:ring-2 focus-within:ring-[#d4aa62]/20"
        }`}
      >
        {currentPrefix && (
          <span className="pl-3 text-xs font-bold text-[#4a4037]">
            {currentPrefix}
          </span>
        )}

        <input
          id={field}
          name={field}
          type="number"
          value={value}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          onChange={(event) =>
            onChange(field, event.target.value)
          }
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-xs font-semibold text-[#4b423a] outline-none disabled:cursor-not-allowed disabled:text-[#99958b]"
        />

        {currentSuffix && (
          <span className="pr-3 text-xs font-bold text-[#4a4037]">
            {currentSuffix}
          </span>
        )}

        {supportsModes && (
          <ValueModeSelector
            mode={mode}
            disabled={disabled}
            onChange={(newMode) =>
              onModeChange(field, newMode)
            }
          />
        )}
      </div>
    </div>
  );
}

function LoanTypeSelector({
  isFha,
  onChange,
  conventionalLabel,
  label,
}) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-bold text-[#3d332b]">
        {label}
      </p>

      <div className="grid grid-cols-2 overflow-hidden rounded-md border border-[#d8c398] bg-white p-1">
        <button
          type="button"
          onClick={() => onChange("FHA")}
          aria-pressed={isFha}
          className={`cursor-pointer rounded px-3 py-1.5 text-[10px] font-bold transition ${
            isFha
              ? "bg-gradient-to-r from-[#76040a] to-[#a00910] text-white shadow-sm"
              : "text-[#433a33] hover:bg-[#faf5eb]"
          }`}
        >
          FHA
        </button>

        <button
          type="button"
          onClick={() => onChange("CONV")}
          aria-pressed={!isFha}
          className={`cursor-pointer rounded px-3 py-1.5 text-[10px] font-bold transition ${
            !isFha
              ? "bg-gradient-to-r from-[#76040a] to-[#a00910] text-white shadow-sm"
              : "text-[#433a33] hover:bg-[#faf5eb]"
          }`}
        >
          {conventionalLabel}
        </button>
      </div>
    </div>
  );
}

function CalculatorBenefits() {
  const benefits = [
    {
      icon: ChartNoAxesColumnIncreasing,
      text: "Compara pagos por rango de precio",
    },
    {
      icon: TrendingUp,
      text: "Muestra la diferencia entre un rango y otro",
    },
    {
      icon: PieChart,
      text: "Desglosa qué compone el pago mensual",
    },
    {
      icon: Users,
      text: "Le ayuda a decidir cuánto desea sacrificar o ahorrar",
    },
  ];

  return (
    <aside className="h-full rounded-xl border border-[#e6dcc9] bg-[#fffaf1] px-5 py-5 shadow-sm">
      <h3 className="text-sm font-extrabold uppercase text-[#6e1719]">
        ¿Qué hace esta calculadora?
      </h3>

      <div className="mt-5 space-y-5">
        {benefits.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-start gap-3"
          >
            <Icon
              className="mt-0.5 h-7 w-7 shrink-0 text-[#7f1619]"
              strokeWidth={1.9}
              aria-hidden="true"
            />

            <p className="text-xs font-semibold leading-5 text-[#493f37]">
              {text}
            </p>
          </div>
        ))}
      </div>

      <div className="my-5 border-t border-[#d9bd83]" />

      <div className="flex items-start gap-3">
        <ShieldCheck
          className="mt-0.5 h-7 w-7 shrink-0 text-[#7f1619]"
          strokeWidth={1.9}
          aria-hidden="true"
        />

        <p className="text-xs font-semibold leading-5 text-[#493f37]">
          El pago mensual no lo define el realtor; depende del
          precio, el préstamo, la tasa, los impuestos, el seguro
          y el PMI/MIP.
        </p>
      </div>
    </aside>
  );
}

export default function MortgageForm({ onCalculate }) {
  const { t } = useTranslation();
  const [values, setValues] = useState(INITIAL_VALUES);

  const initialCalculationRef = useRef(false);

  useEffect(() => {
    if (
      initialCalculationRef.current ||
      typeof onCalculate !== "function"
    ) {
      return;
    }

    initialCalculationRef.current = true;

    onCalculate({
      ...INITIAL_VALUES,
    });
  }, [onCalculate]);

  const handleChange = (field, value) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  };

  const handleModeChange = (field, mode) => {
    setValues((currentValues) => ({
      ...currentValues,
      [`${field}Mode`]: mode,
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

      fhaMip:
        loanType === "FHA"
          ? currentValues.fhaMip || "0.55"
          : "0",

      conventionalPmi:
        loanType === "CONV"
          ? currentValues.conventionalPmi || "0.50"
          : currentValues.conventionalPmi,
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

    if (values.loanType === "FHA") {
      requiredFields.push("ufmip", "fhaMip");
    }

    const minimumPrice =
      Number(values.minValue) || 0;

    const effectiveDownPaymentPercent =
      values.downPaymentMode === "percent"
        ? Number(values.downPayment) || 0
        : minimumPrice > 0
          ? ((Number(values.downPayment) || 0) /
              minimumPrice) *
            100
          : 0;

    const conventionalRequiresPmi =
      values.loanType === "CONV" &&
      effectiveDownPaymentPercent < 20;

    if (conventionalRequiresPmi) {
      requiredFields.push("conventionalPmi");
    }

    const hasEmptyField = requiredFields.some(
      (field) =>
        String(values[field] ?? "").trim() === "",
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
    const years = Number(values.years);
    const interestRate = Number(values.interestRate);

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

    if (years <= 0) {
      alert(
        t(
          "mortgageForm.invalidYears",
          "The loan term must be greater than zero.",
        ),
      );

      return;
    }

    if (interestRate < 0) {
      alert(
        t(
          "mortgageForm.invalidInterestRate",
          "The interest rate cannot be negative.",
        ),
      );

      return;
    }

    const percentageOrAmountFields = [
      ["downPayment", "downPaymentMode"],
      ["ufmip", "ufmipMode"],
      ["fhaMip", "fhaMipMode"],
      ["conventionalPmi", "conventionalPmiMode"],
      ["taxes", "taxesMode"],
      ["insurance", "insuranceMode"],
    ];

    const invalidPercentage =
      percentageOrAmountFields.some(
        ([field, modeField]) =>
          values[modeField] === "percent" &&
          (Number(values[field]) < 0 ||
            Number(values[field]) >= 100),
      );

    if (invalidPercentage) {
      alert(
        t(
          "mortgageForm.invalidPercentage",
          "Percentage values must be between 0% and 99.99%.",
        ),
      );

      return;
    }

    const invalidAmount =
      percentageOrAmountFields.some(
        ([field, modeField]) =>
          values[modeField] === "amount" &&
          Number(values[field]) < 0,
      );

    if (invalidAmount) {
      alert(
        t(
          "mortgageForm.invalidAmount",
          "Dollar amounts cannot be negative.",
        ),
      );

      return;
    }

    onCalculate({
      ...values,

      ufmip:
        values.loanType === "FHA"
          ? values.ufmip
          : "0",

      fhaMip:
        values.loanType === "FHA"
          ? values.fhaMip
          : "0",

      conventionalPmi:
        values.loanType === "CONV" &&
        conventionalRequiresPmi
          ? values.conventionalPmi
          : "0",
    });
  };

  const isFha = values.loanType === "FHA";

  const minimumPrice =
    Number(values.minValue) || 0;

  const downPaymentPercent =
    values.downPaymentMode === "percent"
      ? Number(values.downPayment) || 0
      : minimumPrice > 0
        ? ((Number(values.downPayment) || 0) /
            minimumPrice) *
          100
        : 0;

  const requiresConventionalPmi =
    !isFha && downPaymentPercent < 20;

  return (
    <div className="grid w-full grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_305px]">
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-[#e0d4bd] bg-white shadow-sm"
      >
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#760309] to-[#a1070e] px-5 py-3 text-white">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#b71a1f] text-[#f0c868]">
            <Calculator
              className="h-5 w-5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wide">
              {t(
                "mortgageForm.stepTitle",
                "1. Ingrese sus datos",
              )}
            </h2>

            <p className="mt-0.5 text-[10px] text-[#f6ddd4]">
              {t(
                "mortgageForm.stepSubtitle",
                "Ajuste estos valores y vea el desglose estimado de su pago mensual",
              )}
            </p>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3 max-w-[325px]">
            <LoanTypeSelector
              isFha={isFha}
              onChange={handleLoanTypeChange}
              label={t(
                "mortgageForm.loanType",
                "Tipo de préstamo",
              )}
              conventionalLabel={t(
                "mortgageForm.conventional",
                "Convencional",
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            <MortgageInput
              field="minValue"
              label={t(
                "mortgageForm.minimumPrice",
                "Precio mínimo",
              )}
              value={values.minValue}
              onChange={handleChange}
              prefix="$"
              hint={t(
                "mortgageForm.minimumPriceHint",
                "Precio mínimo del rango",
              )}
              step="1000"
              min="0"
            />

            <MortgageInput
              field="maxValue"
              label={t(
                "mortgageForm.maximumPrice",
                "Precio máximo",
              )}
              value={values.maxValue}
              onChange={handleChange}
              prefix="$"
              hint={t(
                "mortgageForm.maximumPriceHint",
                "Precio máximo del rango",
              )}
              step="1000"
              min="0"
            />

            <MortgageInput
              field="interval"
              label={t(
                "mortgageForm.priceInterval",
                "Intervalo de precio",
              )}
              value={values.interval}
              onChange={handleChange}
              prefix="$"
              hint={t(
                "mortgageForm.priceIntervalHint",
                "Diferencia entre cada escenario",
              )}
              step="1000"
              min="0"
            />

            <MortgageInput
              field="years"
              label={t(
                "mortgageForm.loanTerm",
                "Plazo del préstamo",
              )}
              value={values.years}
              onChange={handleChange}
              hint={t(
                "mortgageForm.loanTermHint",
                "Duración total del préstamo",
              )}
              step="1"
              min="1"
            />

            <MortgageInput
              field="interestRate"
              label={t(
                "mortgageForm.interestRate",
                "Tasa de interés",
              )}
              value={values.interestRate}
              onChange={handleChange}
              suffix="%"
              hint={t(
                "mortgageForm.interestRateHint",
                "Tasa anual estimada",
              )}
              step="0.01"
              min="0"
            />

            <MortgageInput
              field="downPayment"
              label={t(
                "mortgageForm.downPayment",
                "Pago inicial",
              )}
              value={values.downPayment}
              onChange={handleChange}
              mode={values.downPaymentMode}
              onModeChange={handleModeChange}
              hint={t(
                "mortgageForm.amountOrPercentageHint",
                "Selecciona porcentaje o cantidad en dólares.",
              )}
              step={
                values.downPaymentMode === "percent"
                  ? "0.01"
                  : "100"
              }
              min="0"
            />

            {isFha ? (
              <MortgageInput
                field="ufmip"
                label={t(
                  "mortgageForm.upfrontMip",
                  "MIP inicial FHA",
                )}
                value={values.ufmip}
                onChange={handleChange}
                mode={values.ufmipMode}
                onModeChange={handleModeChange}
                hint={t(
                  "mortgageForm.ufmipAmountHint",
                  "Porcentaje del préstamo base o cantidad inicial fija.",
                )}
                step={
                  values.ufmipMode === "percent"
                    ? "0.01"
                    : "100"
                }
                min="0"
              />
            ) : (
              <MortgageInput
                field="conventionalPmi"
                label={t(
                  "mortgageForm.conventionalPmi",
                  "PMI anual",
                )}
                value={
                  requiresConventionalPmi
                    ? values.conventionalPmi
                    : "0"
                }
                onChange={handleChange}
                mode={values.conventionalPmiMode}
                onModeChange={handleModeChange}
                hint={
                  requiresConventionalPmi
                    ? t(
                        "mortgageForm.pmiAmountHint",
                        "Porcentaje anual o cantidad anual fija de PMI.",
                      )
                    : t(
                        "mortgageForm.noPmiRequired",
                        "El PMI no es necesario con un pago inicial del 20% o más.",
                      )
                }
                step={
                  values.conventionalPmiMode === "percent"
                    ? "0.01"
                    : "100"
                }
                min="0"
                disabled={!requiresConventionalPmi}
              />
            )}

            {isFha ? (
              <MortgageInput
                field="fhaMip"
                label={t(
                  "mortgageForm.monthlyMip",
                  "MIP anual FHA",
                )}
                value={values.fhaMip}
                onChange={handleChange}
                mode={values.fhaMipMode}
                onModeChange={handleModeChange}
                hint={t(
                  "mortgageForm.mipAmountHint",
                  "Porcentaje anual o cantidad anual fija de MIP.",
                )}
                step={
                  values.fhaMipMode === "percent"
                    ? "0.01"
                    : "100"
                }
                min="0"
              />
            ) : (
              <MortgageInput
                field="taxes"
                label={t(
                  "mortgageForm.propertyTaxes",
                  "Impuestos de propiedad",
                )}
                value={values.taxes}
                onChange={handleChange}
                mode={values.taxesMode}
                onModeChange={handleModeChange}
                hint={t(
                  "mortgageForm.taxesAmountHint",
                  "Porcentaje anual o cantidad anual fija de impuestos.",
                )}
                step={
                  values.taxesMode === "percent"
                    ? "0.01"
                    : "100"
                }
                min="0"
              />
            )}

            {isFha ? (
              <MortgageInput
                field="taxes"
                label={t(
                  "mortgageForm.propertyTaxes",
                  "Impuestos de propiedad",
                )}
                value={values.taxes}
                onChange={handleChange}
                mode={values.taxesMode}
                onModeChange={handleModeChange}
                hint={t(
                  "mortgageForm.taxesAmountHint",
                  "Porcentaje anual o cantidad anual fija de impuestos.",
                )}
                step={
                  values.taxesMode === "percent"
                    ? "0.01"
                    : "100"
                }
                min="0"
              />
            ) : (
              <MortgageInput
                field="insurance"
                label={t(
                  "mortgageForm.homeownersInsurance",
                  "Seguro de propietario",
                )}
                value={values.insurance}
                onChange={handleChange}
                mode={values.insuranceMode}
                onModeChange={handleModeChange}
                hint={t(
                  "mortgageForm.insuranceAmountHint",
                  "Porcentaje anual o prima anual fija.",
                )}
                step={
                  values.insuranceMode === "percent"
                    ? "0.01"
                    : "100"
                }
                min="0"
              />
            )}

            {isFha && (
              <MortgageInput
                field="insurance"
                label={t(
                  "mortgageForm.homeownersInsurance",
                  "Seguro de propietario",
                )}
                value={values.insurance}
                onChange={handleChange}
                mode={values.insuranceMode}
                onModeChange={handleModeChange}
                hint={t(
                  "mortgageForm.insuranceAmountHint",
                  "Porcentaje anual o prima anual fija.",
                )}
                step={
                  values.insuranceMode === "percent"
                    ? "0.01"
                    : "100"
                }
                min="0"
              />
            )}
          </div>

          <button
            type="submit"
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#790309] via-[#97070d] to-[#790309] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-[#8d060d]/20"
          >
            <Calculator
              className="h-4 w-4 text-[#e7c365]"
              strokeWidth={2}
              aria-hidden="true"
            />

            {t(
              "mortgageForm.calculate",
              "Calcular pago hipotecario",
            )}
          </button>
        </div>
      </form>

      <CalculatorBenefits />
    </div>
  );
}