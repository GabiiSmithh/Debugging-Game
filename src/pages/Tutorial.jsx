import { useState } from 'react';
import { tutorialChallenge } from '../data/challenges.js';
import DebugWorkspace from '../components/DebugWorkspace.jsx';
import OptionButton from '../components/OptionButton.jsx';
import FeedbackCard from '../components/FeedbackCard.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

const tutorialSteps = [
  {
    title: 'Bem-vindo ao papel de depurador',
    text: 'Você receberá códigos com erros e precisará investigar como em uma IDE. Compare as entradas, a saída esperada, a saída obtida, as variáveis e o fluxo de execução.'
  },
  {
    title: 'Layout parecido com VS Code',
    text: 'A aba da esquerda mostra Variáveis, Inspecionar e Pontos de Parada. Para criar um ponto de parada, clique no círculo ao lado do número da linha no editor. O terminal embaixo mostra a saída atual.'
  },
  {
    title: 'Execute linha a linha',
    text: 'Use "Avançar" para executar uma linha por vez. Você também pode marcar pontos de parada na margem para o botão "Continuar" parar direto em uma linha específica.'
  },
  {
    title: 'Encontre a linha com erro',
    text: 'Depois de depurar, clique na linha problemática no editor ou escolha a alternativa ao lado.'
  },
  {
    title: 'Classifique o tipo de erro',
    text: 'Agora escolha se o problema é sintático, lógico ou de execução. Observe: o programa roda, mas produz um valor errado.'
  },
  {
    title: 'Escolha a correção',
    text: 'A melhor correção deve fazer o programa produzir a saída esperada. Para obter o dobro, o cálculo precisa multiplicar por 2.'
  },
  {
    title: 'Tutorial concluído',
    text: 'Agora você está pronto para começar os desafios. Nas fases, lembre-se: depure primeiro e responda depois.'
  }
];

