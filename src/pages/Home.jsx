export default function Home({ onStart }) {
  return (
    <main className="screen heroScreen">
      <section className="heroCard">
        <p className="eyebrow">Aprenda praticando</p>
        <h2>Simulador de Debugging para Programação</h2>
        <p>
          Resolva bugs como em um jogo de fases. Agora você pode abrir um modo debug, executar o código passo a passo,
          observar variáveis e entender por que a saída obtida ficou diferente da esperada.
        </p>

        <div className="featureGrid fourFeatures">
          <div>
            <strong>1</strong>
            <span>Execute o debug passo a passo</span>
          </div>
          <div>
            <strong>2</strong>
            <span>Observe variáveis e console</span>
          </div>
          <div>
            <strong>3</strong>
            <span>Identifique o bug</span>
          </div>
          <div>
            <strong>4</strong>
            <span>Escolha a correção</span>
          </div>
        </div>

        <button className="primaryButton" type="button" onClick={onStart}>
          Começar
        </button>
      </section>
    </main>
  );
}
