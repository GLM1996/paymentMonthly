import { useEffect, useState } from "react";
import MortgageForm from "./components/MortgageForm";
import MortgageTable from "./components/MortgageTable";
import { calcScenarios } from "./utils/mortgage";
import Header from "./components/Header";
import MortgageHero from "./components/MortgageHero";
import MortgageFooter from "./components/MortgageFooter";

export default function App() {
  const [data, setData] = useState(null);

  const handleCalculate = (values) => {
    const calculatedData = calcScenarios(values);
    setData(calculatedData);
  };

  return (
    <main className="min-h-screen bg-[#fdf8f0]">
      <Header />
      <div className="mx-auto max-w-7xl p-2 bg-white shadow">
        <MortgageHero />
        {/* Mortgage calculator */}
        <MortgageForm onCalculate={handleCalculate} />

        {/* Calculation results */}
        <MortgageTable data={data} />
        <MortgageFooter />
      </div>
    </main>
  );
}
