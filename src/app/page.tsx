"use client";
import { useState } from "react";
import Header from "../../components/Header";
import CustomCodeEditor from "../../components/ContractInput";
import ResultModal from "../../components/ResultModal";
import { analyzeContract } from "../../utils/AI-Prompt";

export default function Home() {
  const [contract, setContract] = useState("");
  const [results, setResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

const analyze = async () => {
  setIsModalOpen(true);
  await analyzeContract(contract, setResults, setLoading);
};
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <Header />
      <CustomCodeEditor
        analyze={analyze}
        contract={contract}
        setContract={setContract}
      />
      <ResultModal
        closeModal={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        results={results}
        loading={loading}
      />
    </main>
  );
}
