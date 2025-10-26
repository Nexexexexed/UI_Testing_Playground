import React, { useState, useEffect } from "react";
import CodeBlock from "../../Common/CodeBlock";

const DynamicId: React.FC = () => {
  const [elementId, setElementId] = useState<string>("");

  useEffect(() => {
    setElementId(`button-${Math.random().toString(36).substr(2, 9)}`);
  }, []);

  const codeSnippets = [
    {
      language: "javascript",
      code: `// ID меняется при каждой загрузке страницы
const button = await page.locator('button[id^="button-"]');
await button.click();`,
    },
    {
      language: "python",
      code: `# ID изменяется при каждой загрузке страницы
button = page.locator('button[id^="button-"]')
button.click()`,
    },
  ];

  return (
    <div className="example-container">
      <h2>Динамический ID</h2>
      <p>
        Эта кнопка имеет динамически сгенерированный ID, который меняется при
        каждой загрузке страницы. Скрипты автоматизации тестирования должны
        обрабатывать такие динамические атрибуты.
      </p>

      <div className="example-area">
        <button
          id={elementId}
          className="test-button"
          onClick={() => alert("Кнопка нажата!")}
        >
          Кнопка с динамическим ID: {elementId}
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

export default DynamicId;
