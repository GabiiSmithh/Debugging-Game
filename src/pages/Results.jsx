import ProgressBar from '../components/ProgressBar.jsx';
import FeedbackCard from '../components/FeedbackCard.jsx';
import { calculateMaxScore, calculatePercentage, getPerformanceLabel } from '../utils/score.js';

export default function Results({ score, totalChallenges, reports, onRestart, onBackToLevels }) {
  const maxScore = calculateMaxScore(totalChallenges);
  const percentage = calculatePercentage(score, maxScore);
  const label = getPerformanceLabel(percentage);

  return (
    <main className="screen contentScreen">
      <section className="pageCard resultsScreen">
        <p className="eyebrow">Resultado final</p>
        <h2>{label}</h2>
        <p>
          Você concluiu todos os desafios disponíveis. Continue praticando para reconhecer padrões de erro
          cada vez mais rápido.
        </p>

        <div className="finalScore">
          <strong>{score}</strong>
          <span>de {maxScore} pontos</span>
        </div>

        <ProgressBar value={percentage} label="Desempenho geral" />

        <div className="summaryList">
          {reports.map((report) => (
            <FeedbackCard key={report.challenge.id} title={`Fase ${report.challengeIndex + 1}: ${report.challenge.title}`} variant="info">
              <p>{report.results.earned} pontos conquistados</p>
              <small>{report.challenge.concept}</small>
            </FeedbackCard>
          ))}
        </div>

        <div className="actionsRow">
          <button className="primaryButton" type="button" onClick={onBackToLevels}>
            Voltar para seleção de fases
          </button>
          <button className="ghostButton" type="button" onClick={onRestart}>
            Jogar novamente do início
          </button>
        </div>
      </section>
    </main>
  );
}
