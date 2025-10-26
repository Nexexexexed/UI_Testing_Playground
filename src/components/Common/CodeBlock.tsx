import React from "react";
import type { CodeSnippet } from "../../types";

const CodeBlock: React.FC<CodeSnippet> = ({ language, code }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <span>{language}</span>
        <button onClick={copyToClipboard}>Копировать</button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
