import React, { useState, useEffect } from "react";
import CodeBlock from "../../Common/CodeBlock";

const Visibility: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const codeSnippets = [
    {
      language: "javascript",
      code: `// Ждем, когда элемент станет видимым
await page.waitForSelector('#hidden-button', { timeout: 5000 });
await page.click('#hidden-button');`,
    },
  ];

  return (
    <div className="example-container">
      <h2>Видимость элемента</h2>
      <p>
        Кнопка ниже появится через 3 секунды. Тестовые скрипты должны уметь
        ожидать появления элементов.
      </p>

      <div className="example-area">
        {isVisible ? (
          <button
            id="hidden-button"
            className="test-button success"
            onClick={() => alert("Успех! Кнопка теперь видима.")}
          >
            Теперь я видима!
          </button>
        ) : (
          <div className="loading">Ожидаем появления кнопки... (3 секунды)</div>
        )}
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

export default Visibility;
