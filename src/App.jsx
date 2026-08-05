import { useState } from "react";
import LanguageSelector from "./components/LanguageSelector";
import MortgageForm from "./components/MortgageForm";
import MortgageTable from "./components/MortgageResults";
import { calcScenarios } from "./utils/mortgage";

export default function App() {
  const [data, setData] = useState(null);

  const handleCalculate = (values) => {
    const calculatedData = calcScenarios(values);
    setData(calculatedData);
  };

  return (
    <main className="min-h-screen bg-[#fdf8f0] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Language selector */}
        <div className="mb-4 flex justify-end">
          <LanguageSelector />
        </div>

        {/* Mortgage calculator */}
        <MortgageForm onCalculate={handleCalculate} />

        {/* Calculation results */}
        <MortgageTable data={data} />
      </div>
    </main>
  );
}