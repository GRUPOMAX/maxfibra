import React from "react";
import "../../Styles/Formulario/PrecoPlano.css";

const precosPlanos = {
  "Gold": "R$ 129,90 / mês",
  "Infinity": "R$ 169,90 / mês",
  "Turbo": "R$ 99,90 / mês",
  "Startup Company": "R$ 199,90 / mês",
  "Medium Company": "R$ 299,90 / mês",
  "Big Company": "R$ 399,90 / mês"
};

const PrecoPlano = ({ plano }) => {
  return (
    <div className="preco-plano-container">
      <label>Valor: </label>
      <input type="text" value={precosPlanos[plano] || "Não disponível"} readOnly />
    </div>
  );
};

export default PrecoPlano;
