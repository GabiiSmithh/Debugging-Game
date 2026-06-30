import { useEffect, useMemo, useState } from 'react';
import DebugWorkspace from '../components/DebugWorkspace.jsx';
import OptionButton from '../components/OptionButton.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import FeedbackCard from '../components/FeedbackCard.jsx';
import { getStepScore } from '../utils/score.js';

// Tempo em segundos para liberar a dica
const HINT_TIME_SECONDS = 30;

const steps = [
  { id: 'debug', title: '0. Depure linha a linha', instruction: 'Use o painel de Debug para investigar o estado real do programa.' },
  { id: 'line', title: '1. Identifique a linha problemática', instruction: 'Clique na linha que causou o bug.' },
  { id: 'type', title: '2. Classifique o erro', instruction: 'Escolha se o bug é sintático, lógico ou de execução.' },
  { id: 'correction', title: '3. Escolha a correção', instruction: 'Selecione a mudança correta.' }
];

export default function Challenge({ challenge, index, total, score, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({ line: null, type: '', correction: '' });
  const [stepFeedback, setStepFeedback] = useState('');
  const [lockedSteps, setLockedSteps] = useState({ debug: false, line: false, type: false, correction: false });
  const [debuggerState, setDebuggerState] = useState({ visitedBug: false, isAtEnd: false, currentStep: null });
  const [showRunToBugConfirm, setShowRunToBugConfirm] = useState(false);
  const [usedRunToBug, setUsedRunToBug] = useState(false);
  const [runToBugRequest, setRunToBugRequest] = useState(0);

  // Estados do Temporizador
  const [timeLeft, setTimeLeft] = useState(HINT_TIME_SECONDS);
  const [hintUnlocked, setHintUnlocked] = useState(false);
  const [hintsShow, setHintsShow] = useState(false);

  useEffect(() => {
    setTimeLeft(HINT_TIME_SECONDS);
    setHintUnlocked(false);
    setHintsShow(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setHintUnlocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [challenge.id]);

  const currentStep = steps[stepIndex];
  const progress = Math.round((index / total) * 100);

  const results = useMemo(() => {
    const lineCorrect = answers.line === challenge.correctLine;
    const typeCorrect = answers.type === challenge.errorType;
    const correctionCorrect = answers.correction === challenge.correctCorrection;

    return {
      debugUsed: lockedSteps.debug,
      lineCorrect,
      typeCorrect,
      correctionCorrect,
      usedRunToBug,
      earned: usedRunToBug ? 0 : getStepScore(lineCorrect) + getStepScore(typeCorrect) + getStepScore(correctionCorrect)
    };
  }, [answers, challenge, lockedSteps.debug, usedRunToBug]);

  function confirmRunToBug() {
    setShowRunToBugConfirm(false);
    setUsedRunToBug(true);
    setRunToBugRequest((curr) => curr + 1);
    setAnswers({ line: challenge.correctLine, type: challenge.errorType, correction: challenge.correctCorrection });
    setLockedSteps({ debug: true, line: true, type: true, correction: true });
    setStepIndex(3);
    setStepFeedback('Run to Bug usado: correção revelada (Fase valerá 0 pontos).');
  }

  function finishDebugAndGoToQuestions() {
    if (!debuggerState.visitedBug && !debuggerState.isAtEnd) {
      setStepFeedback('Execute o debug mais um pouco até ver a linha suspeita.');
      return;
    }
    setLockedSteps((curr) => ({ ...curr, debug: true }));
    setStepFeedback('');
    setStepIndex(1);
  }

  function handleSelect(field, value, isCorrect) {
    if (lockedSteps[field]) return;
    setAnswers((curr) => ({ ...curr, [field]: value }));
    setLockedSteps((curr) => ({ ...curr, [field]: true }));

    let feedbackMsg = '';
    if (field === 'line') feedbackMsg = isCorrect ? 'Linha correta identificada!' : 'Não é a linha ideal, avance com cuidado.';
    if (field === 'type') feedbackMsg = isCorrect ? 'Classificação correta!' : 'Incorreto. Leia as definições de erro novamente.';
    if (field === 'correction') feedbackMsg = isCorrect ? 'Excelente! Correção validada.' : 'Esta correção não resolve o problema.';
    
    setStepFeedback(feedbackMsg);
  }

  function handlePrimaryAction() {
    if (currentStep.id === 'debug') {
      finishDebugAndGoToQuestions();
      return;
    }
    setStepFeedback('');
    if (stepIndex < steps.length - 1) {
      setStepIndex((curr) => curr + 1);
    } else {
      onComplete({ challenge, answers, results });
    }
  }

  const primaryActionDisabled = currentStep.id !== 'debug' && !lockedSteps[currentStep.id];

  return (
    <main className="screen contentScreen wideScreen">
      <section className="pageCard vscodePageCard">
        <div className="pageHeaderRow">
          <div>
            <p className="eyebrow">Fase {index + 1}</p>
            <h2>{challenge.title}</h2>
          </div>
          <div className="badgeGroup">
            <span className="levelBadge">{challenge.level}</span>
            <span className="levelBadge">{challenge.topic}</span>
          </div>
        </div>

        <ProgressBar value={progress} label="Progresso das fases" />

        <div className="challengeGrid vscodeChallengeGrid">
          <DebugWorkspace
            challenge={challenge}
            selectedLine={answers.line}
            correctLine={challenge.correctLine}
            showCorrect={lockedSteps.line || usedRunToBug}
            bugLine={(lockedSteps.line || usedRunToBug) ? challenge.correctLine : null}
            canSelectLine={currentStep.id === 'line'}
            onSelectLine={(l) => handleSelect('line', l, l === challenge.correctLine)}
            onDebugStateChange={setDebuggerState}
            runToBugRequest={runToBugRequest}
          />

          <aside className="missionPanel stickyPanel">
            <div className="outputGrid compactOutputs">
              {challenge.inputs && (
                <div className="outputCard inputs"><span>Entradas</span><strong>{challenge.inputs}</strong></div>
              )}
              <div className="outputCard expected"><span>Esperado</span><strong>{challenge.expectedOutput}</strong></div>
              <div className="outputCard actual"><span>Obtido</span><strong>{challenge.actualOutput}</strong></div>
            </div>

            <div className="stepBox">
              <h3>{currentStep.title}</h3>
              <p>{currentStep.instruction}</p>
            </div>

            {hintUnlocked && hintsShow && (
              <FeedbackCard title="Dica Especialista" variant="warning">
                <p>{challenge.debugTip}</p>
              </FeedbackCard>
            )}

            {usedRunToBug && (
              <FeedbackCard title="Correção revelada" variant="warning">
                <p><strong>Correção:</strong> <code>{challenge.correctCorrection}</code></p>
              </FeedbackCard>
            )}

            {currentStep.id === 'line' && (
              <div className="optionsArea">
                <h3>Selecione a linha problemática:</h3>
                {challenge.optionsLine.map((line) => (
                  <OptionButton
                    key={line} selected={answers.line === line} correct={answers.line === line && results.lineCorrect}
                    wrong={answers.line === line && lockedSteps.line && !results.lineCorrect} disabled={lockedSteps.line}
                    onClick={() => handleSelect('line', line, line === challenge.correctLine)}
                  >
                    Linha {line}
                  </OptionButton>
                ))}
              </div>
            )}

            {currentStep.id === 'type' && (
              <div className="optionsArea">
                {challenge.optionsType.map((type) => (
                  <OptionButton
                    key={type} selected={answers.type === type} correct={answers.type === type && results.typeCorrect}
                    wrong={answers.type === type && lockedSteps.type && !results.typeCorrect} disabled={lockedSteps.type}
                    onClick={() => handleSelect('type', type, type === challenge.errorType)}
                  >
                    {type}
                  </OptionButton>
                ))}
              </div>
            )}

            {currentStep.id === 'correction' && (
              <div className="optionsArea correctionOptions">
                {challenge.correctionOptions.map((correction) => (
                  <OptionButton
                    key={correction} selected={answers.correction === correction} correct={answers.correction === correction && results.correctionCorrect}
                    wrong={answers.correction === correction && lockedSteps.correction && !results.correctionCorrect} disabled={lockedSteps.correction}
                    onClick={() => handleSelect('correction', correction, correction === challenge.correctCorrection)}
                  >
                    <code>{correction}</code>
                  </OptionButton>
                ))}
              </div>
            )}

            {stepFeedback && <FeedbackCard title="Feedback" variant="success"><p>{stepFeedback}</p></FeedbackCard>}
            <div className="miniScoreCard"><span>Pontuação atual</span><strong>{score} pontos</strong></div>
          </aside>
        </div>

        <div className="debugNavigationDock">
          <div className="hintControlGroup">
            <button
              className={`hintToggleButton ${hintsShow ? 'active' : ''}`}
              type="button"
              disabled={!hintUnlocked}
              onClick={() => setHintsShow(!hintsShow)}
            >
              {hintUnlocked ? (hintsShow ? 'Ocultar Dica' : 'Exibir Dica') : `Dica em ${timeLeft}s`}
            </button>
            <span>{hintUnlocked ? 'Uma dica de especialista foi liberada para esta fase.' : 'Aguarde o temporizador para liberar dicas.'}</span>
          </div>

          <div className="dockActionGroup">
            <button className="runToBugButton" type="button" disabled={usedRunToBug} onClick={() => setShowRunToBugConfirm(true)}>
              ◆ Run to Bug
            </button>
            <button className="primaryButton answerButton" type="button" disabled={primaryActionDisabled} onClick={handlePrimaryAction}>
              {currentStep.id === 'debug' ? 'Ir para Perguntas' : (stepIndex < steps.length - 1 ? 'Próxima pergunta' : 'Ver feedback')}
            </button>
          </div>
        </div>

        {showRunToBugConfirm && (
          <div className="modalBackdrop" role="presentation" onClick={() => setShowRunToBugConfirm(false)}>
            <section className="confirmationModal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <p className="eyebrow">Ajuda de emergência</p>
              <h3>Usar Run to Bug?</h3>
              <p>O simulador avançará até o erro e mostrará a resposta final. <strong>Atenção: esta fase valerá 0 pontos.</strong></p>
              <div className="modalActionRow">
                <button className="ghostButton" type="button" onClick={() => setShowRunToBugConfirm(false)}>Continuar tentando</button>
                <button className="dangerButton" type="button" onClick={confirmRunToBug}>Revelar e zerar pontos</button>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}