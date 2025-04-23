import React, { useEffect, useState } from "react";
import "../../Styles/Formulario/InformacoesPlano.css";

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
  "Turbo": "400 Mega",
  "Startup Company": "50 Mega",
  "Medium Company": "100 Mega",
  "Big Company": "200 Mega"
};


const InformacoesPlano = ({ plano, streaming, vencimento, tipoDocumento, desconto = 0 }) => {
  const [planoAtual, setPlanoAtual] = useState(plano);
  const [streamingAtual, setStreamingAtual] = useState(streaming);
  const [vencimentoAtual, setVencimentoAtual] = useState(vencimento);



  useEffect(() => {
    setPlanoAtual(plano);
  }, [plano]);

  useEffect(() => {
    setStreamingAtual(streaming);
  }, [streaming]);

  useEffect(() => {
    setVencimentoAtual(vencimento);
  }, [vencimento]); // Atualiza sempre que `vencimento` mudar

  const preco = precosPlanos[planoAtual] || "Não disponível";
  const velocidade = velocidadesPlanos[planoAtual] || "Não informado";

  return (
    <div className="plano-container">
      <h2 className="TituloInforPlano">Seu Pedido</h2>
      <div className="plano-detalhes">
        <div className="plano-item">
          <span className="plano-label">Plano:</span>
          <span className="plano-valor">{planoAtual || "Nenhum plano selecionado"}</span>
        </div>
        <div className="plano-item">
          <span className="plano-label">Velocidade:</span>
          <span className="plano-valor">{velocidade || "Não selecionado"}</span>
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

        <div className="plano-total">
            <span>Total:</span>
            {desconto > 0 ? (
              <div>
                    <span style={{ textDecoration: 'line-through', color: '#e8e800', marginRight: '8px' }}>
                      R$ {preco.toFixed(2).replace('.', ',')}
                    </span>
                  <span className="precoCadastro">
                  R$ {(preco - desconto).toFixed(2).replace('.', ',')}                
                </span>
              </div>
            ) : (
              <span className="precoCadastro">
                R$ {preco.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

      </div>
    </div>
  );
};

export default InformacoesPlano;