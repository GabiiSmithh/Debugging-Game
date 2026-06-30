import CodeBlock from '../components/CodeBlock.jsx';
import FeedbackCard from '../components/FeedbackCard.jsx';

export default function Feedback({
  report,
  currentScore,
  allCompleted,
  hasNextChallenge,
  onBackToLevels,
  onNextChallenge,
  onShowResults
}) {
  const { challenge, results, answers } = report;

  return (
    <main className="screen contentScreen">
      <section className="pageCard">
        <p className="eyebrow">Feedback da fase</p>
        <h2>{challenge.title}</h2>
        <p>
          Você conquistou <strong>{results.earned}</strong> pontos nesta fase. Pontuação acumulada: <strong>{currentScore}</strong>.
        </p>

        {results.usedRunToBug && (
          <FeedbackCard title="Run to Bug usado" variant="warning">
            <p>Esta fase foi concluída com ajuda de revelação. A linha, o tipo de erro e a correção aparecem como referência de estudo, mas a pontuação da fase foi zerada.</p>
          </FeedbackCard>
        )}

        <div className="scoreBanner threeScores">
          <div>
            <span>Linha</span>
            <strong>{results.lineCorrect ? '✓' : '×'}</strong>
            <small>{results.usedRunToBug ? 'Revelado pelo Run to Bug' : `Sua resposta: linha ${answers.line ?? 'não respondida'}`}</small>
          </div>
          <div>
            <span>Tipo</span>
            <strong>{results.typeCorrect ? '✓' : '×'}</strong>
            <small>{results.usedRunToBug ? 'Revelado pelo Run to Bug' : answers.type || 'não respondido'}</small>
          </div>
          <div>
            <span>Correção</span>
            <strong>{results.correctionCorrect ? '✓' : '×'}</strong>
            <small>{results.usedRunToBug ? 'Revelado pelo Run to Bug' : answers.correction || 'não respondida'}</small>
          </div>
        </div>

        <div className="cardsGrid twoColumns">
          <FeedbackCard title="Explicação" variant="success">
            <p>{challenge.explanation}</p>
          </FeedbackCard>

          <FeedbackCard title="Dica de depuração" variant="info">
            <p>{challenge.debugTip}</p>
          </FeedbackCard>
        </div>

        <div className="solutionGrid">
          <div>
            <div className="sectionTitleRow">
              <h3>Linha problemática</h3>
              <span className="pill">Linha {challenge.correctLine}</span>
            </div>
            <CodeBlock
              code={challenge.code}
              selectedLine={answers.line}
              correctLine={challenge.correctLine}
              showCorrect
              bugLine={challenge.correctLine}
              language={challenge.language}
            />
          </div>

          {challenge.correctedCode && (
            <div>
              <div className="sectionTitleRow">
                <h3>Trecho corrigido</h3>
                <span className="pill">Correção</span>
              </div>
              <CodeBlock code={challenge.correctedCode} language={challenge.language} />
            </div>
          )}
        </div>

        <div className="feedbackActions actionsRow">
          <button className="primaryButton" type="button" onClick={onBackToLevels}>
            Voltar para seleção de fases
          </button>

          {hasNextChallenge && !allCompleted && (
            <button className="ghostButton" type="button" onClick={onNextChallenge}>
              Jogar próxima fase
            </button>
          )}

          {allCompleted && (
            <button className="ghostButton" type="button" onClick={onShowResults}>
              Ver resultado final
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
