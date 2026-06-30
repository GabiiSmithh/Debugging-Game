import FeedbackCard from '../components/FeedbackCard.jsx';

export default function Context({ onContinue }) {
  return (
    <main className="screen contentScreen">
      <section className="pageCard">
        <p className="eyebrow">Antes de jogar</p>
        <h2>O que é debugging?</h2>
        <p>
          Debugging é o processo de investigar um programa para descobrir por que ele não se comporta como esperado.
          Em vez de apenas tentar trocar linhas aleatoriamente, o depurador observa o fluxo de execução, os valores das variáveis,
          a saída produzida e as mensagens de erro.
        </p>

        <div className="cardsGrid">
          <FeedbackCard title="Erro sintático" variant="danger">
            <p>O código está escrito de forma inválida e o programa nem consegue iniciar.</p>
            <small>Exemplos: falta de dois-pontos, aspas abertas ou parênteses não fechados.</small>
          </FeedbackCard>

          <FeedbackCard title="Erro lógico" variant="warning">
            <p>O programa roda, mas produz um resultado errado.</p>
            <small>Exemplos: operador errado, condição invertida ou cálculo incorreto.</small>
          </FeedbackCard>

          <FeedbackCard title="Erro de execução" variant="info">
            <p>O programa começa a rodar, mas falha durante a execução.</p>
            <small>Exemplos: divisão por zero, índice fora da lista ou variável inexistente.</small>
          </FeedbackCard>
        </div>

        <div className="debugProcess">
          <h3>Como usar o modo debug do jogo</h3>
          <ol>
            <li>Leia a saída esperada e a saída obtida.</li>
            <li>Abra o modo debug e execute os passos.</li>
            <li>Observe qual linha está ativa em cada momento.</li>
            <li>Compare os valores das variáveis com o que deveria acontecer.</li>
            <li>Quando encontrar uma inconsistência, marque a linha, o tipo de erro e a correção.</li>
          </ol>
        </div>

        <button className="primaryButton" type="button" onClick={onContinue}>
          Ir para o tutorial
        </button>
      </section>
    </main>
  );
}
