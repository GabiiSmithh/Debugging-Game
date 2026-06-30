import { useEffect, useMemo, useRef, useState } from 'react';
import CodeBlock from './CodeBlock.jsx';

function getFileName(language, id) {
  const extension = language === 'JavaScript' ? 'js' : 'py';
  return `fase-${id}.${extension}`;
}

export default function DebugWorkspace({
  challenge,
  selectedLine,
  correctLine,
  showCorrect = false,
  bugLine,
  canSelectLine = false,
  onSelectLine,
  onDebugStateChange,
  runToBugRequest = 0
}) {
  const steps = challenge.debugSteps ?? [];
  const [stepIndex, setStepIndex] = useState(0);
  const [breakpoints, setBreakpoints] = useState([]);
  const previousRunToBugRequest = useRef(runToBugRequest);
  const currentStep = steps[stepIndex] ?? null;

  const allowedModes = challenge.allowedDebugModes || ['step', 'breakpoint'];
  const canStep = allowedModes.includes('step');
  const canBreakpoint = allowedModes.includes('breakpoint');
  const isObserveOnly = allowedModes.includes('observe');

  const bugStepIndex = useMemo(() => {
    const found = steps.findIndex((step) => step.isBug);
    return found >= 0 ? found : Math.max(steps.length - 1, 0);
  }, [steps]);

  const sortedBreakpoints = useMemo(() => [...breakpoints].sort((a, b) => a - b), [breakpoints]);
  const visitedBug = stepIndex >= bugStepIndex;
  const isAtEnd = stepIndex === steps.length - 1;
  const fileName = getFileName(challenge.language, challenge.id);

  useEffect(() => {
    setStepIndex(0);
    setBreakpoints([]);
    previousRunToBugRequest.current = runToBugRequest;
  }, [challenge.id]);

  useEffect(() => {
    if (runToBugRequest === previousRunToBugRequest.current) return;
    previousRunToBugRequest.current = runToBugRequest;
    if (steps.length) setStepIndex(bugStepIndex);
  }, [runToBugRequest, bugStepIndex, steps.length]);

  useEffect(() => {
    onDebugStateChange?.({
      stepIndex,
      totalSteps: steps.length,
      currentStep,
      visitedBug,
      isAtEnd,
      bugStepIndex,
      breakpoints: sortedBreakpoints
    });
  }, [stepIndex, steps.length, currentStep, visitedBug, isAtEnd, bugStepIndex, sortedBreakpoints, onDebugStateChange]);

  function updateStep(nextIndex) {
    if (!steps.length) return;
    const safeIndex = Math.min(Math.max(nextIndex, 0), steps.length - 1);
    setStepIndex(safeIndex);
  }

  function resetDebugger() {
    updateStep(0);
  }

  function continueToNextBreakpointOrEnd() {
    const nextBreakpointStep = steps.findIndex((step, index) => (
      index > stepIndex && sortedBreakpoints.includes(step.line)
    ));
    updateStep(nextBreakpointStep >= 0 ? nextBreakpointStep : steps.length - 1);
  }

  function toggleBreakpoint(lineNumber) {
    if (!canBreakpoint) return;
    setBreakpoints((current) => (
      current.includes(lineNumber)
        ? current.filter((line) => line !== lineNumber)
        : [...current, lineNumber]
    ));
  }

  if (!currentStep) return null;

  const variableEntries = Object.entries(currentStep.variables ?? {});

  return (
    <section className="vsCodeShell" aria-label="Ambiente de depuração">
      <div className="vsCodeTitleBar">
        <div className="trafficLights" aria-hidden="true"><span /><span /><span /></div>
        <strong>DebugEd Studio</strong>
        <span>{fileName}</span>
      </div>

      <div className="vsCodeMainArea">
        <div className="activityBar">
          <span className="activityIcon visualOnly" aria-hidden="true">▦</span>
          <span className="activityIcon active">▶</span>
        </div>

        <aside className="debugSidebar" aria-label="Informações do debug">
          <div className="sidebarHeader">
            <span>EXECUTAR E DEPURAR</span>
            <strong>{challenge.language}</strong>
          </div>

          <div className="debugAccordion open">
            <h4>Variáveis</h4>
            {variableEntries.length > 0 ? (
              <dl className="vsVariablesList">
                {variableEntries.map(([name, value]) => (
                  <div key={name}><dt>{name}</dt><dd>{value}</dd></div>
                ))}
              </dl>
            ) : <p className="emptyDebuggerText">Nenhuma variável criada.</p>}
          </div>

          <div className="debugAccordion open">
            <h4>Inspecionar</h4>
            <dl className="vsVariablesList">
              <div><dt>linha_atual</dt><dd>{currentStep.line}</dd></div>
              <div><dt>passo</dt><dd>{stepIndex + 1}/{steps.length}</dd></div>
            </dl>
          </div>

          {!isObserveOnly && (
            <div className="debugAccordion open subtleAccordion">
              <h4>Pontos de Parada</h4>
              {!canBreakpoint ? (
                <p className="emptyDebuggerText">⛔ Pontos de parada desativados nesta fase. Use o botão Avançar.</p>
              ) : sortedBreakpoints.length > 0 ? (
                <ul className="breakpointList">
                  {sortedBreakpoints.map((line) => (
                    <li key={line}>
                      <button type="button" onClick={() => toggleBreakpoint(line)}>● Linha {line}</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="emptyDebuggerText">Clique ao lado do número da linha para adicionar.</p>
              )}
            </div>
          )}
        </aside>

        <section className="editorTerminalArea">
          <div className="debugToolbar" aria-label="Controles de debug">
            {isObserveOnly ? (
              <button className="toolbarButton primaryDebugControl" type="button" onClick={() => updateStep(bugStepIndex)}>
                ⟾ Analisar Arquivo
              </button>
            ) : (
              <>
                {canBreakpoint && (
                  <button className="toolbarButton mutedControl" type="button" onClick={continueToNextBreakpointOrEnd}>
                    ▶ Continuar
                  </button>
                )}
                {canStep && (
                  <button className="toolbarButton primaryDebugControl" type="button" onClick={() => updateStep(stepIndex + 1)} disabled={isAtEnd}>
                    ↷ Avançar
                  </button>
                )}
              </>
            )}
            <button className="toolbarButton secondaryControl" type="button" onClick={resetDebugger}>⟲ Reiniciar</button>
          </div>

          <div className="editorTabBar">
            <span className="editorTab activeTab">{fileName}</span>
            <span className="editorStatus">Lin {currentStep.line}, Col 1</span>
          </div>

          <div className="editorViewport">
            <CodeBlock
              code={challenge.code}
              selectedLine={selectedLine}
              correctLine={correctLine}
              showCorrect={showCorrect}
              activeLine={currentStep.line}
              bugLine={bugLine}
              onSelectLine={canSelectLine ? onSelectLine : undefined}
              language={challenge.language}
              breakpointLines={sortedBreakpoints}
              onToggleBreakpoint={canBreakpoint ? toggleBreakpoint : undefined}
            />
          </div>

          <div className="terminalPanel">
            <div className="terminalTabs">
              <span className="terminalTab activeTerminalTab">TERMINAL</span>
              <span className="terminalHint">Passo {stepIndex + 1} de {steps.length}</span>
            </div>
            <div className="terminalBody">
              <pre>{currentStep.output || 'Sem saída ainda.'}</pre>
              <p>{currentStep.action}</p>
              <small>{currentStep.observation}</small>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}