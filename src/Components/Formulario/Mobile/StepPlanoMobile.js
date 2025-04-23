import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PrecoPlanoMobile from "./PrecoPlanoMobile";
import "../../../Styles/Formulario/Mobile/StepPlanoMobile.css";
import StreamingService from "../../../Services/StreamingService";
import VendedorService from "../../../Services/VendedorService"; // Importa o service dos vendedores
import CupomService from "../../../Services/CupomService"; // ➕ importar o serviço de cupons



const StepPlanoMobile = ({ nextStep, prevStep, updateFormData, formData, setDesconto }) => {
  const navigate = useNavigate();
  const [streamingOptions, setStreamingOptions] = useState([]);
  const [isEditingPlano, setIsEditingPlano] = useState(false);
  const [vendedores, setVendedores] = useState([]); // ✅ Estado para vendedores
  const [loadingCupons, setLoadingCupons] = useState(false);



  const [selectedPlano, setSelectedPlano] = useState(formData.plano);
  const [dadosPlanoValidos, setDadosPlanoValidos] = useState(false);


  const isCNPJ = formData.tipoDocumento === "CNPJ";

  
  const [cupons, setCupons] = useState([]); // ➕ estado para cupons
  const [cupomValido, setCupomValido] = useState(null); // null, true, false



  useEffect(() => {
    const planoPreenchido = !!formData.plano;
    const vencimentoSelecionado = !!formData.vencimento;
    const vendedorSelecionado = !!formData.vendedor;


    setDadosPlanoValidos(planoPreenchido && vencimentoSelecionado && vendedorSelecionado);
  }, [formData]);

  useEffect(() => {
    if (isCNPJ && (!formData.plano || !["Big Company", "Medium Company", "Startup Company"].includes(formData.plano))) {
      updateFormData({ plano: "Startup Company" });
      setSelectedPlano("Startup Company");
    } else if (!isCNPJ && (!formData.plano || !["Gold", "Infinity", "Turbo"].includes(formData.plano))) {
      updateFormData({ plano: "Gold" });
      setSelectedPlano("Gold");
    }
  }, [isCNPJ]);

  useEffect(() => {
    const fetchStreamingOptions = async () => {
      if (formData.plano) {
        const services = await StreamingService.getStreamingByPlano(formData.plano);
        setStreamingOptions(services);
      }
    };

    const fetchVendedores = async () => {
      const vendedoresList = await VendedorService.getVendedores();
      setVendedores(vendedoresList);
    };

    fetchStreamingOptions();
    fetchVendedores(); // ✅ Busca os vendedores na montagem do componente
    fetchCupons();
  }, [formData.plano]);

  const handleNext = () => {
    if (!formData.plano) {
      alert("Selecione um plano antes de continuar!");
      return;
    }

    if (!formData.vencimento) {
      alert("Selecione uma data de vencimento!");
      return;
    }

    if (!formData.vendedor) {
      alert("Selecione um vendedor!");
      return;
    }

    //console.log("🚀 Enviando dados para Cadastro:", formData);

    updateFormData({
      vencimento: formData.vencimento,
      streaming: formData.streaming,
      vendedor: formData.vendedor,
    });

    nextStep();
  };

  const handleEditPlano = () => {
    setIsEditingPlano(true);
  };

  const handleSavePlano = () => {
    updateFormData({ plano: selectedPlano });
    setIsEditingPlano(false);
  };

  // ✅ Função para atualizar nome e e-mail do vendedor no formData
  const handleVendedorChange = (event) => {
    const nomeVendedor = event.target.value;
    const vendedorSelecionado = vendedores.find((v) => v.nome === nomeVendedor);

    if (vendedorSelecionado) {
      updateFormData({
        vendedor: vendedorSelecionado.nome,
        vendedorEmail: vendedorSelecionado.email, // ✅ Armazena o e-mail para envio ao backend
      });
    }
  };


  const fetchCupons = async () => {
    try {
      setLoadingCupons(true);
      const list = await CupomService.getCupons();
      setCupons(list);
    } catch (err) {
      console.error("Erro ao buscar cupons:", err);
    } finally {
      setLoadingCupons(false);
    }
  };
  

  const handleValidarCupom = () => {
    const code = formData.cupom; // Já está em lowercase devido ao onChange do input
    const sel = cupons.find(c => c.CUPPOM.toLowerCase() === code); // 🔥 Converte CUPPOM para lowercase para comparação
  
    if (sel) {
      updateFormData({
        cupom: code,                // 🔥 Garante que o cupom fica salvo no formData (já em lowercase)
        desconto: Number(sel.DESCONTO)
      });
      setDesconto(Number(sel.DESCONTO)); // 🔥 Atualiza o desconto global
      setCupomValido(true);
    } else {
      updateFormData({
        cupom: code,                // 🔥 Salva o cupom mesmo se inválido (já em lowercase)
        desconto: 0
      });
      setDesconto(0); // 🔥 Reseta o desconto global
      setCupomValido(false);
    }
  };
  



  return (
<div className="step-container-mobile">
  <h2 className="titulo-confirmacao">Plano Escolhido</h2>

  {/* Plano selecionado */}
  <div className="plano-selecionado-wrapper">
    <label>Plano Selecionado:</label>
    <div className="plano-selecionado-container">
      {isEditingPlano ? (
        <select
          value={selectedPlano}
          onChange={(e) => setSelectedPlano(e.target.value)}
          className="plano-edit-select"
        >
          {isCNPJ ? (
            <>
              <option value="Big Company">Big Company</option>
              <option value="Medium Company">Medium Company</option>
              <option value="Startup Company">Startup Company</option>
            </>
          ) : (
            <>
              <option value="Gold">Gold</option>
              <option value="Infinity">Infinity</option>
              <option value="Turbo">Turbo</option>
            </>
          )}
        </select>
      ) : (
        <span className="plano-text">{formData.plano}</span>
      )}

      <span
        className="alterar-button"
        onClick={isEditingPlano ? handleSavePlano : handleEditPlano}
      >
        {isEditingPlano ? "Salvar" : "Alterar"}
      </span>
    </div>
  </div>

  {/* Cupom de desconto */}
  <label>Cupom de Desconto (opcional):</label>
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <input
        type="text"
        value={formData.cupom || ""}
        onChange={(e) => updateFormData({ cupom: e.target.value.toLowerCase() })} // 🔥 Converte para minúsculas
        className="input-cupom"
        disabled={cupomValido === true}
      />
      <button
        type="button"
        onClick={handleValidarCupom}
        disabled={loadingCupons || !cupons.length || cupomValido === true}
        style={{
          padding: "5px 12px",
          borderRadius: "6px",
          backgroundColor: cupomValido === true ? "#38A169" : "#e2e8f0",
          color: cupomValido === true ? "white" : "black",
          border: cupomValido === true ? "1px solid #2f855a" : "1px solid #cbd5e0",
          fontWeight: "bold",
          cursor: loadingCupons ? "not-allowed" : "pointer",
        }}
      >
        {loadingCupons ? "Carregando..." : cupomValido === true ? "Válido" : "Validar"}
      </button>
    </div>

  {/* Preço final */}
  <div className="precoM-planoM-containeMobile">
    <PrecoPlanoMobile plano={formData.plano} desconto={formData.desconto} />
  </div>

  {/* Streaming */}
  {!isCNPJ && (
    <>
      <label>Serviço Adicional:</label>
      <select
        value={formData.streaming}
        onChange={(e) => updateFormData({ streaming: e.target.value })}
      >
        <option value="">Nenhum</option>
        {streamingOptions.map((service, index) => (
          <option key={index} value={service}>
            {service}
          </option>
        ))}
      </select>
    </>
  )}

  {/* Vencimento */}
  <label>Data de Vencimento:</label>
  <select
    className="custom-select"
    value={formData.vencimento}
    onChange={(e) => updateFormData({ vencimento: e.target.value })}
  >
    <option value="">Selecione</option>
    <option value="05">Dia 05</option>
    <option value="10">Dia 10</option>
    <option value="20">Dia 20</option>
  </select>

  {/* Vendedor */}
  <label>Selecione um Vendedor:</label>
  <select value={formData.vendedor || ""} onChange={handleVendedorChange}>
    <option value="">Escolha um vendedor</option>
    {vendedores.map((vendedor, index) => (
      <option key={index} value={vendedor.nome}>
        {vendedor.nome}
      </option>
    ))}
  </select>

  {/* Botões */}
  <div className="button-group-mobile">
    <button className="voltar-mobile" onClick={prevStep}>
      Voltar
    </button>
    <button
      className={`proximo-mobile ${dadosPlanoValidos ? "btn-ativo" : "btn-desativado"}`}
      onClick={handleNext}
      disabled={!dadosPlanoValidos}
    >
      Próximo
    </button>
  </div>
</div>

  );
};

export default StepPlanoMobile;
