import React from "react";
import ReactDOM from "react-dom";
import "../../Styles/ModalGamer.css";

const ModalGamer = ({ onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
        ×
        </button>





        <div className="modal-logo">
          <img src="/discordLogo.svg" alt="Discord Logo" />
        </div>

        <h2 className="modal-title">
          SUPORTE GAMER <span className="text-green">DISCORD</span>
        </h2>

        <p className="modal-subtitle">
          Atendimento prioritário para problemas de
        </p>

        <div className="modal-icons-row">
          {[
            { src: "/latencia.png", label: "LATÊNCIA" },
            { src: "/ping.png", label: "PING" },
            { src: "/nat.png", label: "NAT" },
          ].map(({ src, label }, idx) => (
            <div className="modal-icon-box" key={idx}>
              <img src={src} alt={label} className="modal-icon-img" />
              <span className="modal-icon-label">{label}</span>
            </div>
          ))}
        </div>

        <h3 className="modal-section-title">NOS PRINCIPAIS JOGOS ONLINE.</h3>

        <ul className="modal-list">
          <li><span className="text-green">• TÉCNICOS</span> ESPECIALIZADOS NO CENÁRIO <span className="text-green">GAMER</span></li>
          <li>• DIAGNÓSTICO PARA <span className="text-green">JOGOS ESPECÍFICOS</span></li>
          <li>• <span className="text-green">OTIMIZAÇÃO</span> DE ROTA E ANÁLISE DE PING</li>
        </ul>

        <button
          className="modal-button"
          onClick={() => window.open("https://discord.oficial.maxfibraltda.com.br/", "_blank")}
        >
          <img src="/discordLogo.svg" className="modal-icon" alt="discord" />
          ENTRAR NO DISCORD OFICIAL
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ModalGamer;
