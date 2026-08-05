import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/*
 * Mortgage Payment Comparison by Home Price
 * Comparador de pagos hipotecarios según el precio de la vivienda
 */

const resources = {
  en: {
    translation: {
      headerApp: {
        title: "Estimated Monthly Payment",
        subtitle: "By Purchase Price Range",
        helpText: "If you need help using the calculator, call us at:",
        logoAlt: "Juan Carlos Carrera Realtors logo",
      },

      mortgageHero: {
        eyebrow: "Educational Mortgage Payment Calculator",
        title: "Mortgage Payment Comparison by Home Price",
        description:
          "Discover how your monthly payment changes based on the home price, interest rate, down payment, and other costs. Compare price ranges and understand how much your payment may increase or decrease before making a decision.",
        educationalTool: "Educational tool",
        notOfficialQuote: "Not an official quote",
        logoAlt: "Juan Carlos Carrera Realtors",
        objectiveTitle: "Purpose of this calculator",
        objectiveDescription:
          "Help you understand how the monthly payment is calculated and how much it changes when the price of a home increases or decreases.",
      },

      common: {
        english: "English",
        spanish: "Spanish",
        downloadPdf: "Download PDF",
        generatingPdf: "Generating PDF...",
        print: "Print",
      },

      resultsSection: {
        title: "2. Estimated Results by Price Range",
        subtitle:
          "After entering your information, you will see how your estimated monthly payment changes.",
        noteBefore: "The",
        differentialLabel: "“P&I Difference”",
        noteAfter:
          "column helps you see how much the base payment increases from one price range to the next.",
      },

      mortgageForm: {
        stepTitle: "1. Enter Your Information",
        stepSubtitle:
          "Adjust these values to view the estimated breakdown of your monthly payment.",

        loanType: "Loan Type",
        conventional: "Conventional",

        minimumPrice: "Minimum Price",
        minimumPriceHint: "Minimum price in the comparison range",

        maximumPrice: "Maximum Price",
        maximumPriceHint: "Maximum price in the comparison range",

        priceInterval: "Price Interval",
        priceIntervalHint: "Difference between each calculated scenario",

        loanTerm: "Loan Term",
        loanTermHint: "Total duration of the loan",

        interestRate: "Interest Rate",
        interestRateHint: "Estimated annual interest rate",

        downPayment: "Down Payment",
        amountOrPercentageHint: "Choose a percentage or a dollar amount.",

        upfrontMip: "Upfront FHA MIP",
        ufmipAmountHint:
          "Percentage of the base loan or a fixed upfront amount.",

        monthlyMip: "Annual FHA MIP",
        mipAmountHint: "Annual percentage or fixed annual MIP amount.",

        conventionalPmi: "Annual PMI",
        pmiAmountHint: "Annual percentage or fixed annual PMI amount.",

        noPmiRequired:
          "PMI is not required with a down payment of 20% or more.",

        propertyTaxes: "Property Taxes",
        taxesAmountHint:
          "Annual percentage or fixed annual property tax amount.",

        homeownersInsurance: "Homeowners Insurance",
        insuranceAmountHint:
          "Annual percentage or fixed annual insurance premium.",

        calculate: "Calculate Mortgage Payment",

        completeRequiredFields: "Please complete all required fields.",
        invalidMinimumPrice: "The minimum price must be greater than zero.",
        invalidMaximumPrice:
          "The maximum price must be greater than the minimum price.",
        invalidInterval: "The price interval must be greater than zero.",
        invalidYears: "The loan term must be greater than zero.",
        invalidInterestRate: "The interest rate cannot be negative.",
        invalidPercentage: "Percentage values must be between 0% and 99.99%.",
        invalidAmount: "Dollar amounts cannot be negative.",
      },

      calculatorBenefits: {
        title: "What Does This Calculator Do?",
        comparePayments: "Compares payments across different price ranges",
        showDifference:
          "Shows the difference between one price range and the next",
        paymentBreakdown: "Breaks down the components of the monthly payment",
        helpDecision: "Helps you decide how much you may want to spend or save",
        disclaimer:
          "The monthly payment is not determined by the realtor; it depends on the price, loan, interest rate, property taxes, homeowners insurance, and PMI or MIP.",
      },

      mortgageTable: {
        empty: "Complete the form to view the results",

        fixedRate: "Fixed Rate",
        loanTerm: "Loan Term",
        upfrontMip: "Upfront MIP",
        annualTaxes: "Annual Taxes",
        annualInsurance: "Annual Insurance",

        annualFhaMip: "Annual FHA MIP",
        annualPmi: "Annual PMI",
        noPmi: "PMI",
        notApplicable: "N/A",
        perYear: "per year",
        effectiveDownPayment: "Effective down payment",

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

        noteDifferenceFha:
          "P&I and FHA mortgage insurance were calculated using an FHA loan with a {{downPayment}} down payment, {{interestRate}} fixed interest rate, {{years}}-year term, {{ufmip}} financed UFMIP, and {{mip}} annual MIP.",

        noteDifferenceConventional:
          "P&I and mortgage insurance were calculated using a conventional loan with a {{downPayment}} down payment, {{interestRate}} fixed interest rate, {{years}}-year term, and {{pmi}} annual PMI when applicable.",

        noteTaxesPercent:
          "Property taxes are estimated using {{taxes}} annually of the purchase price.",

        noteTaxesAmount:
          "Property taxes are estimated using a fixed annual amount of {{taxes}}.",

        noteInsurancePercent:
          "Homeowners insurance is estimated using {{insurance}} annually of the purchase price. Actual premiums may vary based on the property, coverage, and buyer profile.",

        noteInsuranceAmount:
          "Homeowners insurance is estimated using a fixed annual premium of {{insurance}}. Actual premiums may vary based on the property, coverage, and buyer profile.",

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
        location: "",
        description:
          "Educational illustration to help understand how the monthly payment changes based on the purchase price.",
        disclaimer: "Illustrative calculation — not a quote",
        logoAlt: "Company logo",
      },

      mortgageFooter: {
        composition: {
          title: "How Is My Monthly Mortgage Payment Composed?",
          description:
            "Your monthly payment does not only include the loan payment. It may also include property taxes, homeowners insurance, mortgage insurance, and, in some cases, HOA dues.",
        },

        paymentParts: {
          principal: {
            shortLabel: "Principal",
            title: "What Is Principal?",
            description:
              "It is the portion of the loan balance that you are actually paying down.",
          },

          interest: {
            shortLabel: "Interest",
            title: "What Is Mortgage Interest?",
            description:
              "It is the cost charged by the lender for borrowing the money.",
          },

          taxes: {
            shortLabel: "Taxes",
            title: "What Are Property Taxes?",
            description:
              "They are property taxes charged by the county or local government.",
          },

          insurance: {
            shortLabel: "Insurance",
            title: "What Is Homeowners Insurance?",
            description:
              "It is the insurance policy that protects your home against certain types of damage.",
          },

          mortgageInsurance: {
            shortLabel: "PMI / MIP",
            title: "What Are PMI and MIP?",
            description:
              "They are forms of mortgage insurance that may apply depending on the loan type.",
          },

          hoa: {
            shortLabel: "HOA",
            title: "What Is an HOA?",
            description:
              "It is the homeowners association fee that may apply to certain properties.",
          },
        },

        increases: {
          title:
            "What Does Increasing Your Monthly Payment by $100 or $200 Mean?",

          morePayment: {
            title: "Higher Payment, More Options",
            description:
              "A small monthly difference may give you access to a higher-priced property.",
          },

          lessPayment: {
            title: "Lower Payment, More Flexibility",
            description:
              "Choosing a lower price range may provide greater flexibility to save and cover other expenses.",
          },

          yourDecision: {
            title: "The Decision Is Yours",
            description:
              "This tool helps you compare options and decide how much you want to pay each month.",
          },
        },

        faqs: {
          title: "Frequently Asked Questions About Monthly Home Payments",

          monthlyPayment: {
            question: "How Is a Monthly Mortgage Payment Calculated?",
            answer:
              "A monthly mortgage payment is calculated primarily using the loan amount, interest rate, and repayment term. However, the total monthly housing payment may also include property taxes, homeowners insurance, mortgage insurance such as PMI or MIP, and HOA fees when applicable. This is why two homes with similar prices may not have the same monthly payment. Differences in the interest rate, down payment, loan program, property taxes, insurance costs, and HOA fees can significantly affect the final amount.",
          },

          includes: {
            question: "What Is Included in the Monthly Payment for a Home?",
            answer:
              "A total monthly house payment may include several components: principal, the portion of the loan balance you are paying back; interest, the cost charged by the lender for financing the loan; property taxes; homeowners insurance; PMI or MIP when required; and HOA fees if the property has them. Some mortgage estimates show only principal and interest, which may be much lower than the actual total monthly payment. When comparing homes, it is important to review the complete estimated payment.",
          },

          paymentChanges: {
            question:
              "Why Does My Monthly Payment Change Even When the Price Does Not Increase Much?",
            answer:
              "The monthly payment does not depend only on the price of the home. It may also change because of the interest rate, down payment, loan term, property taxes, homeowners insurance, mortgage insurance, and HOA fees. For example, a slightly more expensive home may have lower property taxes, while a less expensive home may be located in an area with higher insurance costs or a large HOA fee. That is why it is important to calculate each property separately instead of assuming that the lower-priced home will always have the lower monthly payment.",
          },

          pmiMip: {
            question: "What Are PMI and MIP on FHA or Conventional Loans?",
            answer:
              "PMI and MIP are forms of mortgage insurance that may be included in the monthly payment. MIP, or Mortgage Insurance Premium, is commonly associated with FHA loans. PMI, or Private Mortgage Insurance, may apply to certain conventional loans, especially when the buyer makes a smaller down payment. Mortgage insurance is different from homeowners insurance. PMI or MIP primarily protects the lender if the borrower stops making payments. Homeowners insurance helps protect the property against certain covered losses or damage.",
          },

          moreDownPayment: {
            question: "What Happens If I Make a Larger Down Payment?",
            answer:
              "A larger down payment reduces the amount of money you need to borrow. This may lower the monthly principal and interest payment and reduce the total interest paid over the life of the loan. Depending on the loan program, a larger down payment may also reduce or eliminate PMI. However, buyers should also consider closing costs, moving expenses, repairs, furniture, and the importance of maintaining an emergency fund before using all available savings for the down payment.",
          },

          principalInterest: {
            question: "What Is the Difference Between Principal and Interest?",
            answer:
              "Principal and interest, often shown as P&I, represent only the portion of the payment directly related to the mortgage loan. The total monthly payment may include principal and interest, property taxes, homeowners insurance, PMI or MIP, and HOA fees when applicable. This is why a calculator that shows only principal and interest may display a payment that appears much lower than the amount you may actually need to pay each month.",
          },
        },

        notes: {
          title: "Important Notes and Disclaimer",

          estimates: {
            title: "All Figures Shown Are Estimates",
            first:
              "This tool does not constitute a preapproval, approval, or official loan quote.",
            second:
              "Interest rates, property taxes, insurance, PMI or MIP, and HOA dues may vary.",
          },

          lender: {
            title: "The Actual Payment Depends on the Lender",
            first:
              "It may vary depending on the lender, loan type, credit profile, down payment, and property.",
            second:
              "Always confirm the exact figures with your lender before making a decision.",
          },
        },

        bottomMessage:
          "Use this calculator to understand your monthly payment, compare options, and make decisions with greater clarity.",
      },
    },
  },

  es: {
    translation: {
      headerApp: {
        title: "Pago mensual estimado",
        subtitle: "Por rango de precio de compra",
        helpText:
          "Si necesitas ayuda para utilizar la calculadora, llámanos al:",
        logoAlt: "Logotipo de Juan Carlos Carrera Realtors",
      },

      mortgageHero: {
        eyebrow: "Calculadora educativa de pago hipotecario",
        title:
          "Comparador de pagos hipotecarios según el precio de la vivienda",
        description:
          "Descubra cómo cambia su pago mensual según el precio de la casa, la tasa, el enganche y otros costos. Compare rangos y entienda cuánto sube o baja su pago antes de tomar una decisión.",
        educationalTool: "Herramienta educativa",
        notOfficialQuote: "No es una cotización oficial",
        logoAlt: "Juan Carlos Carrera Realtors",
        objectiveTitle: "Objetivo de esta calculadora",
        objectiveDescription:
          "Ayudarle a entender cómo se calcula el pago mensual y cuánto representa subir o bajar de precio en una vivienda.",
      },

      common: {
        english: "Inglés",
        spanish: "Español",
        downloadPdf: "Descargar PDF",
        generatingPdf: "Generando PDF...",
        print: "Imprimir",
      },

      resultsSection: {
        title: "2. Resultado estimado por rango de precio",
        subtitle:
          "Después de ingresar sus datos, aquí verá cómo cambia su pago mensual estimado.",
        noteBefore: "La columna",
        differentialLabel: "“Diferencial P&I”",
        noteAfter:
          "le ayuda a ver cuánto aumenta el pago base entre un rango y el siguiente.",
      },

      mortgageForm: {
        stepTitle: "1. Ingrese sus datos",
        stepSubtitle:
          "Ajuste estos valores y vea el desglose estimado de su pago mensual.",

        loanType: "Tipo de préstamo",
        conventional: "Convencional",

        minimumPrice: "Precio mínimo",
        minimumPriceHint: "Precio mínimo del rango de comparación",

        maximumPrice: "Precio máximo",
        maximumPriceHint: "Precio máximo del rango de comparación",

        priceInterval: "Intervalo de precio",
        priceIntervalHint: "Diferencia entre cada escenario calculado",

        loanTerm: "Plazo del préstamo",
        loanTermHint: "Duración total del préstamo",

        interestRate: "Tasa de interés",
        interestRateHint: "Tasa de interés anual estimada",

        downPayment: "Pago inicial",
        amountOrPercentageHint:
          "Seleccione un porcentaje o una cantidad en dólares.",

        upfrontMip: "MIP inicial FHA",
        ufmipAmountHint:
          "Porcentaje del préstamo base o una cantidad inicial fija.",

        monthlyMip: "MIP anual FHA",
        mipAmountHint: "Porcentaje anual o cantidad anual fija de MIP.",

        conventionalPmi: "PMI anual",
        pmiAmountHint: "Porcentaje anual o cantidad anual fija de PMI.",

        noPmiRequired:
          "El PMI no es necesario con un pago inicial del 20% o más.",

        propertyTaxes: "Impuestos de propiedad",
        taxesAmountHint:
          "Porcentaje anual o cantidad anual fija de impuestos de propiedad.",

        homeownersInsurance: "Seguro de propietario",
        insuranceAmountHint: "Porcentaje anual o prima anual fija de seguro.",

        calculate: "Calcular pago hipotecario",

        completeRequiredFields: "Complete todos los campos obligatorios.",
        invalidMinimumPrice: "El precio mínimo debe ser mayor que cero.",
        invalidMaximumPrice:
          "El precio máximo debe ser mayor que el precio mínimo.",
        invalidInterval: "El intervalo de precio debe ser mayor que cero.",
        invalidYears: "El plazo del préstamo debe ser mayor que cero.",
        invalidInterestRate: "La tasa de interés no puede ser negativa.",
        invalidPercentage: "Los porcentajes deben estar entre 0% y 99.99%.",
        invalidAmount: "Las cantidades en dólares no pueden ser negativas.",
      },

      calculatorBenefits: {
        title: "¿Qué hace esta calculadora?",
        comparePayments: "Compara pagos por diferentes rangos de precio",
        showDifference:
          "Muestra la diferencia entre un rango de precio y el siguiente",
        paymentBreakdown: "Desglosa los componentes del pago mensual",
        helpDecision: "Le ayuda a decidir cuánto desea gastar o ahorrar",
        disclaimer:
          "El pago mensual no lo determina el agente de bienes raíces; depende del precio, el préstamo, la tasa de interés, los impuestos de propiedad, el seguro de propietario y el PMI o MIP.",
      },

      mortgageTable: {
        empty: "Complete el formulario para ver los resultados",

        fixedRate: "Tasa fija",
        loanTerm: "Plazo",
        upfrontMip: "MIP inicial",
        annualTaxes: "Impuestos anuales",
        annualInsurance: "Seguro anual",

        annualFhaMip: "MIP anual de FHA",
        annualPmi: "PMI anual",
        noPmi: "PMI",
        notApplicable: "No aplica",
        perYear: "al año",
        effectiveDownPayment: "Pago inicial efectivo",

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

        noteDifferenceFha:
          "El P&I y el seguro hipotecario FHA se calcularon utilizando un préstamo FHA con un pago inicial de {{downPayment}}, una tasa de interés fija de {{interestRate}}, un plazo de {{years}} años, un UFMIP financiado de {{ufmip}} y un MIP anual de {{mip}}.",

        noteDifferenceConventional:
          "El P&I y el seguro hipotecario se calcularon utilizando un préstamo convencional con un pago inicial de {{downPayment}}, una tasa de interés fija de {{interestRate}}, un plazo de {{years}} años y un PMI anual de {{pmi}} cuando corresponda.",

        noteTaxesPercent:
          "Los impuestos sobre la propiedad se estiman utilizando el {{taxes}} anual del precio de compra.",

        noteTaxesAmount:
          "Los impuestos sobre la propiedad se estiman utilizando una cantidad anual fija de {{taxes}}.",

        noteInsurancePercent:
          "El seguro de propietario se estima utilizando el {{insurance}} anual del precio de compra. Las primas reales pueden variar según la propiedad, la cobertura y el perfil del comprador.",

        noteInsuranceAmount:
          "El seguro de propietario se estima utilizando una prima anual fija de {{insurance}}. Las primas reales pueden variar según la propiedad, la cobertura y el perfil del comprador.",

        noteHoa: "Las cuotas de la HOA no están incluidas.",
        noteLender:
          "Confirme siempre el pago mensual exacto con su prestamista.",
        pdfError: "No se pudo generar el PDF.",
        emptyCapture: "La captura generada está vacía.",
      },

      header: {
        eyebrow: "Financiamiento de viviendas en Las Vegas",
        title: "Pago mensual estimado",
        subtitle: "Por rango de precio de compra",
        location: "",
        description:
          "Ilustración educativa para entender cómo cambia el pago mensual según el precio de compra.",
        disclaimer: "Cálculo ilustrativo — no constituye una cotización",
        logoAlt: "Logotipo de la empresa",
      },

      mortgageFooter: {
        composition: {
          title: "¿Cómo se compone el pago mensual de una hipoteca?",
          description:
            "Su pago mensual no incluye únicamente el pago del préstamo. También puede incluir impuestos de propiedad, seguro de propietario, seguro hipotecario y, en algunos casos, cuotas de HOA.",
        },

        paymentParts: {
          principal: {
            shortLabel: "Principal",
            title: "¿Qué es el principal?",
            description:
              "Es la parte del saldo del préstamo que usted está pagando y que reduce la deuda pendiente.",
          },

          interest: {
            shortLabel: "Interés",
            title: "¿Qué es el interés hipotecario?",
            description:
              "Es el costo que cobra el prestamista por prestarle el dinero.",
          },

          taxes: {
            shortLabel: "Impuestos",
            title: "¿Qué son los impuestos de propiedad?",
            description:
              "Son los impuestos sobre la propiedad cobrados por el condado o el gobierno local.",
          },

          insurance: {
            shortLabel: "Seguro",
            title: "¿Qué es el seguro de propietario?",
            description:
              "Es la póliza que ayuda a proteger su vivienda contra determinados daños o pérdidas cubiertas.",
          },

          mortgageInsurance: {
            shortLabel: "PMI / MIP",
            title: "¿Qué son el PMI y el MIP?",
            description:
              "Son tipos de seguro hipotecario que pueden aplicarse según el tipo de préstamo.",
          },

          hoa: {
            shortLabel: "HOA",
            title: "¿Qué es una HOA?",
            description:
              "Es la cuota de la asociación de propietarios que puede aplicarse a determinadas propiedades.",
          },
        },

        increases: {
          title: "¿Qué significa aumentar $100 o $200 en su pago mensual?",

          morePayment: {
            title: "Más pago, más opciones",
            description:
              "Una pequeña diferencia mensual puede abrirle la puerta a una propiedad de mayor precio.",
          },

          lessPayment: {
            title: "Menos pago, más flexibilidad",
            description:
              "Elegir un rango menor puede darle mayor flexibilidad para ahorrar y cubrir otros gastos.",
          },

          yourDecision: {
            title: "La decisión es suya",
            description:
              "Esta herramienta le ayuda a comparar opciones y decidir cuánto desea pagar cada mes.",
          },
        },

        faqs: {
          title: "Preguntas frecuentes sobre el pago mensual de una casa",

          monthlyPayment: {
            question: "¿Cómo se calcula el pago mensual de una hipoteca?",
            answer:
              "El pago mensual de una hipoteca se calcula principalmente utilizando el monto del préstamo, la tasa de interés y el plazo de financiamiento. Sin embargo, el pago mensual total también puede incluir impuestos de propiedad, seguro de propietario, seguro hipotecario PMI o MIP y cuotas de HOA cuando correspondan.",
          },

          includes: {
            question: "¿Qué incluye el pago mensual de una casa?",
            answer:
              "El pago mensual total puede incluir principal e interés, impuestos de propiedad, seguro de propietario, seguro hipotecario PMI o MIP y cuotas de HOA, según el préstamo y la propiedad.",
          },

          paymentChanges: {
            question:
              "¿Por qué cambia mi pago mensual aunque el precio no suba mucho?",
            answer:
              "El pago mensual no depende únicamente del precio de la vivienda. También influyen la tasa de interés, el plazo, el pago inicial, los impuestos de propiedad, el seguro de propietario, el seguro hipotecario y las cuotas de HOA.",
          },

          pmiMip: {
            question: "¿Qué son PMI y MIP en préstamos FHA o convencionales?",
            answer:
              "El MIP corresponde principalmente a préstamos FHA. El PMI puede aplicarse a préstamos convencionales, especialmente cuando el pago inicial es menor al 20%. Ambos son tipos de seguro hipotecario y son diferentes del seguro de propietario.",
          },

          moreDownPayment: {
            question: "¿Qué sucede si hago un pago inicial mayor?",
            answer:
              "Un pago inicial mayor reduce la cantidad financiada, puede disminuir el pago mensual de principal e intereses y, en algunos casos, reducir o eliminar el PMI.",
          },

          principalInterest: {
            question: "¿Cuál es la diferencia entre principal e interés?",
            answer:
              "El principal reduce el saldo pendiente del préstamo. El interés es el costo que cobra el prestamista por financiar el dinero. Ambos representan únicamente una parte del pago mensual total.",
          },
        },

        notes: {
          title: "Notas importantes y descargo de responsabilidad",

          estimates: {
            title: "Todas las cifras mostradas son estimaciones",
            first:
              "Esta herramienta no constituye una preaprobación, aprobación ni cotización oficial.",
            second:
              "La tasa de interés, los impuestos, el seguro, el PMI o MIP y las cuotas de HOA pueden variar.",
          },

          lender: {
            title: "El pago real depende del prestamista",
            first:
              "Puede variar según el prestamista, el tipo de préstamo, el perfil crediticio, el pago inicial y la propiedad.",
            second:
              "Confirme siempre las cifras exactas con su prestamista antes de tomar una decisión.",
          },
        },

        bottomMessage:
          "Use esta calculadora para entender su pago mensual, comparar opciones y tomar decisiones con mayor claridad.",
      },
    },
  },
};

const supportedLanguages = ["en", "es"];
const defaultLanguage = "en";

const getSavedLanguage = () => {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  try {
    const savedLanguage = window.localStorage.getItem("mortgageLanguage");

    return supportedLanguages.includes(savedLanguage)
      ? savedLanguage
      : defaultLanguage;
  } catch {
    return defaultLanguage;
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: getSavedLanguage(),
  fallbackLng: defaultLanguage,
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
