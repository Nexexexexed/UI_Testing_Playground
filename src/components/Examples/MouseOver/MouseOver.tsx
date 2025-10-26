import React, { useState } from "react";
import CodeBlock from "../../Common/CodeBlock";

const MouseOver: React.FC = () => {
  const [hoverState, setHoverState] = useState<string>("Ни на что не наведено");

  const handleMouseEnter = (elementName: string) => {
    setHoverState(`Наведено на: ${elementName}`);
  };

  const handleMouseLeave = () => {
    setHoverState("Ни на что не наведено");
  };

  const codeSnippets = [
    {
      language: "javascript",
      code: `// Тестирование hover эффектов
const element = await page.locator('#hover-element-1');
await element.hover();
const state = await page.textContent('#hover-state');
expect(state).toContain('Наведено на: Элемент 1');`,
    },
    {
      language: "python",
      code: `# Тестирование hover эффектов
element = page.locator('#hover-element-1')
element.hover()
state = page.text_content('#hover-state')
assert 'Наведено на: Элемент 1' in state`,
    },
    {
      language: "javascript",
      code: `// Альтернативный способ с mouse events
await page.locator('#hover-element-1').dispatchEvent('mouseover');`,
    },
  ];

  return (
    <div className="example-container">
      <h2>Наведение курсора</h2>
      <p>
        Элементы, которые меняют свое состояние или внешний вид при наведении
        курсора мыши. Тестовые фреймворки предоставляют специальные методы для
        имитации hover событий.
      </p>

      <div className="example-area">
        <div className="hover-state-display">
          <div id="hover-state" className="state-indicator">
            {hoverState}
          </div>
        </div>

        <div className="hover-elements">
          <div
            id="hover-element-1"
            className="hover-element"
            onMouseEnter={() => handleMouseEnter("Элемент 1")}
            onMouseLeave={handleMouseLeave}
          >
            🟦 Элемент 1
          </div>

          <div
            id="hover-element-2"
            className="hover-element"
            onMouseEnter={() => handleMouseEnter("Элемент 2")}
            onMouseLeave={handleMouseLeave}
          >
            🟨 Элемент 2
          </div>

          <div
            id="hover-element-3"
            className="hover-element"
            onMouseEnter={() => handleMouseEnter("Элемент 3")}
            onMouseLeave={handleMouseLeave}
          >
            🟥 Элемент 3
          </div>
        </div>

        <div className="hover-instructions">
          <p>Наведите курсор на цветные элементы выше</p>
        </div>
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

export default MouseOver;
