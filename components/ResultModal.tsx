import React, { useState } from "react";

import { Dialog } from "@headlessui/react";
import {
  IconChecklist,
  IconCircleCheck,
  IconGauge,
  IconChevronUp,
  IconChevronDown,
  IconTool,
} from "@tabler/icons-react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ResultModalProps {
  isOpen: boolean;
  closeModal: () => void;
  loading: boolean;
  results: any;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  closeModal,
  loading,
  results,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black opacity-50"
          aria-hidden="true"
        ></div>
        {loading ? (
          <div
            className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-xl transform 
          transition-all max-w-lg w-full p-8 space-y-8"
          >
            <div className="flex py-14 flex-col items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-14 w-14 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V4a8 8 0 00-8 8z"
                ></path>
              </svg>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                Analyzing smart contract...
              </p>
            </div>
          </div>
        ) : (
          results && (
            <div
              className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-xl transform 
            transition-all max-w-3xl w-full p-8 space-y-8"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-gray-100">
                    Audit Results
                  </h2>
                </div>

                <div className="text-left">
                  <h3
                    className="text-xl space-x-2 cursor-pointer flex items-center justify-between mb-4 text-gray-200"
                    onClick={() => toggleSection("auditReport")}
                  >
                    <div className="flex items-center space-x-2">
                      <IconChecklist size={24} />
                      <span>Audit Report</span>
                    </div>
                    {expandedSection === "auditReport" ? (
                      <IconChevronUp size={24} />
                    ) : (
                      <IconChevronDown size={24} />
                    )}
                  </h3>

                  {expandedSection === "auditReport" && (
                    <p className="text-base text-gray-300">
                      {
                        results.find((r: any) => r.section === "Audit Report")
                          .details
                      }
                    </p>
                  )}
                </div>

                <div className="text-left">
                  <h3
                    className="text-xl space-x-2 cursor-pointer flex items-center justify-between mb-4 text-gray-200"
                    onClick={() => toggleSection("metricScores")}
                  >
                    <div className="flex items-center space-x-2">
                      <IconGauge size={24} />
                      <span>Metric Scores</span>
                    </div>
                    {expandedSection === "metricScores" ? (
                      <IconChevronUp size={24} />
                    ) : (
                      <IconChevronDown size={24} />
                    )}
                  </h3>

                  {expandedSection === "metricScores" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {results
                        .find((r: any) => r.section === "Metric Scores")
                        .details.map((metric: any, metricIndex: number) => {
                          let color;
                          if (metric.score >= 8) color = "#4cef50";
                          else if (metric.score < 5) color = "#f44336";
                          else color = "#ffeb3b";

                          return (
                            <div
                              className="flex flex-col items-center"
                              key={metricIndex}
                            >
                              <div className="w-24 h-24">
                                <CircularProgressbar
                                  value={metric.score * 10}
                                  text={`${metric.score}/10`}
                                  strokeWidth={10}
                                  styles={buildStyles({
                                    textSize: '16px',
                                    pathColor:color,
                                    textColor:color,
                                    trailColor:"#d6d6d6"
                                  })}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                <div className="text-left">
                  <h3
                    className="text-xl space-x-2 cursor-pointer flex items-center justify-between mb-4 text-gray-200"
                    onClick={() => toggleSection("suggestions")}
                  >
                    <div className="flex items-center space-x-2">
                      <IconCircleCheck size={24} />
                      <span>Suggestions for Improvements</span>
                    </div>
                    {expandedSection === "suggestions" ? (
                      <IconChevronUp size={24} />
                    ) : (
                      <IconChevronDown size={24} />
                    )}
                  </h3>
                  {expandedSection === "suggestions" && (
                    <p className="text-base text-gray-300">
                      {
                        results.find(
                          (r: any) =>
                            r.section === "Suggestions for Improvement"
                        ).details
                      }
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                    <button onClick={closeModal} className="text-red-500">Close</button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Dialog>
  );
};

export default ResultModal;
