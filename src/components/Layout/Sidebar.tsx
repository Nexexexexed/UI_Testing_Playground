import React from "react";
import { Link, useLocation } from "react-router-dom";
import { examples } from "../../examples/config";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <h3>Примеры</h3>
      <ul>
        {examples.map((example) => (
          <li key={example.id}>
            <Link
              to={`/example/${example.id}`}
              className={
                location.pathname === `/example/${example.id}` ? "active" : ""
              }
            >
              {example.title}
            </Link>
          </li>
        ))}
      </ul>
      <h3>Веб сайт</h3>
      <ul>
        <li>
          <Link to={`/website`}>Тестовый сайт</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
