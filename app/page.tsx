import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-8 py-8">
      <div className="text-6xl">📬</div>

      <div className="space-y-3">
        <p className="text-xl text-orange-600 font-medium">60代からはじめる</p>
        <h1 className="text-3xl font-bold text-gray-800 leading-snug">
          あなたに合った
          <br />
          Substackのはじめ方
          <br />
          診断
        </h1>
      </div>

      {/* Substack説明カード */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-200 text-left w-full space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">📬</span>
          <h2 className="text-xl font-bold text-orange-600">Substackとは？</h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          Substackは、<span className="font-semibold text-gray-800">メールで届くニュースレター</span>を無料で作れるサービスです。
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          ブログのように文章を書くと、登録してくれた人のメールボックスに届きます。SNSのように「バズらせる」必要はありません。
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          難しい設定は不要。スマホでもパソコンでも使えます。
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          公開範囲は自分で決められるので、まずは<span className="font-semibold text-gray-800">非公開の下書き</span>から始めることもできます。
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          アカウント作成は<span className="font-semibold text-gray-800">無料</span>。基本的な機能はずっと無料で使えます。
        </p>
        <a
          href="https://substack.com/sign-up"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-1 text-lg text-orange-500 hover:text-orange-600 font-medium underline underline-offset-4 transition-colors"
        >
          → Substackのアカウントを作る（無料）
        </a>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 text-left space-y-3 w-full">
        <p className="text-xl text-gray-700 leading-relaxed">
          「難しそう」「何を書けばいいかわからない」
        </p>
        <p className="text-xl text-gray-700 leading-relaxed">
          そんな不安、まず診断で解消しましょう。
        </p>
        <p className="text-xl text-gray-700 leading-relaxed">
          5つの質問に答えるだけで、
          <span className="text-orange-600 font-semibold">あなたに合った使い方</span>
          を提案します。
        </p>
      </div>

      <div className="bg-amber-50 rounded-2xl p-5 w-full border border-amber-200 text-left space-y-2">
        <p className="text-lg text-gray-600">✅ 所要時間：約 <span className="font-bold text-gray-800">2〜3分</span></p>
        <p className="text-lg text-gray-600">✅ 登録・ログイン <span className="font-bold text-gray-800">不要</span></p>
        <p className="text-lg text-gray-600">✅ <span className="font-bold text-gray-800">5問</span> の選択式です</p>
      </div>

      <Link
        href="/quiz/1"
        className="w-full bg-orange-400 hover:bg-orange-500 text-white text-2xl font-bold py-6 rounded-2xl transition-colors shadow-md"
      >
        診断をはじめる →
      </Link>

      <p className="text-lg text-gray-500">
        今のあなたはここからで大丈夫です
      </p>
    </div>
  );
}
