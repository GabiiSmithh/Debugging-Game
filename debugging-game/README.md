# DebugGame — Jogo Web de Simulação de Debugging

Objeto de aprendizagem em formato de jogo web para ensino de depuração de programas. O projeto foi pensado para estudantes de Ciência da Computação, Análise e Desenvolvimento de Sistemas, Engenharia de Software e áreas relacionadas.

## Objetivo

Ensinar conceitos básicos de debugging por meio de um simulador gamificado. O aluno passa por fases curtas em que precisa observar um código, comparar saídas, identificar a linha problemática, classificar o tipo de erro e escolher a correção adequada.

## Público-alvo

Estudantes da área de computação com conhecimentos básicos de programação.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- HTML
- CSS

O projeto é 100% frontend. Não utiliza backend, banco de dados, autenticação ou APIs externas.

## Como instalar e executar

```bash
npm install
npm run dev
```

Depois, acesse o endereço exibido pelo Vite no terminal, normalmente:

```bash
http://localhost:5173
```

## Fluxo do jogo

1. Tela inicial com apresentação do jogo.
2. Tela de contextualização sobre debugging.
3. Tutorial interativo.
4. Fases com desafios de código.
5. Feedback após cada fase.
6. Resultado final com pontuação.

Aqui está a versão atualizada e refinada dos pontos, refletindo todas as mudanças de design, mecânicas de restrição de ferramentas e o novo sistema de dicas que implementamos:

## Como funcionam as fases

Cada desafio é uma simulação de depuração baseada em um código. A estrutura de cada fase inclui:

* **Código com erro:** Um trecho de linguagem real (Python ou JavaScript).
* **Entradas do programa:** Dados iniciais visíveis para contextualizar o estado do programa.
* **Ambiente de depuração (Estilo VS Code):**
* **Painel lateral:** Variáveis, Inspecionar (Watch), Pilha de Chamadas e Pontos de Parada.
* **Editor central:** Onde se realiza a análise ativa.
* **Terminal:** Exibe a saída real conforme a execução avança.
* **Ferramentas de análise restritas:** Dependendo da fase, o aluno pode utilizar apenas *Step Into* (Avançar), apenas Pontos de Parada ou apenas Observação, forçando o aprendizado do uso adequado de cada recurso.
* **Etapas de Resposta:** Após a investigação, o aluno resolve o desafio em três passos: 1) Identificar a linha problemática, 2) Classificar o tipo de erro, 3) Selecionar a correção correta. 
Cada etapa correta vale 10 pontos. O recurso **Run to Bug** permite avançar direto ao erro e revelar a solução, mas não recebe pontos da fase.

## Dicas e Mecânicas de Resgate

* **Dicas Temporizadas:** O botão de dica é bloqueado inicialmente. Um temporizador de 30 segundos é ativado ao iniciar a fase; após esse tempo, o aluno pode liberar uma **Dica de Especialista** focada na lógica específica daquele bug.
* **Run to Bug:** Botão de revelar a resposta disponível desde o início. Ao confirmar o uso, o simulador salta para o ponto do erro e revela a correção, mas zera os pontos da fase.
* **Interface de Controle:** O fluxo de debug é separado da navegação das perguntas, deixando os controles de execução (Avançar, Continuar, Reiniciar) em uma barra inferior, simulando a experiência real de uma sessão de *debugging* sem interrupções.

## Ferramentas de Análise

* **Pontos de Parada (Breakpoints):** Ativados clicando na margem do editor. O painel lateral monitora os pontos ativos e o botão **Continuar** permite saltar entre eles.
* **Avançar (Step Into):** Permite acompanhar o fluxo linha a linha, essencial para diagnosticar erros de lógica e desvios de fluxo.
* **Análise Estática (Observação):** Em erros sintáticos, o simulador foca na capacidade do aluno em diagnosticar a falha antes mesmo da execução.

## Conceitos de debugging trabalhados

* **Tipologias de erro:** Sintático, Lógico e de Execução.
* **Controle de fluxo:** Erros em laços de repetição e condições `if/else`.
* **Análise de estado:** Comparação entre saída esperada, obtida e valores de variáveis.
* **Diagnóstico:** Identificação da linha problemática e classificação da natureza do bug.
* **Resolução:** Aplicação da correção que altera o comportamento do programa conforme esperado.