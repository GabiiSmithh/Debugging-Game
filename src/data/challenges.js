export const tutorialChallenge = {
  id: 'tutorial',
  title: 'Tutorial: depurando uma função simples',
  level: 'Tutorial',
  concept: 'Erro lógico',
  topic: 'Lógica Básica',
  language: 'Python',
  inputs: 'entrada = 5',
  allowedDebugModes: ['step', 'breakpoint'],
  code: [
    'def calcular_dobro(numero):',
    '    resultado = numero + 2',
    '    return resultado',
    '',
    'entrada = 5',
    'resposta = calcular_dobro(entrada)',
    'print(resposta)'
  ],
  expectedOutput: '10',
  actualOutput: '7',
  correctLine: 2,
  errorType: 'Erro lógico',
  optionsLine: [1, 2, 6],
  optionsType: ['Erro sintático', 'Erro lógico', 'Erro de execução'],
  correctionOptions: [
    'resultado = numero * 2',
    'resultado = numero - 2',
    'resultado = numero / 2'
  ],
  correctCorrection: 'resultado = numero * 2',
  correctedCode: [
    'def calcular_dobro(numero):',
    '    resultado = numero * 2',
    '    return resultado',
    '',
    'entrada = 5',
    'resposta = calcular_dobro(entrada)',
    'print(resposta)'
  ],
  explanation: 'A função deveria calcular o dobro do número. O programa executa, mas usa soma com 2 em vez de multiplicação por 2.',
  debugTip: 'Use o modo debug para acompanhar os valores das variáveis. Quando numero vale 5, resultado deveria virar 10, mas vira 7.',
  debuggerGoal: 'Seguir a ordem real: definir função, preparar entrada, chamar a função, entrar nela, retornar e imprimir.',
  debugSteps: [
    {
      line: 1,
      title: 'Função registrada',
      action: 'O interpretador registra a função calcular_dobro, mas ainda não executa o corpo dela.',
      variables: {},
      output: '',
      callStack: ['global'],
      observation: 'Em Python, o corpo da função só roda quando ela é chamada.'
    },
    {
      line: 5,
      title: 'Entrada criada',
      action: 'A variável entrada recebe 5.',
      variables: { entrada: '5' },
      output: '',
      callStack: ['global'],
      observation: 'Este é o valor que será enviado para a função.'
    },
    {
      line: 6,
      title: 'Chamada da função',
      action: 'A expressão calcular_dobro(entrada) chama a função com numero = 5.',
      variables: { entrada: '5', resposta: 'aguardando retorno' },
      output: '',
      callStack: ['global'],
      observation: 'O próximo passo entra no corpo da função.'
    },
    {
      line: 2,
      title: 'Cálculo executado dentro da função',
      action: 'A função calcula resultado usando numero + 2.',
      variables: { numero: '5', resultado: '7' },
      output: '',
      callStack: ['global', 'calcular_dobro(5)'],
      observation: 'Aqui o valor deixa de seguir a regra: o dobro de 5 deveria ser 10, não 7.',
      isBug: true
    },
    {
      line: 3,
      title: 'Retorno da função',
      action: 'A função retorna o valor armazenado em resultado.',
      variables: { numero: '5', resultado: '7', retorno: '7' },
      output: '',
      callStack: ['global', 'calcular_dobro(5)'],
      observation: 'O retorno já sai errado porque o cálculo anterior estava incorreto.'
    },
    {
      line: 6,
      title: 'Resposta recebe retorno',
      action: 'A variável resposta recebe o valor devolvido pela função.',
      variables: { entrada: '5', resposta: '7' },
      output: '',
      callStack: ['global'],
      observation: 'O fluxo volta para a linha que fez a chamada.'
    },
    {
      line: 7,
      title: 'Saída exibida',
      action: 'O programa imprime resposta.',
      variables: { entrada: '5', resposta: '7' },
      output: '7',
      callStack: ['global'],
      observation: 'O terminal confirma a saída obtida.'
    }
  ]
};

