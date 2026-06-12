"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import OptionButton from "@/components/OptionButton";
import { getQuestions, calcResult, type Answers } from "@/lib/diagnose";

const STORAGE_KEY = "substack_quiz_answers";
const TOTAL = 5;

// sessionStorage には Record<number, string[]> で保存する。
// V2（単一選択）で保存された文字列が残っていても配列に正規化して読み込む。
function normalizeAnswers(raw: unknown): Answers {
  const result: Answers = {};
  if (raw && typeof raw === "object") {
    for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
      const n = Number(key);
      if (Number.isNaN(n)) continue;
      if (Array.isArray(value)) {
        result[n] = value.filter((v): v is string => typeof v === "string");
      } else if (typeof value === "string") {
        result[n] = [value];
      }
    }
  }
  return result;
}

export default function QuizPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const questions = getQuestions();

  useEffect(() => {
    params.then(({ step: s }) => {
      const n = parseInt(s, 10);
      setStep(n);

      const saved = sessionStorage.getItem(STORAGE_KEY);
      const parsed = saved ? normalizeAnswers(JSON.parse(saved)) : {};
      setAnswers(parsed);
      // 「前に戻る」で複数選択の状態を復元する
      setSelected(parsed[n] ?? []);
    });
  }, [params]);

  const question = questions.find((q) => q.id === step);
  if (!question) return null;

  const isMultiple = question.multiple !== false;

  function toggle(optionId: string) {
    if (isMultiple) {
      setSelected((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      // 単一選択の設問は1つだけ保持する
      setSelected([optionId]);
    }
  }

  function persist(updated: Answers) {
    setAnswers(updated);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function handleNext() {
    if (selected.length === 0) return;
    const updated: Answers = { ...answers, [step]: selected };
    persist(updated);

    if (step < TOTAL) {
      router.push(`/quiz/${step + 1}`);
    } else {
      const resultType = calcResult(updated);
      router.push(`/result/${resultType}`);
    }
  }

  function handleBack() {
    // 現在の選択を保存してから戻る（戻り先での復元のため）
    if (selected.length > 0) {
      persist({ ...answers, [step]: selected });
    }
    if (step > 1) {
      router.push(`/quiz/${step - 1}`);
    } else {
      router.push("/");
    }
  }

  const canProceed = selected.length > 0;

  return (
    <div className="flex flex-col gap-8">
      <ProgressBar current={step} total={TOTAL} />

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
        <p className="text-lg text-orange-500 font-medium mb-3">質問 {step}</p>
        <h2 className="text-2xl font-bold text-gray-800 leading-relaxed whitespace-pre-line">
          {question.text}
        </h2>
        <p className="mt-4 text-lg text-gray-500 leading-relaxed">
          {isMultiple
            ? "当てはまるものをすべて選んでください（複数選択できます）"
            : "当てはまるものを1つ選んでください"}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            label={option.text}
            selected={selected.includes(option.id)}
            multiple={isMultiple}
            onClick={() => toggle(option.id)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`w-full text-white text-2xl font-bold py-6 rounded-2xl transition-colors shadow-md
            ${canProceed
              ? "bg-orange-400 hover:bg-orange-500"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          {step < TOTAL ? "次の質問へ →" : "結果を見る →"}
        </button>

        {!canProceed && (
          <p className="text-center text-base text-gray-400">
            上から1つ以上選ぶと、次に進めます
          </p>
        )}

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
