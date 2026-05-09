import data from "@/data/data.json";

export type TypeKey = "A" | "B" | "C" | "D" | "E";
export type Scores = Record<TypeKey, number>;

export function calcResult(answers: Record<number, string>): TypeKey {
  const scores: Scores = { A: 0, B: 0, C: 0, D: 0, E: 0 };

  for (const question of data.questions) {
    const selectedId = answers[question.id];
    if (!selectedId) continue;
    const option = question.options.find((o) => o.id === selectedId);
    if (!option) continue;
    for (const key of Object.keys(option.scores) as TypeKey[]) {
      scores[key] += option.scores[key];
    }
  }

  return (Object.keys(scores) as TypeKey[]).reduce((a, b) =>
    scores[a] >= scores[b] ? a : b
  );
}

export function getType(key: TypeKey) {
  return data.types[key];
}

export function getQuestions() {
  return data.questions;
}
