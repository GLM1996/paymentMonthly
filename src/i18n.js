import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      common: {
        english: "English",
        spanish: "Spanish",
        downloadPdf: "Download PDF",
        generatingPdf: "Generating PDF...",
        print: "Print",
      },

      mortgageForm: {
        title: "Mortgage Calculation Parameters",
        subtitle: "Define the price range and loan terms",
        minimumPrice: "Minimum Price",
        maximumPrice: "Maximum Price",
        priceInterval: "Price Interval",
        loanTerm: "Loan Term",
        years: "years",
        interestRate: "Interest Rate",
        downPayment: "Down Payment",
        upfrontMip: "Upfront MIP",
        fhaOnly: "FHA loans only",
        propertyTaxes: "Property Taxes",
        annualRate: "Annual rate",
        homeownersInsurance: "Homeowners Insurance",
        loanType: "Loan Type",
        conventional: "CONV",
        calculate: "Calculate Mortgage Payment",
      },

      mortgageTable: {
        empty: "Complete the form to view the results",

        fixedRate: "Fixed Rate",
        loanTerm: "Loan Term",
        upfrontMip: "Upfront MIP",
        annualTaxes: "Annual Taxes",
        annualInsurance: "Annual Insurance",

        purchasePriceRange: "PURCHASE PRICE RANGE",
        principalInterest: "PRINCIPAL AND INTEREST (P&I)",
        piDifference: "P&I DIFFERENCE",
        mortgageInsurance: "MORTGAGE INSURANCE (MIP/PMI)",
        propertyTaxesMonth: "PROPERTY TAXES / MONTH",
        homeownersInsurance: "HOMEOWNERS INSURANCE",
        totalMonthlyPayment: "TOTAL MONTHLY PAYMENT",

        formula:
          "TOTAL MONTHLY PAYMENT = P&I + MIP/PMI + Property Taxes + Homeowners Insurance",

        importantNotes: "Important notes:",
        noteEstimates:
          "All figures are estimates and are provided for educational purposes only.",
        noteDifference:
          "P&I and FHA MIP were calculated using an FHA loan with a {{downPayment}}% down payment, {{interestRate}}% fixed interest rate, {{years}}-year loan term, and {{ufmip}}% financed UFMIP.",

        noteTaxes:
          "Property taxes are estimated using {{taxes}}% annually of the purchase price.",

        noteInsurance:
          "Homeowners insurance is estimated using {{insurance}}% annually of the purchase price. Actual premiums vary based on the property, coverage, and buyer profile.",
        noteHoa: "HOA dues are not included.",
        noteLender:
          "Always confirm the exact monthly payment with your lender.",

        pdfError: "The PDF could not be generated.",
        emptyCapture: "The generated capture is empty.",
      },

      header: {
        eyebrow: "Las Vegas Home Financing",
        title: "Estimated Monthly Payment",
        subtitle: "By Purchase Price Range",
        location: "Las Vegas, NV",
        description:
          "Educational illustration to help understand how the monthly payment changes based on the purchase price.",
        disclaimer: "Illustrative calculation — not a quote",
        logoAlt: "Company logo",
      },
    },
  },

  es: {
    translation: {
      common: {
        english: "Inglés",
        spanish: "Español",
        downloadPdf: "Descargar PDF",
        generatingPdf: "Generando PDF...",
        print: "Imprimir",
      },

      mortgageForm: {
        title: "Parámetros del cálculo hipotecario",
        subtitle: "Define el rango de precios y las condiciones del préstamo",
        minimumPrice: "Precio mínimo",
        maximumPrice: "Precio máximo",
        priceInterval: "Intervalo de precio",
        loanTerm: "Plazo del préstamo",
        years: "años",
        interestRate: "Tasa de interés",
        downPayment: "Pago inicial",
        upfrontMip: "MIP inicial",
        fhaOnly: "Solo para préstamos FHA",
        propertyTaxes: "Impuestos de propiedad",
        annualRate: "Tasa anual",
        homeownersInsurance: "Seguro de propietario",
        loanType: "Tipo de préstamo",
        conventional: "CONV",
        calculate: "Calcular pago hipotecario",
      },

      mortgageTable: {
        empty: "Completa el formulario para ver los resultados",

        fixedRate: "Tasa fija",
        loanTerm: "Plazo",
        upfrontMip: "MIP inicial",
        annualTaxes: "Impuestos anuales",
        annualInsurance: "Seguro anual",

        purchasePriceRange: "RANGO DE PRECIO",
        principalInterest: "PRINCIPAL E INTERÉS (P&I)",
        piDifference: "DIFERENCIAL P&I",
        mortgageInsurance: "SEGURO HIPOTECARIO (MIP/PMI)",
        propertyTaxesMonth: "IMPUESTOS / MES",
        homeownersInsurance: "SEGURO DE PROPIETARIO",
        totalMonthlyPayment: "PAGO MENSUAL TOTAL",

        formula:
          "PAGO MENSUAL TOTAL = P&I + MIP/PMI + Impuestos + Seguro de propietario",

        importantNotes: "Notas importantes:",
        noteEstimates:
          "Todas las cifras son estimaciones y se proporcionan únicamente con fines educativos.",

        noteDifference:
          "El P&I y el MIP de FHA se calcularon utilizando un préstamo FHA con un pago inicial del {{downPayment}}%, una tasa de interés fija del {{interestRate}}%, un plazo de {{years}} años y un UFMIP financiado del {{ufmip}}%.",

        noteTaxes:
          "Los impuestos sobre la propiedad se estiman utilizando el {{taxes}}% anual del precio de compra.",

        noteInsurance:
          "El seguro de propietario se estima utilizando el {{insurance}}% anual del precio de compra. Las primas reales varían según la propiedad, la cobertura y el perfil del comprador.",
        noteHoa: "Las cuotas de la HOA no están incluidas.",

        noteLender:
          "Confirma siempre el pago mensual exacto con tu prestamista.",

        pdfError: "No se pudo generar el PDF.",
        emptyCapture: "La captura generada está vacía.",
      },

      header: {
        eyebrow: "Financiamiento de viviendas en Las Vegas",
        title: "Pago mensual estimado",
        subtitle: "Por rango de precio de compra",
        location: "Las Vegas, NV",
        description:
          "Ilustración educativa para entender cómo cambia el pago mensual según el precio de compra.",
        disclaimer: "Cálculo ilustrativo — no constituye una cotización",
        logoAlt: "Logotipo de la empresa",
      },
    },
  },
};

const savedLanguage = localStorage.getItem("mortgageLanguage") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
