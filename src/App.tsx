import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Home from "./pages/Home";
import { examples } from "./examples/config.tsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {examples.map((example) => (
            <Route
              key={example.id}
              path={`/example/${example.id}`}
              element={<example.component />}
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
