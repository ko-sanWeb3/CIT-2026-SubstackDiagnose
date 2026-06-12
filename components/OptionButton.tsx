type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
  /** 複数選択の設問ではチェックボックス、単一選択では丸印で表示する */
  multiple?: boolean;
};

export default function OptionButton({ label, selected, onClick, multiple = true }: Props) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full flex items-center gap-4 text-left px-6 py-5 rounded-2xl border-2 text-xl font-medium transition-all duration-200 leading-relaxed
        ${selected
          ? "border-orange-400 bg-orange-50 text-orange-700"
          : "border-gray-200 bg-white text-gray-800 hover:border-orange-300 hover:bg-orange-50"
        }`}
    >
      {/* 選択状態を示すチェック印（複数選択は四角、単一選択は丸） */}
      <span
        aria-hidden="true"
        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 text-white text-lg font-bold transition-colors
          ${multiple ? "rounded-md" : "rounded-full"}
          ${selected ? "bg-orange-400 border-orange-400" : "bg-white border-gray-300"}`}
      >
        {selected ? "✓" : ""}
      </span>
      <span className="flex-1">{label}</span>
    </button>
  );
}
