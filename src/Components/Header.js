import React from 'react';
import { Link } from "react-router-dom";
import '../Styles/Header.css';
import Button from './Button';
import logo from '../Assets/logo.png'; // Substitua pelo caminho correto da logo

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="MaxFibra Logo" />
      </div>
      <nav>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/cadastro">Cadastre-se</Link></li>
          <li><Link to="/empresas">Empresas</Link></li>
          <li><Link to="/trabalhe-conosco">Trabalhe Conosco</Link></li>
        </ul>
      </nav>
      <Button text="Acessar Central" href="https://ixc.maxfibraltda.com.br/" />
    </header>
  );
}
//          <li><a href="#sobre-nos">Sobre Nós</a></li>
export default Header;
