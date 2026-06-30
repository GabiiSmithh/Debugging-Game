const pythonKeywords = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
  'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import',
  'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while',
  'with', 'yield'
]);

const javascriptKeywords = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete',
  'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in',
  'instanceof', 'let', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof',
  'var', 'void', 'while', 'with', 'yield', 'async', 'await', 'true', 'false', 'null', 'undefined'
]);

const builtins = new Set([
  'print', 'len', 'range', 'sum', 'min', 'max', 'int', 'float', 'str', 'list', 'dict', 'set',
  'console', 'log', 'Math', 'Number', 'String', 'Array', 'Object', 'parseInt', 'parseFloat'
]);

function getKeywordSet(language) {
  return language === 'JavaScript' ? javascriptKeywords : pythonKeywords;
}

function isIdentifierStart(char) {
  return /[A-Za-z_$]/.test(char);
}

function isIdentifierPart(char) {
  return /[A-Za-z0-9_$]/.test(char);
}

function readString(line, start) {
  const quote = line[start];
  let end = start + 1;

  while (end < line.length) {
    if (line[end] === '\\') {
      end += 2;
      continue;
    }

    if (line[end] === quote) {
      end += 1;
      break;
    }

    end += 1;
  }

  return end;
}

function readNumber(line, start) {
  let end = start;

  while (end < line.length && /[0-9_.]/.test(line[end])) {
    end += 1;
  }

  return end;
}

function readIdentifier(line, start) {
  let end = start + 1;

  while (end < line.length && isIdentifierPart(line[end])) {
    end += 1;
  }

  return end;
}

function isFunctionLike(line, end) {
  let index = end;

  while (index < line.length && /\s/.test(line[index])) {
    index += 1;
  }

  return line[index] === '(';
}

function pushToken(tokens, type, text) {
  tokens.push({ type, text, key: `${tokens.length}-${type}-${text}` });
}

function highlightLine(line, language = 'Python') {
  const tokens = [];
  const keywords = getKeywordSet(language);
  let index = 0;

  while (index < line.length) {
    const char = line[index];
    const rest = line.slice(index);

    if (language === 'Python' && char === '#') {
      pushToken(tokens, 'comment', rest);
      break;
    }

    if (language === 'JavaScript' && rest.startsWith('//')) {
      pushToken(tokens, 'comment', rest);
      break;
    }

    if (char === '"' || char === "'" || char === '`') {
      const end = readString(line, index);
      pushToken(tokens, 'string', line.slice(index, end));
      index = end;
      continue;
    }

    if (/\d/.test(char)) {
      const end = readNumber(line, index);
      pushToken(tokens, 'number', line.slice(index, end));
      index = end;
      continue;
    }

    if (isIdentifierStart(char)) {
      const end = readIdentifier(line, index);
      const word = line.slice(index, end);

      if (keywords.has(word)) {
        pushToken(tokens, 'keyword', word);
      } else if (builtins.has(word)) {
        pushToken(tokens, 'builtin', word);
      } else if (isFunctionLike(line, end)) {
        pushToken(tokens, 'function', word);
      } else {
        pushToken(tokens, 'plain', word);
      }

      index = end;
      continue;
    }

    if (/[+\-*/%=!<>|&^~?:.]/.test(char)) {
      pushToken(tokens, 'operator', char);
      index += 1;
      continue;
    }

    if (/[(){}[\],;]/.test(char)) {
      pushToken(tokens, 'punctuation', char);
      index += 1;
      continue;
    }

    pushToken(tokens, 'plain', char);
    index += 1;
  }

  return tokens;
}

export default function CodeBlock({
  code = [],
  selectedLine,
  correctLine,
  showCorrect = false,
  activeLine,
  bugLine,
  language = 'Python',
  onSelectLine,
  breakpointLines = [],
  onToggleBreakpoint
}) {
  const breakpointSet = new Set(breakpointLines);

  function handleLineKeyDown(event, lineNumber) {
    if (!onSelectLine) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectLine(lineNumber);
    }
  }

  return (
    <div className="codeBlock" role="region" aria-label="Código do desafio">
      {code.map((line, index) => {
        const lineNumber = index + 1;
        const isSelected = selectedLine === lineNumber;
        const isCorrect = showCorrect && correctLine === lineNumber;
        const isActive = activeLine === lineNumber;
        const isBugLine = bugLine === lineNumber;
        const clickable = Boolean(onSelectLine);
        const canToggleBreakpoint = Boolean(onToggleBreakpoint);
        const hasBreakpoint = breakpointSet.has(lineNumber);
        const tokens = highlightLine(line || ' ', language);

        return (
          <div
            key={`${lineNumber}-${line}`}
            className={`codeLine ${clickable ? 'interactiveLine' : 'nonInteractiveLine'} ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isActive ? 'activeDebugLine' : ''} ${isBugLine ? 'bugMarker' : ''} ${hasBreakpoint ? 'hasBreakpoint' : ''}`}
            role={clickable ? 'button' : 'row'}
            tabIndex={clickable ? 0 : undefined}
            onClick={() => onSelectLine?.(lineNumber)}
            onKeyDown={(event) => handleLineKeyDown(event, lineNumber)}
          >
            <span className="lineNumber">
              {canToggleBreakpoint && (
                <button
                  className={`breakpointGutterButton ${hasBreakpoint ? 'active' : ''}`}
                  type="button"
                  aria-label={`${hasBreakpoint ? 'Remover' : 'Adicionar'} breakpoint na linha ${lineNumber}`}
                  title={`${hasBreakpoint ? 'Remover' : 'Adicionar'} breakpoint na linha ${lineNumber}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleBreakpoint(lineNumber);
                  }}
                />
              )}
              <span>{lineNumber}</span>
            </span>
            <code>
              {tokens.map((token) => (
                <span key={token.key} className={`syntax-${token.type}`}>
                  {token.text}
                </span>
              ))}
            </code>
          </div>
        );
      })}
    </div>
  );
}
