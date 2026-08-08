export default function PhonemeButton({
  symbol,
  label,
  hint,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={`${label} (${hint})`}
      aria-label={`${symbol} — ${label} ${hint}`}
      className="group relative border rounded-lg px-5 py-4 text-xl font-bold"
    >
      {symbol}

      <span
        className="
          absolute hidden group-hover:block group-focus:block
          left-1/2 -translate-x-1/2 top-full mt-2
          whitespace-nowrap border rounded px-3 py-2
          text-sm font-normal z-10
        "
      >
        {label} ({hint})
      </span>
    </button>
  );
}