export const challenges = [
  {
    id: 1,
    title: 'Relatório com dois-pontos ausente',
    level: 'Iniciante',
    concept: 'Erro sintático',
    topic: 'Sintaxe Básica',
    language: 'Python',
    inputs: 'alunos = ["Ana", "Bruno", "Caio"]\nnotas = [8, 5, 9]',
    allowedDebugModes: ['observe'],
    code: [
      'alunos = ["Ana", "Bruno", "Caio"]',
      'notas = [8, 5, 9]',
      '',
      'def gerar_relatorio(nomes, medias):',
      '    for indice in range(len(nomes)):',
      '        nome = nomes[indice]',
      '        media = medias[indice]',
      '        if media >= 6',
      '            status = "aprovado"',
      '        else:',
      '            status = "recuperacao"',
      '        print(f"{nome}: {status}")',
      '',
      'gerar_relatorio(alunos, notas)'
    ],
    expectedOutput: 'Ana: aprovado\nBruno: recuperacao\nCaio: aprovado',
    actualOutput: 'SyntaxError: expected :',
    correctLine: 8,
    errorType: 'Erro sintático',
    optionsLine: [5, 8, 9, 12],
    optionsType: ['Erro sintático', 'Erro lógico', 'Erro de execução'],
    correctionOptions: [
      'if media >= 6:',
      'if media >= 6;',
      'if media => 6:'
    ],
    correctCorrection: 'if media >= 6:',
    correctedCode: [
      'if media >= 6:',
      '    status = "aprovado"',
      'else:',
      '    status = "recuperacao"'
    ],
    explanation: 'Em Python, estruturas como if, else, for e def precisam de dois-pontos no final da linha de abertura.',
    debugTip: 'Como este é um erro sintático, o interpretador sequer entra no modo de execução. O botão "Analisar Arquivo" mostrará onde a ausência de um caractere obrigatório de bloco (como dois-pontos) impede a compilação do código inteiro.',
    debuggerGoal: 'Entender que, com erro sintático, o fluxo não entra em modo de execução: o parser para antes de rodar o programa.',
    debugSteps: [
      {
        line: 1,
        title: 'Análise sintática iniciada',
        action: 'Antes de executar, Python analisa o arquivo inteiro.',
        variables: {},
        output: '',
        callStack: ['parser'],
        observation: 'Nenhuma variável é criada antes de o arquivo ser considerado sintaticamente válido.'
      },
      {
        line: 4,
        title: 'Cabeçalho da função válido',
        action: 'O parser reconhece def gerar_relatorio(...):.',
        variables: {},
        output: '',
        callStack: ['parser'],
        observation: 'A linha termina com dois-pontos, então está correta.'
      },
      {
        line: 5,
        title: 'Cabeçalho do for válido',
        action: 'O parser reconhece o for porque ele também termina com dois-pontos.',
        variables: {},
        output: '',
        callStack: ['parser'],
        observation: 'A indentação interna também depende desse dois-pontos.'
      },
      {
        line: 8,
        title: 'Erro sintático encontrado',
        action: 'O parser chega ao if media >= 6 sem dois-pontos no final.',
        variables: {},
        output: 'SyntaxError: expected :',
        callStack: ['parser'],
        observation: 'O arquivo é rejeitado aqui. Nenhuma execução real acontece.',
        isBug: true
      },
      {
        line: 14,
        title: 'Chamada não executada',
        action: 'A chamada gerar_relatorio(alunos, notas) nunca é executada.',
        variables: {},
        output: 'SyntaxError: expected :',
        callStack: ['parser'],
        observation: 'Em erro sintático, primeiro corrija a escrita do código.'
      }
    ]
  },
  {
    id: 2,
    title: 'Carrinho com desconto errado',
    level: 'Iniciante',
    concept: 'Erro lógico',
    topic: 'Cálculos e Operadores',
    language: 'Python',
    inputs: 'produtos = [20, 30, 40]\ndesconto_percentual = 20',
    allowedDebugModes: ['step', 'breakpoint'],
    code: [
      'produtos = [20, 30, 40]',
      'desconto_percentual = 20',
      '',
      'def calcular_total(precos):',
      '    total = 0',
      '    for preco in precos:',
      '        total += preco',
      '    return total',
      '',
      'def aplicar_desconto(total, desconto):',
      '    valor_desconto = desconto',
      '    return total - valor_desconto',
      '',
      'total = calcular_total(produtos)',
      'final = aplicar_desconto(total, desconto_percentual)',
      'print(f"Total final: R$ {final:.2f}")'
    ],
    expectedOutput: 'Total final: R$ 72.00',
    actualOutput: 'Total final: R$ 70.00',
    correctLine: 11,
    errorType: 'Erro lógico',
    optionsLine: [6, 10, 11, 15],
    optionsType: ['Erro sintático', 'Erro lógico', 'Erro de execução'],
    correctionOptions: [
      'valor_desconto = total * desconto / 100',
      'valor_desconto = total + desconto',
      'valor_desconto = desconto / total'
    ],
    correctCorrection: 'valor_desconto = total * desconto / 100',
    correctedCode: [
      'def aplicar_desconto(total, desconto):',
      '    valor_desconto = total * desconto / 100',
      '    return total - valor_desconto'
    ],
    explanation: 'O desconto foi tratado como valor fixo, não como percentual. O total é 90 e 20% de 90 é 18, então o final correto é 72.',
    debugTip: 'Cuidado com a interpretação da variável. O programa está subtraindo os "20%" de desconto como se fossem 20 Reais fixos. A lógica do desconto deveria multiplicar a percentagem pelo total geral primeiro.',
    debuggerGoal: 'Seguir o fluxo real: carregar dados, definir funções, chamar calcular_total, voltar, chamar aplicar_desconto e imprimir.',
    debugSteps: [
      {
        line: 1,
        title: 'Lista criada',
        action: 'O programa cria a lista de preços.',
        variables: { produtos: '[20, 30, 40]' },
        output: '',
        callStack: ['global'],
        observation: 'Ainda não existe cálculo, apenas dados.'
      },
      {
        line: 2,
        title: 'Percentual criado',
        action: 'O desconto percentual recebe 20.',
        variables: { produtos: '[20, 30, 40]', desconto_percentual: '20' },
        output: '',
        callStack: ['global'],
        observation: 'O valor 20 representa 20%, não R$ 20 fixos.'
      },
      {
        line: 4,
        title: 'Função calcular_total registrada',
        action: 'O interpretador registra a função calcular_total.',
        variables: { produtos: '[20, 30, 40]', desconto_percentual: '20' },
        output: '',
        callStack: ['global'],
        observation: 'O corpo da função ainda não executou.'
      },
      {
        line: 10,
        title: 'Função aplicar_desconto registrada',
        action: 'O interpretador registra a função aplicar_desconto.',
        variables: { produtos: '[20, 30, 40]', desconto_percentual: '20' },
        output: '',
        callStack: ['global'],
        observation: 'A execução continua nas instruções globais.'
      },
      {
        line: 14,
        title: 'Chamada de calcular_total',
        action: 'A linha global chama calcular_total(produtos).',
        variables: { total: 'aguardando retorno', produtos: '[20, 30, 40]' },
        output: '',
        callStack: ['global'],
        observation: 'O próximo passo entra na função calcular_total.'
      },
      {
        line: 5,
        title: 'Total inicializado',
        action: 'Dentro da função, total começa em 0.',
        variables: { precos: '[20, 30, 40]', total: '0' },
        output: '',
        callStack: ['global', 'calcular_total(produtos)'],
        observation: 'Até aqui tudo correto.'
      },
      {
        line: 6,
        title: 'Laço pega primeiro preço',
        action: 'O for seleciona preco = 20.',
        variables: { preco: '20', total: '0' },
        output: '',
        callStack: ['global', 'calcular_total(produtos)'],
        observation: 'O laço está percorrendo a lista na ordem.'
      },
      {
        line: 7,
        title: 'Soma primeiro preço',
        action: 'O programa soma 20 ao total.',
        variables: { preco: '20', total: '0 → 20' },
        output: '',
        callStack: ['global', 'calcular_total(produtos)'],
        observation: 'Total parcial correto.'
      },
      {
        line: 6,
        title: 'Laço pega segundo preço',
        action: 'O for seleciona preco = 30.',
        variables: { preco: '30', total: '20' },
        output: '',
        callStack: ['global', 'calcular_total(produtos)'],
        observation: 'Ainda dentro do mesmo laço.'
      },
      {
        line: 7,
        title: 'Soma segundo preço',
        action: 'O programa soma 30 ao total.',
        variables: { preco: '30', total: '20 → 50' },
        output: '',
        callStack: ['global', 'calcular_total(produtos)'],
        observation: 'Total parcial correto.'
      },
      {
        line: 6,
        title: 'Laço pega terceiro preço',
        action: 'O for seleciona preco = 40.',
        variables: { preco: '40', total: '50' },
        output: '',
        callStack: ['global', 'calcular_total(produtos)'],
        observation: 'Último item da lista.'
      },
      {
        line: 7,
        title: 'Soma terceiro preço',
        action: 'O programa soma 40 ao total.',
        variables: { preco: '40', total: '50 → 90' },
        output: '',
        callStack: ['global', 'calcular_total(produtos)'],
        observation: 'O total bruto ficou 90, que está correto.'
      },
      {
        line: 8,
        title: 'Retorno do total',
        action: 'A função retorna total = 90.',
        variables: { total: '90', retorno: '90' },
        output: '',
        callStack: ['global', 'calcular_total(produtos)'],
        observation: 'Não há bug nessa função.'
      },
      {
        line: 14,
        title: 'Total recebe retorno',
        action: 'A variável global total recebe 90.',
        variables: { total: '90', desconto_percentual: '20' },
        output: '',
        callStack: ['global'],
        observation: 'O fluxo volta para a área global.'
      },
      {
        line: 15,
        title: 'Chamada de aplicar_desconto',
        action: 'O programa chama aplicar_desconto(90, 20).',
        variables: { total: '90', desconto_percentual: '20', final: 'aguardando retorno' },
        output: '',
        callStack: ['global'],
        observation: 'Agora começa a parte suspeita do cálculo.'
      },
      {
        line: 11,
        title: 'Desconto calculado de forma errada',
        action: 'A função copia desconto diretamente para valor_desconto.',
        variables: { total: '90', desconto: '20', valor_desconto: '20' },
        output: '',
        callStack: ['global', 'aplicar_desconto(90, 20)'],
        observation: 'Aqui está o problema: 20% de 90 é 18, não 20 fixo.',
        isBug: true
      },
      {
        line: 12,
        title: 'Final calculado com desconto errado',
        action: 'A função retorna total - valor_desconto.',
        variables: { total: '90', valor_desconto: '20', retorno: '70' },
        output: '',
        callStack: ['global', 'aplicar_desconto(90, 20)'],
        observation: 'O retorno incorreto vem da linha anterior.'
      },
      {
        line: 15,
        title: 'Final recebe retorno',
        action: 'A variável final recebe 70.',
        variables: { total: '90', final: '70' },
        output: '',
        callStack: ['global'],
        observation: 'O valor final já está errado antes do print.'
      },
      {
        line: 16,
        title: 'Saída final',
        action: 'O programa imprime o total final.',
        variables: { total: '90', final: '70' },
        output: 'Total final: R$ 70.00',
        callStack: ['global'],
        observation: 'A saída confirma o erro lógico.'
      }
    ]
  },
  {
    id: 3,
    title: 'Média de notas vira NaN',
    level: 'Iniciante',
    concept: 'Erro em laço de repetição',
    topic: 'Arrays e Laços',
    language: 'JavaScript',
    inputs: 'notas = [8, 7, 9, 6]',
    allowedDebugModes: ['breakpoint'],
    code: [
      'const notas = [8, 7, 9, 6];',
      '',
      'function calcularMedia(valores) {',
      '  let soma = 0;',
      '  for (let i = 0; i <= valores.length; i++) {',
      '    soma += valores[i];',
      '  }',
      '  return soma / valores.length;',
      '}',
      '',
      'const media = calcularMedia(notas);',
      'console.log(media.toFixed(1));'
    ],
    expectedOutput: '7.5',
    actualOutput: 'NaN',
    correctLine: 5,
    errorType: 'Erro lógico',
    optionsLine: [4, 5, 6, 8],
    optionsType: ['Erro sintático', 'Erro lógico', 'Erro de execução'],
    correctionOptions: [
      'for (let i = 0; i < valores.length; i++) {',
      'for (let i = 1; i <= valores.length; i++) {',
      'for (let i = 0; i > valores.length; i++) {'
    ],
    correctCorrection: 'for (let i = 0; i < valores.length; i++) {',
    correctedCode: [
      'for (let i = 0; i < valores.length; i++) {',
      '  soma += valores[i];',
      '}'
    ],
    explanation: 'O laço usa <= e tenta acessar valores[4]. Como o array só possui índices 0, 1, 2 e 3, o valor fica undefined e a soma vira NaN.',
    debugTip: 'O erro ocorre no limite do array. Em JavaScript, o último índice é sempre "length - 1". Coloque um breakpoint na linha de soma e clique em "Continue" até que o índice "i" passe de 3. Vai ver o programa a tentar ler uma posição que não existe.',
    debuggerGoal: 'Acompanhar cada teste do for até o índice passar do último elemento válido.',
    debugSteps: [
      {
        line: 1,
        title: 'Array criado',
        action: 'O array notas recebe quatro valores.',
        variables: { notas: '[8, 7, 9, 6]', 'notas.length': '4' },
        output: '',
        callStack: ['global'],
        observation: 'Os índices válidos são 0, 1, 2 e 3.'
      },
      {
        line: 3,
        title: 'Função registrada',
        action: 'A função calcularMedia fica disponível para chamada.',
        variables: { notas: '[8, 7, 9, 6]' },
        output: '',
        callStack: ['global'],
        observation: 'O corpo da função ainda não executou.'
      },
      {
        line: 11,
        title: 'Chamada da função',
        action: 'A linha global chama calcularMedia(notas).',
        variables: { media: 'aguardando retorno' },
        output: '',
        callStack: ['global'],
        observation: 'O próximo passo entra na função.'
      },
      {
        line: 4,
        title: 'Soma inicializada',
        action: 'Dentro da função, soma começa em 0.',
        variables: { valores: '[8, 7, 9, 6]', soma: '0' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'Estado inicial correto.'
      },
      {
        line: 5,
        title: 'Teste do for com i = 0',
        action: 'A condição 0 <= 4 é verdadeira.',
        variables: { i: '0', 'valores.length': '4', condição: '0 <= 4 = true' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'Índice válido.'
      },
      {
        line: 6,
        title: 'Soma índice 0',
        action: 'O programa soma valores[0].',
        variables: { i: '0', 'valores[i]': '8', soma: '0 → 8' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'Soma correta.'
      },
      {
        line: 5,
        title: 'Teste do for com i = 1',
        action: 'A condição 1 <= 4 é verdadeira.',
        variables: { i: '1', 'valores.length': '4', condição: '1 <= 4 = true' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'Índice válido.'
      },
      {
        line: 6,
        title: 'Soma índice 1',
        action: 'O programa soma valores[1].',
        variables: { i: '1', 'valores[i]': '7', soma: '8 → 15' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'Soma correta.'
      },
      {
        line: 5,
        title: 'Teste do for com i = 2',
        action: 'A condição 2 <= 4 é verdadeira.',
        variables: { i: '2', 'valores.length': '4', condição: '2 <= 4 = true' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'Índice válido.'
      },
      {
        line: 6,
        title: 'Soma índice 2',
        action: 'O programa soma valores[2].',
        variables: { i: '2', 'valores[i]': '9', soma: '15 → 24' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'Soma correta.'
      },
      {
        line: 5,
        title: 'Teste do for com i = 3',
        action: 'A condição 3 <= 4 é verdadeira.',
        variables: { i: '3', 'valores.length': '4', condição: '3 <= 4 = true' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'Último índice válido.'
      },
      {
        line: 6,
        title: 'Soma índice 3',
        action: 'O programa soma valores[3].',
        variables: { i: '3', 'valores[i]': '6', soma: '24 → 30' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'Depois daqui, o laço deveria parar.'
      },
      {
        line: 5,
        title: 'Teste indevido com i = 4',
        action: 'A condição 4 <= 4 ainda é verdadeira.',
        variables: { i: '4', 'valores.length': '4', condição: '4 <= 4 = true' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'Aqui está o bug: i = 4 não é índice válido. A condição deveria ser i < valores.length.',
        isBug: true
      },
      {
        line: 6,
        title: 'Soma posição inexistente',
        action: 'O programa tenta somar valores[4].',
        variables: { i: '4', 'valores[i]': 'undefined', soma: '30 + undefined = NaN' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'A soma vira NaN.'
      },
      {
        line: 8,
        title: 'Retorno da média',
        action: 'A função retorna NaN / 4.',
        variables: { soma: 'NaN', 'valores.length': '4', retorno: 'NaN' },
        output: '',
        callStack: ['global', 'calcularMedia(notas)'],
        observation: 'O retorno já está contaminado pelo acesso indevido.'
      },
      {
        line: 11,
        title: 'Media recebe retorno',
        action: 'A variável media recebe NaN.',
        variables: { media: 'NaN' },
        output: '',
        callStack: ['global'],
        observation: 'O fluxo volta para a área global.'
      },
      {
        line: 12,
        title: 'Saída final',
        action: 'O programa imprime media.toFixed(1).',
        variables: { media: 'NaN' },
        output: 'NaN',
        callStack: ['global'],
        observation: 'O terminal mostra o efeito do bug no laço.'
      }
    ]
  },
  {
    id: 4,
    title: 'Frete grátis no limite errado',
    level: 'Intermediário',
    concept: 'Erro em condição if/else',
    topic: 'Condicionais (If/Else)',
    language: 'JavaScript',
    inputs: 'pedido = {\n  cliente: "Lia",\n  subtotal: 100,\n  cidade: "Maringá"\n}',
    allowedDebugModes: ['step'],
    code: [
      'const pedido = {',
      '  cliente: "Lia",',
      '  subtotal: 100,',
      '  cidade: "Maringá"',
      '};',
      '',
      'function calcularFrete(pedido) {',
      '  let frete = 12;',
      '  if (pedido.subtotal > 100) {',
      '    frete = 0;',
      '  }',
      '  return frete;',
      '}',
      '',
      'const frete = calcularFrete(pedido);',
      'console.log(`Frete: R$ ${frete}`);'
    ],
    expectedOutput: 'Frete: R$ 0',
    actualOutput: 'Frete: R$ 12',
    correctLine: 9,
    errorType: 'Erro lógico',
    optionsLine: [3, 8, 9, 16],
    optionsType: ['Erro sintático', 'Erro lógico', 'Erro de execução'],
    correctionOptions: [
      'if (pedido.subtotal >= 100) {',
      'if (pedido.subtotal < 100) {',
      'if (pedido.subtotal === 0) {'
    ],
    correctCorrection: 'if (pedido.subtotal >= 100) {',
    correctedCode: [
      'if (pedido.subtotal >= 100) {',
      '  frete = 0;',
      '}'
    ],
    explanation: 'A regra de negócio considera frete grátis a partir de 100. A condição > 100 exclui exatamente o valor 100.',
    debugTip: 'Erros de lógica de borda são muito comuns! A regra estabelece frete grátis "a partir de 100", mas o operador ">" (estritamente maior) ignora o exato valor 100. Avance com o Step Into e observe o IF a ser ignorado.',
    debuggerGoal: 'Seguir a chamada da função e observar o caminho escolhido pela condição.',
    debugSteps: [
      {
        line: 1,
        title: 'Objeto iniciado',
        action: 'O programa começa a criar o objeto pedido.',
        variables: { pedido: 'em construção' },
        output: '',
        callStack: ['global'],
        observation: 'O objeto terá dados do cliente e do pedido.'
      },
      {
        line: 3,
        title: 'Subtotal definido',
        action: 'A propriedade subtotal recebe 100.',
        variables: { 'pedido.subtotal': '100' },
        output: '',
        callStack: ['global'],
        observation: 'Este é um valor de borda importante.'
      },
      {
        line: 5,
        title: 'Objeto finalizado',
        action: 'O objeto pedido está completo.',
        variables: { pedido: '{ cliente: Lia, subtotal: 100, cidade: Maringá }' },
        output: '',
        callStack: ['global'],
        observation: 'A entrada está pronta.'
      },
      {
        line: 7,
        title: 'Função registrada',
        action: 'A função calcularFrete fica disponível.',
        variables: { 'pedido.subtotal': '100' },
        output: '',
        callStack: ['global'],
        observation: 'O corpo será executado somente na chamada.'
      },
      {
        line: 15,
        title: 'Chamada da função',
        action: 'O programa chama calcularFrete(pedido).',
        variables: { frete: 'aguardando retorno', 'pedido.subtotal': '100' },
        output: '',
        callStack: ['global'],
        observation: 'O próximo passo entra na função.'
      },
      {
        line: 8,
        title: 'Frete padrão definido',
        action: 'Dentro da função, frete começa com 12.',
        variables: { frete: '12', 'pedido.subtotal': '100' },
        output: '',
        callStack: ['global', 'calcularFrete(pedido)'],
        observation: 'Esse valor só deveria permanecer se a regra de frete grátis não valesse.'
      },
      {
        line: 9,
        title: 'Condição avaliada',
        action: 'O programa testa se pedido.subtotal > 100.',
        variables: { 'pedido.subtotal': '100', condição: '100 > 100 = false' },
        output: '',
        callStack: ['global', 'calcularFrete(pedido)'],
        observation: 'Aqui está o bug: a regra é a partir de 100, então deveria aceitar 100 com >=.',
        isBug: true
      },
      {
        line: 12,
        title: 'Retorno do frete',
        action: 'Como a condição foi falsa, a linha frete = 0 foi pulada.',
        variables: { frete: '12', retorno: '12' },
        output: '',
        callStack: ['global', 'calcularFrete(pedido)'],
        observation: 'O valor retornado contraria a regra de negócio.'
      },
      {
        line: 15,
        title: 'Frete recebe retorno',
        action: 'A variável global frete recebe 12.',
        variables: { frete: '12' },
        output: '',
        callStack: ['global'],
        observation: 'O erro já está presente antes do console.log.'
      },
      {
        line: 16,
        title: 'Saída final',
        action: 'O programa imprime o frete calculado.',
        variables: { frete: '12' },
        output: 'Frete: R$ 12',
        callStack: ['global'],
        observation: 'A saída obtida mostra o efeito da condição incorreta.'
      }
    ]
  },
  {
    id: 5,
    title: 'Busca de aluno estoura a lista',
    level: 'Intermediário',
    concept: 'Erro de execução',
    topic: 'Listas e Índices',
    language: 'Python',
    inputs: 'alunos = ["Ana", "Bruno", "Caio"]\nmatriculas = [101, 102, 103]\nnome_procurado = "Duda"',
    allowedDebugModes: ['step', 'breakpoint'],
    code: [
      'alunos = ["Ana", "Bruno", "Caio"]',
      'matriculas = [101, 102, 103]',
      '',
      'def buscar_matricula(nome_procurado):',
      '    indice = 0',
      '    while indice <= len(alunos):',
      '        if alunos[indice] == nome_procurado:',
      '            return matriculas[indice]',
      '        indice += 1',
      '    return None',
      '',
      'resultado = buscar_matricula("Duda")',
      'print(resultado)'
    ],
    expectedOutput: 'None',
    actualOutput: 'IndexError: list index out of range',
    correctLine: 6,
    errorType: 'Erro de execução',
    optionsLine: [5, 6, 7, 10],
    optionsType: ['Erro sintático', 'Erro lógico', 'Erro de execução'],
    correctionOptions: [
      'while indice < len(alunos):',
      'while indice == len(alunos):',
      'while indice > len(alunos):'
    ],
    correctCorrection: 'while indice < len(alunos):',
    correctedCode: [
      'while indice < len(alunos):',
      '    if alunos[indice] == nome_procurado:',
      '        return matriculas[indice]',
      '    indice += 1'
    ],
    explanation: 'A condição <= permite que indice chegue a 3. Como a lista tem posições 0, 1 e 2, alunos[3] causa IndexError.',
    debugTip: 'Acompanhe a evolução da variável "indice" na aba lateral. O laço "while" vai continuar a repetir e avançar mesmo quando o índice já ultrapassou o tamanho da lista "alunos", estourando o limite da memória (IndexError).',
    debuggerGoal: 'Seguir cada repetição do while até ele aceitar um índice fora do intervalo.',
    debugSteps: [
      {
        line: 1,
        title: 'Lista de alunos criada',
        action: 'O programa cria a lista alunos.',
        variables: { alunos: '[Ana, Bruno, Caio]', 'len(alunos)': '3' },
        output: '',
        callStack: ['global'],
        observation: 'Os índices válidos são 0, 1 e 2.'
      },
      {
        line: 2,
        title: 'Lista de matrículas criada',
        action: 'O programa cria a lista matriculas.',
        variables: { alunos: '[Ana, Bruno, Caio]', matriculas: '[101, 102, 103]' },
        output: '',
        callStack: ['global'],
        observation: 'As duas listas têm o mesmo tamanho.'
      },
      {
        line: 4,
        title: 'Função registrada',
        action: 'O interpretador registra buscar_matricula.',
        variables: { alunos: '[Ana, Bruno, Caio]', matriculas: '[101, 102, 103]' },
        output: '',
        callStack: ['global'],
        observation: 'O corpo ainda não executou.'
      },
      {
        line: 12,
        title: 'Chamada da busca',
        action: 'O programa chama buscar_matricula("Duda").',
        variables: { resultado: 'aguardando retorno', nome_procurado: 'Duda' },
        output: '',
        callStack: ['global'],
        observation: 'Duda não está na lista, então o esperado seria retornar None.'
      },
      {
        line: 5,
        title: 'Índice inicializado',
        action: 'Dentro da função, indice começa em 0.',
        variables: { nome_procurado: 'Duda', indice: '0' },
        output: '',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'Índice 0 é válido.'
      },
      {
        line: 6,
        title: 'While com indice 0',
        action: 'A condição 0 <= 3 é verdadeira.',
        variables: { indice: '0', 'len(alunos)': '3', condição: '0 <= 3 = true' },
        output: '',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'Até aqui tudo normal.'
      },
      {
        line: 7,
        title: 'Compara Ana',
        action: 'O programa compara alunos[0] com Duda.',
        variables: { indice: '0', 'alunos[indice]': 'Ana', comparação: 'Ana == Duda = false' },
        output: '',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'Não encontrou.'
      },
      {
        line: 9,
        title: 'Índice avança para 1',
        action: 'indice += 1.',
        variables: { indice: '0 → 1' },
        output: '',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'Próxima repetição.'
      },
      {
        line: 6,
        title: 'While com indice 1',
        action: 'A condição 1 <= 3 é verdadeira.',
        variables: { indice: '1', 'len(alunos)': '3', condição: '1 <= 3 = true' },
        output: '',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'Índice 1 é válido.'
      },
      {
        line: 7,
        title: 'Compara Bruno',
        action: 'O programa compara alunos[1] com Duda.',
        variables: { indice: '1', 'alunos[indice]': 'Bruno', comparação: 'Bruno == Duda = false' },
        output: '',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'Não encontrou.'
      },
      {
        line: 9,
        title: 'Índice avança para 2',
        action: 'indice += 1.',
        variables: { indice: '1 → 2' },
        output: '',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'Próxima repetição.'
      },
      {
        line: 6,
        title: 'While com indice 2',
        action: 'A condição 2 <= 3 é verdadeira.',
        variables: { indice: '2', 'len(alunos)': '3', condição: '2 <= 3 = true' },
        output: '',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'Último índice válido.'
      },
      {
        line: 7,
        title: 'Compara Caio',
        action: 'O programa compara alunos[2] com Duda.',
        variables: { indice: '2', 'alunos[indice]': 'Caio', comparação: 'Caio == Duda = false' },
        output: '',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'Ainda não encontrou.'
      },
      {
        line: 9,
        title: 'Índice avança para 3',
        action: 'indice += 1.',
        variables: { indice: '2 → 3', 'len(alunos)': '3' },
        output: '',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'Agora o índice está fora da lista.'
      },
      {
        line: 6,
        title: 'While aceita índice inválido',
        action: 'A condição 3 <= 3 ainda é verdadeira.',
        variables: { indice: '3', 'len(alunos)': '3', condição: '3 <= 3 = true' },
        output: '',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'Este é o bug: a condição deveria ser indice < len(alunos).',
        isBug: true
      },
      {
        line: 7,
        title: 'Acesso fora da lista',
        action: 'O programa tenta ler alunos[3].',
        variables: { indice: '3', 'alunos[3]': 'não existe' },
        output: 'IndexError: list index out of range',
        callStack: ['global', 'buscar_matricula("Duda")'],
        observation: 'O erro acontece durante a execução.'
      }
    ]
  },
  {
    id: 6,
    title: 'Validação de senha aprova curto demais',
    level: 'Avançado',
    concept: 'Erro lógico',
    topic: 'Lógica Booleana',
    language: 'Python',
    inputs: 'senha = "abc12"',
    allowedDebugModes: ['step', 'breakpoint'],
    code: [
      'senha = "abc12"',
      '',
      'def tem_numero(texto):',
      '    for caractere in texto:',
      '        if caractere.isdigit():',
      '            return True',
      '    return False',
      '',
      'def senha_valida(senha):',
      '    tamanho_ok = len(senha) >= 8',
      '    possui_numero = tem_numero(senha)',
      '    if tamanho_ok or possui_numero:',
      '        return "Senha aceita"',
      '    return "Senha recusada"',
      '',
      'print(senha_valida(senha))'
    ],
    expectedOutput: 'Senha recusada',
    actualOutput: 'Senha aceita',
    correctLine: 12,
    errorType: 'Erro lógico',
    optionsLine: [10, 11, 12, 16],
    optionsType: ['Erro sintático', 'Erro lógico', 'Erro de execução'],
    correctionOptions: [
      'if tamanho_ok and possui_numero:',
      'if tamanho_ok == possui_numero:',
      'if not tamanho_ok or possui_numero:'
    ],
    correctCorrection: 'if tamanho_ok and possui_numero:',
    correctedCode: [
      'if tamanho_ok and possui_numero:',
      '    return "Senha aceita"',
      'return "Senha recusada"'
    ],
    explanation: 'A senha só deveria ser aceita se tivesse tamanho suficiente e número. O operador or aceita quando apenas uma das condições é verdadeira.',
    debugTip: 'A regra de segurança exige duas condições verdadeiras ao mesmo tempo: ter o tamanho mínimo E ter um número. Avalie qual operador o código está a usar. O "or" satisfaz o IF se apenas uma das metades for verdadeira.',
    debuggerGoal: 'Seguir as chamadas aninhadas: senha_valida chama tem_numero e depois avalia a condição composta.',
    debugSteps: [
      {
        line: 1,
        title: 'Senha criada',
        action: 'A variável senha recebe abc12.',
        variables: { senha: 'abc12', 'len(senha)': '5' },
        output: '',
        callStack: ['global'],
        observation: 'Ela tem 5 caracteres, portanto é curta.'
      },
      {
        line: 3,
        title: 'Função tem_numero registrada',
        action: 'O interpretador registra a função auxiliar.',
        variables: { senha: 'abc12' },
        output: '',
        callStack: ['global'],
        observation: 'Ainda não executou.'
      },
      {
        line: 9,
        title: 'Função senha_valida registrada',
        action: 'O interpretador registra a função principal.',
        variables: { senha: 'abc12' },
        output: '',
        callStack: ['global'],
        observation: 'A execução continua no print final.'
      },
      {
        line: 16,
        title: 'Chamada para validar senha',
        action: 'Antes de imprimir, o programa chama senha_valida(senha).',
        variables: { senha: 'abc12', resultado: 'aguardando retorno' },
        output: '',
        callStack: ['global'],
        observation: 'O próximo passo entra em senha_valida.'
      },
      {
        line: 10,
        title: 'Regra de tamanho avaliada',
        action: 'A função calcula len(senha) >= 8.',
        variables: { senha: 'abc12', 'len(senha)': '5', tamanho_ok: 'False' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")'],
        observation: 'O requisito de tamanho falhou.'
      },
      {
        line: 11,
        title: 'Chamada de tem_numero',
        action: 'A função chama tem_numero(senha).',
        variables: { tamanho_ok: 'False', possui_numero: 'aguardando retorno' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")'],
        observation: 'O próximo passo entra na função auxiliar.'
      },
      {
        line: 4,
        title: 'Laço analisa caractere a',
        action: 'O for pega o primeiro caractere.',
        variables: { texto: 'abc12', caractere: 'a' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")', 'tem_numero("abc12")'],
        observation: 'a não é número.'
      },
      {
        line: 5,
        title: 'Teste com a',
        action: 'O programa avalia a.isdigit().',
        variables: { caractere: 'a', 'caractere.isdigit()': 'False' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")', 'tem_numero("abc12")'],
        observation: 'Continua o laço.'
      },
      {
        line: 4,
        title: 'Laço analisa caractere b',
        action: 'O for pega b.',
        variables: { caractere: 'b' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")', 'tem_numero("abc12")'],
        observation: 'b não é número.'
      },
      {
        line: 5,
        title: 'Teste com b',
        action: 'O programa avalia b.isdigit().',
        variables: { caractere: 'b', 'caractere.isdigit()': 'False' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")', 'tem_numero("abc12")'],
        observation: 'Continua o laço.'
      },
      {
        line: 4,
        title: 'Laço analisa caractere c',
        action: 'O for pega c.',
        variables: { caractere: 'c' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")', 'tem_numero("abc12")'],
        observation: 'c não é número.'
      },
      {
        line: 5,
        title: 'Teste com c',
        action: 'O programa avalia c.isdigit().',
        variables: { caractere: 'c', 'caractere.isdigit()': 'False' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")', 'tem_numero("abc12")'],
        observation: 'Continua o laço.'
      },
      {
        line: 4,
        title: 'Laço analisa caractere 1',
        action: 'O for pega 1.',
        variables: { caractere: '1' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")', 'tem_numero("abc12")'],
        observation: 'Agora há um número.'
      },
      {
        line: 5,
        title: 'Teste com 1',
        action: 'O programa avalia 1.isdigit().',
        variables: { caractere: '1', 'caractere.isdigit()': 'True' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")', 'tem_numero("abc12")'],
        observation: 'A função deve retornar True.'
      },
      {
        line: 6,
        title: 'Retorna True',
        action: 'tem_numero retorna True.',
        variables: { retorno: 'True' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")', 'tem_numero("abc12")'],
        observation: 'A função auxiliar terminou cedo porque encontrou número.'
      },
      {
        line: 11,
        title: 'possui_numero recebe retorno',
        action: 'A variável possui_numero recebe True.',
        variables: { tamanho_ok: 'False', possui_numero: 'True' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")'],
        observation: 'Agora as duas regras estão calculadas.'
      },
      {
        line: 12,
        title: 'Condição composta avaliada',
        action: 'O programa testa tamanho_ok or possui_numero.',
        variables: { tamanho_ok: 'False', possui_numero: 'True', condição: 'False or True = True' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")'],
        observation: 'Aqui está o bug: a regra exige as duas condições verdadeiras, então deveria usar and.',
        isBug: true
      },
      {
        line: 13,
        title: 'Senha aceita indevidamente',
        action: 'Como a condição foi verdadeira, a função retorna Senha aceita.',
        variables: { retorno: 'Senha aceita' },
        output: '',
        callStack: ['global', 'senha_valida("abc12")'],
        observation: 'O retorno contraria a regra esperada.'
      },
      {
        line: 16,
        title: 'Saída final',
        action: 'O programa imprime o retorno de senha_valida.',
        variables: { senha: 'abc12', resultado: 'Senha aceita' },
        output: 'Senha aceita',
        callStack: ['global'],
        observation: 'A saída obtida confirma o erro lógico.'
      }
    ]
  }
];