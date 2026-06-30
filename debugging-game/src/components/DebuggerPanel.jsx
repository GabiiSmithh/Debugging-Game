import { useMemo, useState } from 'react';

export default function DebuggerPanel({ challenge, onActiveLineChange }) {
  const [stepIndex, setStepIndex] = useState(0);
  const steps = challenge.debugSteps ?? [];
  const currentStep = steps[stepIndex] ?? null;

  const bugStepIndex = useMemo(() => {
    const found = steps.findIndex((step) => step.isBug);
    return found >= 0 ? found : Math.max(steps.length - 1, 0);
  }, [steps]);

  function updateStep(nextIndex) {
    const safeIndex = Math.min(Math.max(nextIndex, 0), steps.length - 1);
    setStepIndex(safeIndex);
    onActiveLineChange?.(steps[safeIndex]?.line ?? null);
  }

  function resetDebugger() {
    updateStep(0);
  }

  function runToBug() {
    updateStep(bugStepIndex);
  }

  if (!currentStep) {
    return null;
  }

  const variableEntries = Object.entries(currentStep.variables ?? {});
  const stack = currentStep.callStack ?? [];

  return (
    <section className="debuggerPanel" aria-label="Modo debug passo a passo">
      <div className="debuggerHeader">
        <div>
          <p className="eyebrow">Modo debug</p>
          <h3>{currentStep.title}</h3>
        </div>
        <span className={`debugLineBadge ${currentStep.isBug ? 'bug' : ''}`}>
          Linha {currentStep.line}
        </span>
      </div>

      <p className="debugGoal">Objetivo: {challenge.debuggerGoal}</p>

      <div className="debugTimeline" aria-label={`Passo ${stepIndex + 1} de ${steps.length}`}>
        {steps.map((step, index) => (
          <button
            type="button"
            key={`${step.line}-${step.title}`}
            className={`timelineDot ${index === stepIndex ? 'active' : ''} ${step.isBug ? 'bug' : ''}`}
            onClick={() => updateStep(index)}
            aria-label={`Ir para passo ${index + 1}: ${step.title}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="debugDetailGrid">
        <div className="debugCard wide">
          <span>Ação executada</span>
          <p>{currentStep.action}</p>
        </div>

        <div className="debugCard wide">
          <span>Observação do depurador</span>
          <p>{currentStep.observation}</p>
        </div>

        <div className="debugCard">
          <span>Variáveis</span>
          {variableEntries.length > 0 ? (
            <dl className="variablesList">
              {variableEntries.map(([name, value]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p>Nenhuma variável criada ainda.</p>
          )}
        </div>

        <div className="debugCard">
          <span>Pilha de chamadas</span>
          {stack.length > 0 ? (
            <ol className="callStackList">
              {stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          ) : (
            <p>Sem chamadas no momento.</p>
          )}
        </div>

        <div className="debugCard wide consoleCard">
          <span>Console até agora</span>
          <pre>{currentStep.output || 'Sem saída ainda.'}</pre>
        </div>
      </div>

      <div className="debuggerActions">
        <button type="button" className="ghostButton" onClick={resetDebugger}>
          Reiniciar debug
        </button>
        <button type="button" className="ghostButton" onClick={() => updateStep(stepIndex - 1)} disabled={stepIndex === 0}>
          Passo anterior
        </button>
        <button type="button" className="primaryButton compactButton" onClick={() => updateStep(stepIndex + 1)} disabled={stepIndex === steps.length - 1}>
          Executar próximo passo
        </button>
        <button type="button" className="ghostButton" onClick={runToBug}>
          Ir até possível bug
        </button>
      </div>
    </section>
  );
}
