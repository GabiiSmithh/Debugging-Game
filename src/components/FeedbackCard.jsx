export default function FeedbackCard({ title, children, variant = 'info' }) {
  return (
    <article className={`feedbackCard ${variant}`}>
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  );
}
