import React, { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../../../Styles/Formulario/Mobile/InformacoesPlano.css";

const precosPlanos = {
  "Gold": 129.90,
  "Infinity": 169.90,
  "Turbo": 99.90,
  "Startup Company": 199.90,
  "Medium Company": 299.90,
  "Big Company": 399.90
};

const velocidadesPlanos = {
  "Gold": "600 Mega",
  "Infinity": "800 Mega",
  "Turbo": "300 Mega",
  "Startup Company": "50 Mega",
  "Medium Company": "100 Mega",
  "Big Company": "200 Mega"
};

const InformacoesPlanoMobile = ({ plano, streaming, vencimento, tipoDocumento, desconto = 0 }) => {
  const [planoAtual, setPlanoAtual] = useState(plano);
  const [streamingAtual, setStreamingAtual] = useState(streaming);
  const [vencimentoAtual, setVencimentoAtual] = useState(vencimento);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => setPlanoAtual(plano), [plano]);
  useEffect(() => setStreamingAtual(streaming), [streaming]);
  useEffect(() => setVencimentoAtual(vencimento), [vencimento]);

  const precoBase = precosPlanos[planoAtual] || 0;
  const precoFinal = precoBase * (1 - desconto / 100);

  const velocidade = velocidadesPlanos[planoAtual] || "Não informado";

  // Fechar quando clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasNewData = streamingAtual !== "" || vencimentoAtual !== "";

  return (
    <div ref={containerRef} className={`plano-container-mobile ${isExpanded ? "expandido" : ""}`}>
      <div className="titulo-toggle" onClick={() => setIsExpanded(!isExpanded)}>
        <h2 className="TituloInforPlano">
          Seu Pedido
          {hasNewData && <span className="notificacao"></span>}
        </h2>
        {isExpanded ? <FaChevronUp className="icone-seta" /> : <FaChevronDown className="icone-seta" />}
      </div>

      {isExpanded && (
        <div className="plano-detalhes-mobile">
          <div className="plano-item">
            <span className="plano-label">Plano:</span>
            <span className="plano-valor">{planoAtual || "Nenhum plano selecionado"}</span>
          </div>
          <div className="plano-item">
            <span className="plano-label">Velocidade:</span>
            <span className="plano-valor">{velocidade}</span>
          </div>
          <div className="plano-item">
            <span className="plano-label">Serviços:</span>
            <span className="plano-valor">Wi-Fi Turbinado</span>
          </div>
          <div className="plano-item">
            <span className="plano-label">Modem Wi-Fi:</span>
            <span className="plano-valor">Incluído</span>
          </div>

          {tipoDocumento !== "CNPJ" && streamingAtual && streamingAtual !== "" && (
            <div className="plano-item">
              <span className="plano-label">Serviço Adicional:</span>
              <span className="plano-valor">{streamingAtual}</span>
            </div>
          )}

          <div className="plano-item">
            <span className="plano-label">Data de Vencimento:</span>
            <span className="plano-valor">{vencimentoAtual || "Não informado"}</span>
          </div>

          <div className="plano-total mobile">
            <span className="precoB">Total:</span>
            {desconto > 0 ? (
              <>
                <span style={{ textDecoration: 'line-through', color: '#e8e800', marginRight: '8px' }}>
                  R$ {precoBase.toFixed(2).replace('.', ',')}
                </span>
                <span className="preco">
                  R$ {precoFinal.toFixed(2).replace('.', ',')}
                </span>
              </>
            ) : (
              <span className="preco">
                R$ {precoBase.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InformacoesPlanoMobile;
