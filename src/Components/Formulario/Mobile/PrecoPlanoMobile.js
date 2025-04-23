import React from "react";

const precosPlanos = {
  "Gold": 129.90,
  "Infinity": 169.90,
  "Turbo": 99.90,
  "Startup Company": 199.90,
  "Medium Company": 299.90,
  "Big Company": 399.90
};

const PrecoPlanoMobile = ({ plano, desconto = 0 }) => {
  const precoBase = precosPlanos[plano] || 0;
  const precoFinal = precoBase * (1 - desconto / 100);  // 🔥 Desconto percentual

  return (
    <div className="plano-preco">
      <span>Total: </span>
      {desconto > 0 ? (
        <>
          <span style={{ textDecoration: 'line-through', color: '#ff4d4f', marginRight: '8px' }}>
            R$ {precoBase.toFixed(2).replace('.', ',')}
          </span>
          <span className="preco">
            R$ {precoFinal.toFixed(2).replace('.', ',')} / mês
          </span>
        </>
      ) : (
        <span className="preco">
          R$ {precoBase.toFixed(2).replace('.', ',')} / mês
        </span>
      )}
    </div>
  );
};

export default PrecoPlanoMobile;
