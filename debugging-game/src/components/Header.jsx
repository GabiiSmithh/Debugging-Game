export default function Header({ score = 0, phaseLabel = '', currentScreen, onNavigate }) {
  const isPlaying = currentScreen !== 'home' && currentScreen !== 'context' && currentScreen !== 'tutorial';

  return (
    <header className="header">
      <div 
        className="headerBrand" 
        onClick={() => onNavigate('home')} 
        role="button" 
        tabIndex={0}
        title="Voltar ao Início"
      >
        <p className="eyebrow">Simulador de Debugging</p>
        <h1>DebugGame</h1>
      </div>

      {isPlaying && (
        <nav className="headerNav">
          <button 
            className="ghostButton compactButton navButton" 
            onClick={() => onNavigate('level-select')}
          >
            ⛐ Mapa de Fases
          </button>
        </nav>
      )}

      <div className="headerStats" aria-label="Status do jogador">
        <span>{score} pontos</span>
        {phaseLabel && <span>{phaseLabel}</span>}
      </div>
    </header>
  );
}