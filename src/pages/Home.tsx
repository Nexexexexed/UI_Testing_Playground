import React from "react";
import { Link } from "react-router-dom";
import { examples } from "../examples/config";

const Home: React.FC = () => {
  const examplesByCategory = examples.reduce((acc, example) => {
    if (!acc[example.category]) {
      acc[example.category] = [];
    }
    acc[example.category].push(example);
    return acc;
  }, {} as Record<string, typeof examples>);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "легкий":
        return "#27ae60";
      case "средний":
        return "#f39c12";
      case "сложный":
        return "#e74c3c";
      default:
        return "#95a5a6";
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Площадка для тестирования UI</h1>
        <p className="hero-description">
          Практикуйте навыки автоматизации тестирования с реалистичными
          сценариями и задачами. Каждый пример представляет распространенные
          проблемы UI-тестирования с примерами кода для различных фреймворков.
        </p>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <h3>{examples.length}</h3>
          <p>Примеров</p>
        </div>
        <div className="stat-card">
          <h3>{Object.keys(examplesByCategory).length}</h3>
          <p>Категорий</p>
        </div>
        <div className="stat-card">
          <h3>
            {examples.filter((e) => e.difficulty === "легкий").length}/
            {examples.filter((e) => e.difficulty === "средний").length}/
            {examples.filter((e) => e.difficulty === "сложный").length}
          </h3>
          <p>Легко/Средне/Сложно</p>
        </div>
      </div>

      {Object.entries(examplesByCategory).map(
        ([category, categoryExamples]) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="examples-grid">
              {categoryExamples.map((example) => (
                <Link
                  key={example.id}
                  to={`/example/${example.id}`}
                  className="example-card"
                >
                  <div className="example-card-header">
                    <h3>{example.title}</h3>
                    <span
                      className="difficulty-badge"
                      style={{
                        backgroundColor: getDifficultyColor(example.difficulty),
                      }}
                    >
                      {example.difficulty}
                    </span>
                  </div>
                  <p className="example-description">{example.description}</p>
                  <div className="example-card-footer">
                    <span className="try-button">Попробовать →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      )}

      <div className="getting-started">
        <h2>Как начать</h2>
        <div className="instructions">
          <div className="instruction-step">
            <div className="step-number">1</div>
            <h3>Выберите пример</h3>
            <p>
              Просмотрите примеры и выберите тот, который соответствует тому,
              что вы хотите попрактиковать.
            </p>
          </div>
          <div className="instruction-step">
            <div className="step-number">2</div>
            <h3>Изучите задачу</h3>
            <p>Прочитайте описание и определите проблему тестирования.</p>
          </div>
          <div className="instruction-step">
            <div className="step-number">3</div>
            <h3>Напишите тест</h3>
            <p>
              Используйте предоставленные примеры кода как reference для
              написания своего кода автоматизации.
            </p>
          </div>
          <div className="instruction-step">
            <div className="step-number">4</div>
            <h3>Практикуйтесь и изучайте</h3>
            <p>
              Экспериментируйте с разными подходами и улучшайте свои навыки
              тестирования.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
