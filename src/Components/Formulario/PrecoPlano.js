import React from "react";
import "../../Styles/Formulario/PrecoPlano.css";

const precosPlanos = {
  "Gold": 129.90,
  "Infinity": 169.90,
  "Turbo": 99.90,
  "Startup Company": 199.90,
  "Medium Company": 299.90,
  "Big Company": 399.90
};

const PrecoPlano = ({ plano, desconto = 0 }) => {
  const precoBase = precosPlanos[plano] || 0;
  const precoFinal = precoBase * (1 - desconto / 100);  // 🔥 Ajustado pra porcentagem

  return (
    <div className="preco-plano-container">
      <label>Valor: </label>
      <input
        type="text"
        value={`R$ ${precoFinal.toFixed(2).replace('.', ',')} / mês`}
        readOnly
      />
      {desconto > 0 && (
        <small style={{ color: "green" }}>
          {desconto}% de desconto aplicado!
        </small>
      )}
    </div>
  );
};

export default PrecoPlano;
