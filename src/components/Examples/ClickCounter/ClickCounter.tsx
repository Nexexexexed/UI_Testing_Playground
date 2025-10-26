import React, { useState } from "react";
import CodeBlock from "../../Common/CodeBlock";

const ClickCounter: React.FC = () => {
  const [count, setCount] = useState(0);

  const codeSnippets = [
    {
      language: "javascript",
      code: `// Кликаем несколько раз и проверяем счетчик
await page.click('#click-button');
await page.click('#click-button');
const count = await page.textContent('#click-count');
expect(count).toBe('2');`,
    },
  ];

  return (
    <div className="example-container">
      <h2>Счетчик кликов</h2>
      <p>
        Нажимайте на кнопку несколько раз и проверяйте, что счетчик обновляется
        корректно. Этот пример тестирует пользовательские взаимодействия и
        изменения состояния.
      </p>

      <div className="example-area">
        <div className="counter-display">
          Нажатий:{" "}
          <span id="click-count" data-testid="click-count">
            {count}
          </span>
        </div>
        <button
          id="click-button"
          className="test-button"
          onClick={() => setCount(count + 1)}
        >
          Нажми меня!
        </button>
        <button className="reset-button" onClick={() => setCount(0)}>
          Сбросить
        </button>
      </div>

      <div className="code-section">
        <h3>Примеры тестового кода</h3>
        {codeSnippets.map((snippet, index) => (
          <CodeBlock
            key={index}
            language={snippet.language}
            code={snippet.code}
          />
        ))}
      </div>
    </div>
  );
};

export default ClickCounter;
