import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./Styles/index.css";
import Home from "./Pages/Home";
import LoadingScreen from "./Components/LoadingScreen";
import Cadastro from "./Pages/Cadastro";
import Empresas from "./Pages/Empresas";
import PageTrabalheConosco from "./Pages/PageTrabalheConosco";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <Router> {/* Agora, HashRouter será corretamente utilizado */}
      {loading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/trabalhe-conosco" element={<PageTrabalheConosco />} />
          {/* Redireciona para home se a rota não existir */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default Home;
