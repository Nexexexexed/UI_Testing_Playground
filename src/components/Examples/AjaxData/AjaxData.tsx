import React, { useState } from "react";
import CodeBlock from "../../Common/CodeBlock";

const AjaxData: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const loadData = () => {
    setLoading(true);

    // Имитация AJAX запроса с задержкой
    setTimeout(() => {
      const mockData = [
        "Элемент данных 1",
        "Элемент данных 2",
        "Элемент данных 3",
        "Элемент данных 4",
        "Элемент данных 5",
      ];
      setData(mockData);
      setLoading(false);
      setLoaded(true);
    }, 2000);
  };

  const resetData = () => {
    setData([]);
    setLoaded(false);
  };

  const codeSnippets = [
    {
      language: "javascript",
      code: `// Ожидаем загрузки данных через AJAX
await page.click('#load-data-button');
await page.waitForSelector('.data-item', { timeout: 5000 });
const items = await page.$$('.data-item');
expect(items).toHaveLength(5);`,
    },
    {
      language: "python",
      code: `# Ожидаем загрузки данных через AJAX
page.click('#load-data-button')
page.wait_for_selector('.data-item', timeout=5000)
items = page.query_selector_all('.data-item')
assert len(items) == 5`,
    },
  ];

  return (
    <div className="example-container">
      <h2>AJAX данные</h2>
      <p>
        Данные загружаются асинхронно после нажатия кнопки. Тестовые скрипты
        должны уметь ожидать завершения AJAX запросов и появления данных на
        странице.
      </p>

      <div className="example-area">
        <div className="ajax-controls">
          <button
            id="load-data-button"
            className="test-button"
            onClick={loadData}
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Загрузить данные"}
          </button>

          <button
            className="reset-button"
            onClick={resetData}
            disabled={loading}
          >
            Сбросить
          </button>
        </div>

        <div className="ajax-results">
          {loading && (
            <div className="loading-indicator">⏳ Загружаем данные...</div>
          )}

          {loaded && !loading && (
            <div className="data-container">
              <h4>Загруженные данные:</h4>
              <ul className="data-list">
                {data.map((item, index) => (
                  <li key={index} className="data-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!loaded && !loading && (
            <div className="no-data">
              Нажмите "Загрузить данные" чтобы увидеть AJAX в действии
            </div>
          )}
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

export default AjaxData;
