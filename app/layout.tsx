import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "60代からのSubstackはじめ方診断",
  description: "あなたの人生経験に合ったSubstackの使い方を診断します",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-amber-50 min-h-screen">
        <header className="bg-white border-b border-amber-100 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium text-lg transition-colors"
            >
              <span>🏠</span>
              <span>トップに戻る</span>
            </Link>
          </div>
        </header>
        <div className="max-w-2xl mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}
