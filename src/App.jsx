import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Context from './pages/Context.jsx';
import Tutorial from './pages/Tutorial.jsx';
import LevelSelect from './pages/LevelSelect.jsx';
import Challenge from './pages/Challenge.jsx';
import Feedback from './pages/Feedback.jsx';
import Results from './pages/Results.jsx';
import { challenges } from './data/challenges.js';

const screens = {
  HOME: 'home',
  CONTEXT: 'context',
  TUTORIAL: 'tutorial',
  LEVEL_SELECT: 'level-select',
  CHALLENGE: 'challenge',
  FEEDBACK: 'feedback',
  RESULTS: 'results'
};

export default function App() {
  const [screen, setScreen] = useState(screens.HOME);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reportsByIndex, setReportsByIndex] = useState({});
  const [lastReport, setLastReport] = useState(null);

  const reports = useMemo(
    () => Object.keys(reportsByIndex)
      .map((key) => reportsByIndex[key])
      .sort((a, b) => a.challengeIndex - b.challengeIndex),
    [reportsByIndex]
  );

  const score = useMemo(
    () => reports.reduce((total, report) => total + report.results.earned, 0),
    [reports]
  );

  const completedCount = reports.length;
  const allCompleted = completedCount === challenges.length;

  function startGame() {
    setScreen(screens.CONTEXT);
  }

  function openLevelSelect() {
    setScreen(screens.LEVEL_SELECT);
  }

  function selectLevel(index) {
    setCurrentIndex(index);
    setScreen(screens.CHALLENGE);
  }

  function handleChallengeComplete(report) {
    const reportWithIndex = {
      ...report,
      challengeIndex: currentIndex
    };

    setReportsByIndex((currentReports) => {
      const previousBest = currentReports[currentIndex];

      if (previousBest && previousBest.results.earned > reportWithIndex.results.earned) {
        return currentReports;
      }

      return {
        ...currentReports,
        [currentIndex]: reportWithIndex
      };
    });
    setLastReport(reportWithIndex);
    setScreen(screens.FEEDBACK);
  }

  function handleNextChallengeFromFeedback() {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= challenges.length) {
      setScreen(screens.RESULTS);
      return;
    }

    setCurrentIndex(nextIndex);
    setScreen(screens.CHALLENGE);
  }

  function restartGame() {
    setScreen(screens.HOME);
    setCurrentIndex(0);
    setReportsByIndex({});
    setLastReport(null);
  }

  function getHeaderPhaseLabel() {
    if (screen === screens.LEVEL_SELECT || screen === screens.RESULTS) {
      return `${completedCount} de ${challenges.length} fases concluídas`;
    }

    if (screen === screens.CHALLENGE || screen === screens.FEEDBACK) {
      return `Fase ${currentIndex + 1} de ${challenges.length}`;
    }

    return '';
  }

  return (
   <div className="appShell">
      <Header 
        score={score} 
        phaseLabel={getHeaderPhaseLabel()} 
        currentScreen={screen}
        onNavigate={setScreen} 
      />

      {screen === screens.HOME && <Home onStart={startGame} />}

      {screen === screens.CONTEXT && <Context onContinue={() => setScreen(screens.TUTORIAL)} />}

      {screen === screens.TUTORIAL && <Tutorial onFinish={openLevelSelect} onSkip={openLevelSelect} />}

      {screen === screens.LEVEL_SELECT && (
        <LevelSelect
          challenges={challenges}
          reportsByIndex={reportsByIndex}
          score={score}
          onSelectLevel={selectLevel}
          onShowResults={() => setScreen(screens.RESULTS)}
          onRestartProgress={restartGame}
        />
      )}

      {screen === screens.CHALLENGE && (
        <Challenge
          key={`${challenges[currentIndex].id}-${reportsByIndex[currentIndex]?.results.earned ?? 'new'}`}
          challenge={challenges[currentIndex]}
          index={currentIndex}
          total={challenges.length}
          score={score}
          onComplete={handleChallengeComplete}
        />
      )}

      {screen === screens.FEEDBACK && lastReport && (
        <Feedback
          report={lastReport}
          currentScore={score}
          allCompleted={allCompleted}
          hasNextChallenge={currentIndex < challenges.length - 1}
          onBackToLevels={openLevelSelect}
          onNextChallenge={handleNextChallengeFromFeedback}
          onShowResults={() => setScreen(screens.RESULTS)}
        />
      )}

      {screen === screens.RESULTS && (
        <Results
          score={score}
          totalChallenges={challenges.length}
          reports={reports}
          onRestart={restartGame}
          onBackToLevels={openLevelSelect}
        />
      )}
    </div>
  );
}