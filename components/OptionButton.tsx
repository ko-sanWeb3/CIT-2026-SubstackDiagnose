type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export default function OptionButton({ label, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-6 py-5 rounded-2xl border-2 text-xl font-medium transition-all duration-200 leading-relaxed
        ${selected
          ? "border-orange-400 bg-orange-50 text-orange-700"
          : "border-gray-200 bg-white text-gray-800 hover:border-orange-300 hover:bg-orange-50"
        }`}
    >
      {label}
    </button>
  );
}
