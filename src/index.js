import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./Styles/index.css";
import Home from "./Pages/Home";
import LoadingScreen from "./Components/LoadingScreen";
import Cadastro from "./Pages/Cadastro";
import Empresas from "./Pages/Empresas";
import PageTrabalheConosco from "./Pages/PageTrabalheConosco";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <Router>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/trabalhe-conosco" element={<PageTrabalheConosco />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
      <ToastContainer position="top-right" autoClose={4000} />
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
