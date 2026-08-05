export function calcMonthlyPI(
  principal,
  annualRate,
  years,
) {
  const numberOfPayments = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  if (
    numberOfPayments <= 0 ||
    principal <= 0
  ) {
    return 0;
  }

  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }

  const factor = Math.pow(
    1 + monthlyRate,
    numberOfPayments,
  );

  return (
    (principal * monthlyRate * factor) /
    (factor - 1)
  );
}

function getValueByMode({
  value,
  mode,
  percentageBase,
}) {
  const numericValue =
    Number.parseFloat(value) || 0;

  if (mode === "amount") {
    return numericValue;
  }

  return percentageBase * (numericValue / 100);
}

function getEffectivePercentage({
  amount,
  percentageBase,
}) {
  if (percentageBase <= 0) return 0;

  return (amount / percentageBase) * 100;
}

export function calcScenarios(values) {
  const min = Number.parseFloat(values.minValue);
  const max = Number.parseFloat(values.maxValue);
  const step = Number.parseFloat(values.interval);
  const years = Number.parseFloat(values.years);
  const rate = Number.parseFloat(
    values.interestRate,
  );

  const loanType = values.loanType;

  const taxValue =
    Number.parseFloat(values.taxes) || 0;

  const insuranceValue =
    Number.parseFloat(values.insurance) || 0;

  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    !Number.isFinite(step) ||
    !Number.isFinite(years) ||
    !Number.isFinite(rate) ||
    min <= 0 ||
    max < min ||
    step <= 0 ||
    years <= 0 ||
    rate < 0
  ) {
    return {
      results: [],
      summary: {
        ...values,
        scenarios: 0,
      },
    };
  }

  const results = [];
  let price = min;

  while (
    price <= max &&
    results.length < 50
  ) {
    const down = getValueByMode({
      value: values.downPayment,
      mode: values.downPaymentMode,
      percentageBase: price,
    });

    const safeDown = Math.min(
      Math.max(down, 0),
      price,
    );

    const downPct =
      getEffectivePercentage({
        amount: safeDown,
        percentageBase: price,
      });

    const baseLoan = Math.max(
      price - safeDown,
      0,
    );

    const upfrontMI =
      loanType === "FHA"
        ? getValueByMode({
            value: values.ufmip,
            mode: values.ufmipMode,
            percentageBase: baseLoan,
          })
        : 0;

    const financed =
      baseLoan + upfrontMI;

    const monthlyPI = calcMonthlyPI(
      financed,
      rate,
      years,
    );

    let annualMortgageInsurance = 0;

    if (loanType === "FHA") {
      annualMortgageInsurance =
        getValueByMode({
          value: values.fhaMip,
          mode: values.fhaMipMode,
          percentageBase: baseLoan,
        });
    }

    if (
      loanType === "CONV" &&
      downPct < 20
    ) {
      annualMortgageInsurance =
        getValueByMode({
          value: values.conventionalPmi,
          mode: values.conventionalPmiMode,
          percentageBase: baseLoan,
        });
    }

    const monthlyMI =
      annualMortgageInsurance / 12;

    const annualTaxes =
      values.taxesMode === "amount"
        ? taxValue
        : price * (taxValue / 100);

    const monthlyTax = annualTaxes / 12;

    const annualInsurance =
      values.insuranceMode === "amount"
        ? insuranceValue
        : price * (insuranceValue / 100);

    const monthlyInsurance =
      annualInsurance / 12;

    const totalMonthly =
      monthlyPI +
      monthlyMI +
      monthlyTax +
      monthlyInsurance;

    results.push({
      price,
      down: safeDown,
      downPct,
      baseLoan,
      upfrontMI,
      financed,
      monthlyPI,
      monthlyMI,
      monthlyTax,
      monthlyInsurance,
      totalMonthly,
      annualMortgageInsurance,
      annualTaxes,
      annualInsurance,
      ltv:
        price > 0
          ? (baseLoan / price) * 100
          : 0,
    });

    price += step;
  }

  return {
    results,

    summary: {
      ...values,

      downPaymentEffectivePercent:
        results[0]?.downPct || 0,

      ufmip:
        loanType === "FHA"
          ? values.ufmip
          : "0",

      fhaMip:
        loanType === "FHA"
          ? values.fhaMip
          : "0",

      conventionalPmi:
        loanType === "CONV"
          ? values.conventionalPmi
          : "0",

      scenarios: results.length,
    },
  };
}

export function groupIntoRanges(results) {
  const ranges = [];

  if (
    !Array.isArray(results) ||
    results.length < 2
  ) {
    return ranges;
  }

  for (
    let index = 0;
    index < results.length - 1;
    index += 1
  ) {
    const low = results[index];
    const high = results[index + 1];

    ranges.push({
      priceMin: low.price,
      priceMax: high.price,

      piMin: low.monthlyPI,
      piMax: high.monthlyPI,
      piDifference:
        high.monthlyPI - low.monthlyPI,

      miMin: low.monthlyMI,
      miMax: high.monthlyMI,

      taxMin: low.monthlyTax,
      taxMax: high.monthlyTax,

      insuranceMin:
        low.monthlyInsurance,

      insuranceMax:
        high.monthlyInsurance,

      totalMin: low.totalMonthly,
      totalMax: high.totalMonthly,

      totalDifference:
        high.totalMonthly -
        low.totalMonthly,
    });
  }

  return ranges;
}

export const fmt$ = (number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(number) || 0);

export const fmt$2 = (number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(number) || 0);

export const fmtPct = (number) =>
  `${(Number(number) || 0).toFixed(2)}%`;