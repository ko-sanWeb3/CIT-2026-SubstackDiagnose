"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getType, TypeKey } from "@/lib/diagnose";

const colorMap: Record<string, string> = {
  amber: "bg-amber-100 border-amber-300 text-amber-700",
  green: "bg-green-100 border-green-300 text-green-700",
  blue: "bg-blue-100 border-blue-300 text-blue-700",
  purple: "bg-purple-100 border-purple-300 text-purple-700",
  rose: "bg-rose-100 border-rose-300 text-rose-700",
  teal: "bg-teal-100 border-teal-300 text-teal-700",
  indigo: "bg-indigo-100 border-indigo-300 text-indigo-700",
};

const btnColorMap: Record<string, string> = {
  amber: "bg-amber-400 hover:bg-amber-500",
  green: "bg-green-500 hover:bg-green-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  rose: "bg-rose-500 hover:bg-rose-600",
  teal: "bg-teal-500 hover:bg-teal-600",
  indigo: "bg-indigo-500 hover:bg-indigo-600",
};

export default function ResultPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const [typeKey, setTypeKey] = useState<TypeKey | null>(null);

  useEffect(() => {
    params.then(({ type }) => {
      setTypeKey(type.toUpperCase() as TypeKey);
    });
  }, [params]);

  if (!typeKey) return null;

  const typeData = getType(typeKey);
  if (!typeData) return null;

  const colorClass = colorMap[typeData.color] ?? colorMap.amber;
  const btnClass = btnColorMap[typeData.color] ?? btnColorMap.amber;

  function handleRetry() {
    sessionStorage.removeItem("substack_quiz_answers");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className={`rounded-2xl p-6 border-2 text-center ${colorClass}`}>
        <p className="text-lg font-medium mb-1">あなたのタイプは…</p>
        <div className="text-5xl mb-3">{typeData.emoji}</div>
        <h1 className="text-3xl font-bold">{typeData.name}</h1>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
        <h2 className="text-xl font-bold text-gray-800">あなたに合う使い方</h2>
        <p className="text-xl text-gray-700 leading-relaxed font-medium">
          「{typeData.tagline}」
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">{typeData.description}</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-lg text-yellow-800 font-medium">💡 {typeData.message}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">最初にやること 3ステップ</h2>
        <ol className="space-y-3">
          {typeData.steps.map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {i + 1}
              </span>
              <span className="text-lg text-gray-700 leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">最初の書き出しテンプレ</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-base text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
          {typeData.template}
        </pre>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">まず見るべき資料</h2>
        {/* PDFは後日 public/docs/guide-{resultId}.pdf に配置する。
            未配置でもビルド・デプロイは静的リンクのため通る。 */}
        <div className="flex flex-col gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-start gap-3">
            <span className="text-3xl flex-shrink-0">📄</span>
            <div className="flex flex-col">
              <span className="text-xl text-gray-800 font-bold leading-relaxed">
                {typeData.guideTitle}
              </span>
              <span className="text-lg text-gray-500 mt-1">
                5枚のスライドであなたの始め方が分かります
              </span>
            </div>
          </div>
          <a
            href={`/docs/guide-${typeData.resultId}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full text-center text-white text-xl font-bold py-4 rounded-xl transition-colors shadow-sm ${btnClass}`}
          >
            資料を見る（PDF）→
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <a
          href="https://substack.com/sign-up"
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full text-center text-white text-2xl font-bold py-6 rounded-2xl transition-colors shadow-md ${btnClass}`}
        >
          Substackに登録する（無料）→
        </a>
        <Link
          href="/"
          onClick={handleRetry}
          className="w-full text-center text-gray-500 text-lg font-medium py-4 rounded-2xl border-2 border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        >
          もう一度診断する
        </Link>
      </div>

      <p className="text-center text-lg text-gray-500 pb-4">
        今のあなたはここからで大丈夫です ☀️
      </p>
    </div>
  );
}
