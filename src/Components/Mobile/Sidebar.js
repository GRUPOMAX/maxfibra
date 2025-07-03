import React, { useEffect, useRef } from "react";
import { HashRouter as Router, Link, useLocation } from "react-router-dom";
import "../../Styles/Mobile/Sidebar.css";
import SocialMediaFooter from "./SocialMediaFooter";

function Sidebar({ isOpen, toggleSidebar }) {
  const sidebarRef = useRef(null);
  const location = useLocation(); // Pegando a URL atual

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>×</button>
      
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Início
          </Link>
        </li>
        <li>
          <Link to="/cadastro" className={location.pathname === "/cadastro" ? "active" : ""}>
            Cadastre-se
          </Link>
        </li>
        <li>
          <Link to="/empresas" className={location.pathname === "/empresas" ? "active" : ""}>
            Empresas
          </Link>
        </li>
        <li>
          <Link to="/trabalhe-conosco" className={location.pathname === "/trabalhe-conosco" ? "active" : ""}>
            Trabalhe Conosco
          </Link>
        </li>

        <li>
            <a
              href="https://discord.oficial.maxfibraltda.com.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord Oficial
            </a>
          </li>
      </ul>

      <a
        href="https://ixc.maxfibraltda.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        className="acessar-central"
      >
        <span className="text-default">Clientes Max Fibra</span>
        <span className="text-hover">Central</span>
      </a>

      <SocialMediaFooter />
    </div>
  );
}

export default Sidebar;
/*

Não utilizado no momomento

        <li>
          <Link to="/sobre" className={location.pathname === "/sobre" ? "active" : ""}>
            Sobre Nós
          </Link>
        </li>




*/