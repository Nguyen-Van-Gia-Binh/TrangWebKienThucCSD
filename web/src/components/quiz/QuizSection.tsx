"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function QuizSection({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const handleSelect = (qId: string, optIndex: number) => {
    if (answers[qId] !== undefined) return; // Prevent changing answer
    setAnswers((prev) => ({ ...prev, [qId]: optIndex }));
    setShowExplanation((prev) => ({ ...prev, [qId]: true }));
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-bold">Luyện tập nhanh (Quiz)</h2>
      {questions.map((q, i) => {
        const selectedIndex = answers[q.id];
        const isAnswered = selectedIndex !== undefined;

        return (
          <div key={q.id} className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800 bg-white dark:bg-neutral-900/50">
            <p className="font-semibold mb-4">Câu {i + 1}: {q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, oIdx) => {
                let btnClass = "w-full text-left p-3 rounded-lg border transition-colors ";
                
                if (!isAnswered) {
                  btnClass += "border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800";
                } else {
                  if (oIdx === q.correctIndex) {
                    btnClass += "border-green-500 bg-green-50 text-green-900 dark:bg-green-950/30 dark:text-green-300";
                  } else if (oIdx === selectedIndex) {
                    btnClass += "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-300";
                  } else {
                    btnClass += "border-neutral-200 opacity-50 dark:border-neutral-800";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(q.id, oIdx)}
                    disabled={isAnswered}
                    className={btnClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {isAnswered && oIdx === q.correctIndex && <CheckCircle2 className="text-green-500" size={18} />}
                      {isAnswered && oIdx === selectedIndex && oIdx !== q.correctIndex && <XCircle className="text-red-500" size={18} />}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {showExplanation[q.id] && (
              <div className="mt-4 p-4 rounded-lg bg-indigo-50 text-indigo-900 text-sm dark:bg-indigo-950/30 dark:text-indigo-200">
                <strong>Giải thích: </strong> {q.explanation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
