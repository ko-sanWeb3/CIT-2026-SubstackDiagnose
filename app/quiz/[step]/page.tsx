"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import OptionButton from "@/components/OptionButton";
import { getQuestions, calcResult } from "@/lib/diagnose";
import Link from "next/link";

const STORAGE_KEY = "substack_quiz_answers";
const TOTAL = 5;

export default function QuizPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const questions = getQuestions();

  useEffect(() => {
    params.then(({ step: s }) => {
      const n = parseInt(s, 10);
      setStep(n);
      setSelected(null);

      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<number, string>;
        setAnswers(parsed);
        if (parsed[n]) setSelected(parsed[n]);
      }
    });
  }, [params]);

  const question = questions.find((q) => q.id === step);
  if (!question) return null;

  function handleSelect(optionId: string) {
    setSelected(optionId);
  }

  function handleNext() {
    if (!selected) return;
    const updated = { ...answers, [step]: selected };
    setAnswers(updated);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    if (step < TOTAL) {
      router.push(`/quiz/${step + 1}`);
    } else {
      const resultType = calcResult(updated);
      router.push(`/result/${resultType}`);
    }
  }

  function handleBack() {
    if (step > 1) {
      router.push(`/quiz/${step - 1}`);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <ProgressBar current={step} total={TOTAL} />

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
        <p className="text-lg text-orange-500 font-medium mb-3">質問 {step}</p>
        <h2 className="text-2xl font-bold text-gray-800 leading-relaxed whitespace-pre-line">
          {question.text}
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            label={option.text}
            selected={selected === option.id}
            onClick={() => handleSelect(option.id)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`w-full text-white text-2xl font-bold py-6 rounded-2xl transition-colors shadow-md
            ${selected
              ? "bg-orange-400 hover:bg-orange-500"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          {step < TOTAL ? "次の質問へ →" : "結果を見る →"}
        </button>

        <button
          onClick={handleBack}
          className="w-full text-gray-500 text-xl font-medium py-4 rounded-2xl border-2 border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        >
          ← 前に戻る
        </button>
      </div>

      <p className="text-center text-lg text-gray-500">
        今のあなたはここからで大丈夫です
      </p>
    </div>
  );
}