export default function Tutorial({ onFinish, onSkip }) {
  const [step, setStep] = useState(0);
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCorrection, setSelectedCorrection] = useState('');
  const [message, setMessage] = useState('');
  const [debuggerState, setDebuggerState] = useState({ visitedBug: false, isAtEnd: false });

  const current = tutorialSteps[step];
  const progress = Math.round(((step + 1) / tutorialSteps.length) * 100);

  function goNext() {
    setMessage('');
    setStep((currentStep) => Math.min(currentStep + 1, tutorialSteps.length - 1));
  }

  function handleLineSelect(lineNumber) {
    setSelectedLine(lineNumber);
    if (lineNumber === tutorialChallenge.correctLine) {
      setMessage('Isso mesmo! A linha 2 calcula numero + 2, mas o objetivo é calcular o dobro.');
    } else {
      setMessage('Boa tentativa. Observe na aba Variáveis qual linha faz o resultado virar 7.');
    }
  }

  function handleTypeSelect(type) {
    setSelectedType(type);
    if (type === tutorialChallenge.errorType) {
      setMessage('Correto! O programa roda, mas gera 7 em vez de 10. Isso caracteriza erro lógico.');
    } else {
      setMessage('Quase. Como o código executa e apenas gera um valor errado, o erro é lógico.');
    }
  }

  function handleCorrectionSelect(correction) {
    setSelectedCorrection(correction);
    if (correction === tutorialChallenge.correctCorrection) {
      setMessage('Perfeito! Multiplicar por 2 corrige a função calcular_dobro.');
    } else {
      setMessage('Ainda não. A função dobro deve multiplicar o número por 2.');
    }
  }

  const canAdvanceFromDebug = step !== 2 || debuggerState.visitedBug || debuggerState.isAtEnd;
  const canAdvanceFromLine = step !== 3 || selectedLine === tutorialChallenge.correctLine;
  const canAdvanceFromType = step !== 4 || selectedType === tutorialChallenge.errorType;
  const canAdvanceFromCorrection = step !== 5 || selectedCorrection === tutorialChallenge.correctCorrection;
  const canAdvance = canAdvanceFromDebug && canAdvanceFromLine && canAdvanceFromType && canAdvanceFromCorrection;

  return (
    <main className="screen contentScreen wideScreen">
      <section className="pageCard vscodePageCard tutorialLayout">
        <div className="pageHeaderRow">
          <div>
            <p className="eyebrow">Tutorial interativo</p>
            <h2>{current.title}</h2>
          </div>
          <button type="button" className="ghostButton" onClick={onSkip}>
            Pular tutorial
          </button>
        </div>

        <ProgressBar value={progress} label="Tutorial" />

        <FeedbackCard title="Orientação" variant="info">
          <p>{current.text}</p>
        </FeedbackCard>

        <div className="challengeGrid vscodeChallengeGrid">
          <DebugWorkspace
            challenge={tutorialChallenge}
            selectedLine={selectedLine}
            correctLine={tutorialChallenge.correctLine}
            showCorrect={step > 3}
            bugLine={step > 3 ? tutorialChallenge.correctLine : null}
            canSelectLine={step === 3}
            onSelectLine={handleLineSelect}
            onDebugStateChange={setDebuggerState}
          />

          <aside className="missionPanel stickyPanel">
            <div className="outputGrid compactOutputs">
              {/* O Bloco de Entradas foi adicionado corretamente aqui, dentro do grid */}
              {tutorialChallenge.inputs && (
                <div className="outputCard inputs">
                  <span>Entradas do programa</span>
                  <strong>{tutorialChallenge.inputs}</strong>
                </div>
              )}
              <div className="outputCard expected">
                <span>Esperado</span>
                <strong>{tutorialChallenge.expectedOutput}</strong>
              </div>
              <div className="outputCard actual">
                <span>Obtido</span>
                <strong>{tutorialChallenge.actualOutput}</strong>
              </div>
            </div>

            {step <= 1 && (
              <FeedbackCard title="Como jogar" variant="warning">
                <p>Depure linha a linha, observe as Variáveis na esquerda e confira a saída parcial no terminal inferior.</p>
              </FeedbackCard>
            )}

            {step === 2 && (
              <FeedbackCard title="Tarefa" variant="warning">
                <p>Clique em “Avançar” até chegar ao cálculo suspeito. Opcionalmente, marque um ponto de parada ao lado de uma linha e use "Continuar".</p>
              </FeedbackCard>
            )}

            {step === 3 && (
              <div className="optionsArea">
                <h3>Qual linha contém o problema?</h3>
                {tutorialChallenge.optionsLine.map((line) => (
                  <OptionButton
                    key={line}
                    selected={selectedLine === line}
                    correct={selectedLine === line && line === tutorialChallenge.correctLine}
                    wrong={selectedLine === line && line !== tutorialChallenge.correctLine}
                    onClick={() => handleLineSelect(line)}
                  >
                    Linha {line}
                  </OptionButton>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="optionsArea">
                <h3>Qual é o tipo de erro?</h3>
                {tutorialChallenge.optionsType.map((type) => (
                  <OptionButton
                    key={type}
                    selected={selectedType === type}
                    correct={selectedType === type && type === tutorialChallenge.errorType}
                    wrong={selectedType === type && type !== tutorialChallenge.errorType}
                    onClick={() => handleTypeSelect(type)}
                  >
                    {type}
                  </OptionButton>
                ))}
              </div>
            )}

            {step === 5 && (
              <div className="optionsArea correctionOptions">
                <h3>Qual correção resolve o bug?</h3>
                {tutorialChallenge.correctionOptions.map((correction) => (
                  <OptionButton
                    key={correction}
                    selected={selectedCorrection === correction}
                    correct={selectedCorrection === correction && correction === tutorialChallenge.correctCorrection}
                    wrong={selectedCorrection === correction && correction !== tutorialChallenge.correctCorrection}
                    onClick={() => handleCorrectionSelect(correction)}
                  >
                    <code>{correction}</code>
                  </OptionButton>
                ))}
              </div>
            )}

            {message && (
              <FeedbackCard title="Feedback imediato" variant="success">
                <p>{message}</p>
              </FeedbackCard>
            )}

            {step < tutorialSteps.length - 1 ? (
              <button className="primaryButton fullWidth" type="button" onClick={goNext} disabled={!canAdvance}>
                Continuar
              </button>
            ) : (
              <button className="primaryButton fullWidth" type="button" onClick={onFinish}>
                Começar primeira fase
              </button>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}