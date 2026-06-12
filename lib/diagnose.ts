import data from "@/data/data.json";

export type TypeKey = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type Scores = Record<TypeKey, number>;

// 回答は「設問IDごとに、選ばれた選択肢IDの配列」で持つ（複数選択対応）。
export type Answers = Record<number, string[]>;

const TYPE_KEYS: TypeKey[] = ["A", "B", "C", "D", "E", "F", "G"];

/**
 * 同点（タイブレーク）時の優先順位。
 * 先頭にあるタイプほど優先（＝同点なら先に並んでいる方を採用）。
 * 方針：「初心者寄り・心理的ハードルが低いタイプ」を優先する。
 *   A 人生の棚卸し型（非公開でも始められる・最もハードルが低い）
 *   C 週刊・自分便り型（家族に送るだけ）
 *   B 趣味でつながる仲間づくり型
 *   F ハイブリッド型（読みながら少しずつ書く・やさしい橋渡し）
 *   D 編集長型（紹介・キュレーション）
 *   E 発信者・講師型（本格的な発信）
 *   G 多才な発信者型（マルチメディア・最も活動量が多い）
 */
const TIE_PRIORITY: TypeKey[] = ["A", "C", "B", "F", "D", "E", "G"];

export function calcScores(answers: Answers): Scores {
  const scores: Scores = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 };

  for (const question of data.questions) {
    const selectedIds = answers[question.id] ?? [];
    for (const selectedId of selectedIds) {
      const option = question.options.find((o) => o.id === selectedId);
      if (!option) continue;
      for (const key of TYPE_KEYS) {
        scores[key] += option.scores[key] ?? 0;
      }
    }
  }

  return scores;
}

export function calcResult(answers: Answers): TypeKey {
  const scores = calcScores(answers);

  // 最高得点を求め、同点の場合は TIE_PRIORITY の順で先に来るタイプを採用する。
  let winner: TypeKey = TIE_PRIORITY[0];
  let best = -Infinity;
  for (const key of TIE_PRIORITY) {
    if (scores[key] > best) {
      best = scores[key];
      winner = key;
    }
  }

  return winner;
}

export function getType(key: TypeKey) {
  return data.types[key];
}

export function getQuestions() {
  return data.questions;
}
