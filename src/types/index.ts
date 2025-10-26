export interface Example {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "легкий" | "средний" | "сложный";
}

export interface CodeSnippet {
  language: string;
  code: string;
}
