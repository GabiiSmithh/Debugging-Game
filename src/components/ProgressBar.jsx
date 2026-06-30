export default function ProgressBar({ value = 0, label = 'Progresso' }) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="progressWrap" aria-label={`${label}: ${safeValue}%`}>
      <div className="progressInfo">
        <span>{label}</span>
        <strong>{safeValue}%</strong>
      </div>
      <div className="progressTrack">
        <div className="progressFill" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
