export function calcMonthlyPI(principal, annualRate, years) {
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (n <= 0 || principal <= 0) return 0;
  if (r === 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * r * f) / (f - 1);
}

export function calcScenarios(values) {
  const min = parseFloat(values.minValue);
  const max = parseFloat(values.maxValue);
  const step = parseFloat(values.interval);
  const years = parseFloat(values.years);
  const rate = parseFloat(values.interestRate);
  const downPct = parseFloat(values.downPayment);
  const loanType = values.loanType;

  const ufmipPct = parseFloat(values.ufmip) || 1.75;
  const taxRate = parseFloat(values.taxes) || 0.75;
  const insuranceRate = parseFloat(values.insurance) || 0.45;

  const results = [];
  let price = min;

  while (price <= max && results.length < 50) {
    const down = price * (downPct / 100);
    const baseLoan = price - down;
    let upfrontMI = loanType === "FHA" ? baseLoan * (ufmipPct / 100) : 0;
    const financed = baseLoan + upfrontMI;

    const monthlyPI = calcMonthlyPI(financed, rate, years);

    const miAnnual =
      loanType === "FHA"
        ? downPct < 10
          ? 0.55
          : 0.5
        : downPct < 20
          ? 0.75
          : 0;
    const monthlyMI = (baseLoan * (miAnnual / 100)) / 12;

    const monthlyTax = (price * (taxRate / 100)) / 12;
    const monthlyInsurance = (price * (insuranceRate / 100)) / 12;

    const totalMonthly = monthlyPI + monthlyMI + monthlyTax + monthlyInsurance;

    results.push({
      price,
      down,
      baseLoan,
      upfrontMI,
      financed,
      monthlyPI,
      monthlyMI,
      monthlyTax,
      monthlyInsurance,
      totalMonthly,
      ltv: (baseLoan / price) * 100,
    });

    price += step;
  }

  return { results, summary: { ...values, scenarios: results.length } };
}

/**
 * Agrupa los resultados en pares consecutivos para mostrar rangos
 * Ej: [200k, 250k, 300k, 350k] → [{min: 200k, max: 250k}, {min: 300k, max: 350k}]
 */
/**
 * Agrupa los resultados en rangos consecutivos (superpuestos)
 * Ej: [200k, 250k, 300k, 350k] → [{200k-250k}, {250k-300k}, {300k-350k}]
 */
export function groupIntoRanges(results) {
  const ranges = [];

  // Iteramos hasta el penúltimo elemento para emparejar con el siguiente
  for (let i = 0; i < results.length - 1; i++) {
    const low = results[i];
    const high = results[i + 1];

    ranges.push({
      priceMin: low.price,
      priceMax: high.price,

      // P&I
      piMin: low.monthlyPI,
      piMax: high.monthlyPI,
      piDifference: high.monthlyPI - low.monthlyPI, // Diferencia entre los dos

      // Otros componentes
      miMin: low.monthlyMI,
      miMax: high.monthlyMI,
      taxMin: low.monthlyTax,
      taxMax: high.monthlyTax,
      insuranceMin: low.monthlyInsurance,
      insuranceMax: high.monthlyInsurance,

      // Total
      totalMin: low.totalMonthly,
      totalMax: high.totalMonthly,
      totalDifference: high.totalMonthly - low.totalMonthly,
    });
  }

  return ranges;
}

export const fmt$ = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const fmt$2 = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

export const fmtPct = (n) => `${n.toFixed(2)}%`;
