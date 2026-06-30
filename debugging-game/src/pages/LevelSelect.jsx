import ProgressBar from '../components/ProgressBar.jsx';
import FeedbackCard from '../components/FeedbackCard.jsx';
import { calculateMaxScore, calculatePercentage } from '../utils/score.js';

function getLevelStatus(index, reportsByIndex) {
  const completed = Boolean(reportsByIndex[index]);
  if (completed) return 'completed';
  return 'unlocked';
}

function getStatusLabel(status) {
  if (status === 'completed') return 'Concluída';
  if (status === 'unlocked') return 'Disponível';
  return 'Bloqueada';
}

export default function LevelSelect({
  challenges,
  reportsByIndex,
  score,
  onSelectLevel,
  onShowResults,
  onRestartProgress
}) {
  const completedCount = Object.keys(reportsByIndex).length;
  const totalChallenges = challenges.length;
  const maxScore = calculateMaxScore(totalChallenges);
  const progress = calculatePercentage(completedCount, totalChallenges);
  const scoreProgress = calculatePercentage(score, maxScore);
  const allCompleted = completedCount === totalChallenges;
  const nextIndex = challenges.findIndex((_, index) => !reportsByIndex[index]);

  return (
    <main className="screen contentScreen">
      <section className="pageCard levelSelectPage">
        <div className="pageHeaderRow">
          <div>
            <p className="eyebrow">Mapa de fases</p>
            <h2>Escolha sua próxima análise</h2>
            <p>
              As fases seguem uma trilha progressiva, mas estão todas desbloqueadas. 
              Conclua para pontuar ou volte em fases já concluídas para revisar o debug.
            </p>
          </div>

          <div className="levelSelectActions">
            <button className="ghostButton" type="button" onClick={onRestartProgress}>
              Reiniciar progresso
            </button>
            <button className="primaryButton compactButton" type="button" onClick={onShowResults} disabled={!allCompleted}>
              Ver resultado final
            </button>
          </div>
        </div>

        <div className="levelOverviewGrid">
          <FeedbackCard title="Fases concluídas" variant="success">
            <p><strong>{completedCount}</strong> de <strong>{totalChallenges}</strong></p>
            <small>Complete as fases para preencher a trilha inteira.</small>
          </FeedbackCard>

          <FeedbackCard title="Pontuação acumulada" variant="info">
            <p><strong>{score}</strong> de <strong>{maxScore}</strong> pontos</p>
            <small>Você pode rejogar fases para tentar melhorar o resultado.</small>
          </FeedbackCard>

          <FeedbackCard title="Próximo objetivo sugerido" variant="warning">
            <p>
              {allCompleted
                ? 'Todas as fases foram concluídas.'
                // AQUI: Usando .topic em vez de .concept
                : `Jogar fase ${nextIndex + 1}: ${challenges[nextIndex]?.topic}`}
            </p>
            <small>Lembre-se: depure primeiro, responda depois.</small>
          </FeedbackCard>
        </div>

        <ProgressBar value={progress} label="Progresso da trilha" />
        <ProgressBar value={scoreProgress} label="Pontuação conquistada" />

        <div className="mapLegend" aria-label="Legenda do mapa de fases">
          <span><i className="legendDot completedDot" /> Concluída</span>
          <span><i className="legendDot unlockedDot" /> Disponível</span>
        </div>

        <div className="levelMap" aria-label="Seleção de fases">
          {challenges.map((challenge, index) => {
            const report = reportsByIndex[index];
            const status = getLevelStatus(index, reportsByIndex);
            const canPlay = status !== 'locked';

            return (
              <article key={challenge.id} className={`levelCard ${status}`}>
                <div className="levelCardTop">
                  <div className="levelNodeNumber">{index + 1}</div>
                  <span className={`statusPill ${status}`}>{getStatusLabel(status)}</span>
                </div>

                <h3>{challenge.title}</h3>

                <div className="levelMeta">
                  <span>{challenge.level}</span>
                  <span>{challenge.topic}</span>
                  <span>{challenge.language}</span>
                </div>

                <p>{challenge.debuggerGoal}</p>

                <div className="levelScore">
                  {report ? (
                    <>
                      <strong>{report.results.earned} pts</strong>
                      <small>
                        Linha {report.results.lineCorrect ? '✓' : '×'} · Tipo {report.results.typeCorrect ? '✓' : '×'} · Correção {report.results.correctionCorrect ? '✓' : '×'}
                      </small>
                    </>
                  ) : canPlay ? (
                    <>
                      <strong>Nova fase</strong>
                      <small>Analise o código no modo debug.</small>
                    </>
                  ) : null}
                </div>

                <button
                  className={status === 'completed' ? 'ghostButton fullWidth' : 'primaryButton fullWidth'}
                  type="button"
                  disabled={!canPlay}
                  onClick={() => onSelectLevel(index)}
                >
                  {status === 'completed' ? 'Revisar fase' : 'Jogar fase'}
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}