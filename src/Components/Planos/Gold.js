import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import getServicosAdicionais from '../../Services/planosService';
import { FaWifi, FaTachometerAlt, FaHeadset, FaGamepad, FaCheckCircle } from 'react-icons/fa';
import '../../Styles/Planos.css';
import '../../Styles/PlanosAnimations.css';
import Formulario from "../Formulario/Formulario";
import ModalGamer from "./ModalGamer"; // ajuste o caminho

function Gold() {
  const [servicos, setServicos] = useState([]);
  const [maisVendido, setMaisVendido] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarModalGamer, setMostrarModalGamer] = useState(false);

  const handleAssinar = () => {
    navigate("/cadastro", { state: { plano: "Gold" } });
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicos = async () => {
      const data = await getServicosAdicionais();
      setServicos(data.gold.servicos || []);
      setMaisVendido(data.gold.maisVendido);
    };

    fetchServicos();
  }, []);

  const abrirModalGamer = () => {
    setMostrarModalGamer(true);
  };

  return (
    <>
      <div className="plano-card gold-animation">
        {maisVendido && <div className="mais-vendido-tag">Mais Vendido</div>}

        <h3>Gold</h3>
        <p className="preco">R$ 129,90 / mês</p>

        <ul className="plano-beneficios">
          <li><FaWifi /> Wi-Fi de Alta Performance 5G</li>
          <li><FaCheckCircle /> Wi-Fi Prêmio</li>
          <li><FaTachometerAlt /> Velocidade de Download 600 Mega</li>
          <li className="gamer-click" onClick={abrirModalGamer}>
            <FaGamepad /> Suporte Gamer Especializado
          </li>
          <li><FaHeadset /> Suporte em 48 Horas</li>
        </ul>

        <div className="servicos-list">
          <h4>Serviços Inclusos</h4>
          <div className="servicos-grid">
            {servicos.map((servico, index) => (
              <div key={index} className="servico-item">
                <img src={servico.Foto?.[0]?.url || '/placeholder.jpg'} alt={servico.nome || 'Serviço'} />
              </div>
            ))}
          </div>
        </div>

        <p className="obs">Obs.: Cliente tem acesso exclusivo a apenas 1 dos Apps mencionados acima.</p>

        <button className="assinar-btn" onClick={handleAssinar}>
          ASSINE AGORA
        </button>
      </div>

      {mostrarModalGamer && <ModalGamer onClose={() => setMostrarModalGamer(false)} />}



    </>
  );
}

export default Gold;
