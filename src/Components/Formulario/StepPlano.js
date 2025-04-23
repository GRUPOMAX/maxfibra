import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrecoPlano from "./PrecoPlano";
import StreamingService from "../../Services/StreamingService";
import VendedorService from "../../Services/VendedorService";
import "../../Styles/Formulario/StepPlano.css";
import CupomService from "../../Services/CupomService"; // ➕ importar o serviço de cupons

const StepPlano = ({ nextStep, prevStep, updateFormData, formData, tipoDocumento, setDesconto }) => {
  const navigate = useNavigate();
  const [streamingOptions, setStreamingOptions] = useState([]);
  const [vendedores, setVendedores] = useState([]); // ✅ Estado para armazenar vendedores
  const [isEditingPlano, setIsEditingPlano] = useState(false);
  
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
    fetchVendedores();
    fetchCupons();
  }, [formData.plano]);


  useEffect(() => {
    if (isCNPJ && (!formData.plano || !["Big Company", "Medium Company", "Startup Company"].includes(formData.plano))) {
      updateFormData({ plano: "Startup Company" });
      setSelectedPlano("Startup Company");
    } else if (!isCNPJ && (!formData.plano || !["Gold", "Infinity", "Turbo"].includes(formData.plano))) {
      updateFormData({ plano: "Gold" });
      setSelectedPlano("Gold");
    }
  }, [isCNPJ]);
  
    const fetchCupons = async () => { // ➕ buscar cupons
        try {
          const list = await CupomService.getCupons();
           setCupons(list);
         } catch (err) {
           console.error("Erro ao buscar cupons:", err);
         }
       };

       const handleValidarCupom = () => {
        const code = formData.cupom;
        const sel = cupons.find(c => c.CUPPOM === code);
      
        if (sel) {
          updateFormData({
            cupom: code,                // 🔥 garante que o cupom fica salvo no formData
            desconto: Number(sel.DESCONTO)
          });
          setDesconto(Number(sel.DESCONTO)); // 🔥 atualiza o desconto global
          setCupomValido(true);
        } else {
          updateFormData({
            cupom: code,                // 🔥 salva o cupom mesmo se inválido
            desconto: 0
          });
          setDesconto(0); // 🔥 reseta o desconto global
          setCupomValido(false);
        }
      };
      
      
      
      



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

    updateFormData({
      vendedor: vendedorSelecionado.nome,
      vendedorEmail: vendedorSelecionado.email, // ✅ Armazena o e-mail para enviar ao backend
    });
  };

  return (
    <div className="step-container">
      <h2 className="titulo-confirmacao">Plano Escolhido</h2>

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

        <span className="alterar-button" onClick={isEditingPlano ? handleSavePlano : handleEditPlano}>
          {isEditingPlano ? "Salvar" : "Alterar"}
        </span>
      </div>

      
      {/* Campo de Cupom */}
      <label>Cupom de Desconto (opcional):</label>
      <div style={{ display: 'flex', gap: '9px' }}>
      <input
            type="text"
            value={formData.cupom || ""}
            onChange={(e) => updateFormData({ cupom: e.target.value })}
            className="input-cupom"
            disabled={cupomValido === true}
            style={{ backgroundColor: "white" }}  // 🔥 Força a visibilidade
          />
          <button
            type="button"
            onClick={handleValidarCupom}
            style={{
              padding: '5px 10px',
              backgroundColor: cupomValido === true ? 'green' : '',
              color: cupomValido === true ? 'white' : '',
              border: cupomValido === true ? '1px solid green' : ''
            }}
          >
            {cupomValido === true ? "Válido" : "Validar"}
          </button>

      </div>



      <div className="precoD-planoD-containeMobile">
        <PrecoPlano plano={formData.plano} desconto={formData.desconto} />

      </div>

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


      <label>Data de Vencimento:</label>
      <select
        value={formData.vencimento || ""}
        onChange={(e) => {
          updateFormData({ vencimento: e.target.value });
        }}
      >
        <option value="">Selecione</option>
        <option value="05">Dia 05</option>
        <option value="10">Dia 10</option>
        <option value="20">Dia 20</option>
      </select>

      {/* ✅ Novo Select de Vendedor */}
      <label>Selecione um Vendedor:</label>
      <select value={formData.vendedor || ""} onChange={handleVendedorChange}>
        <option value="">Escolha um vendedor</option>
        {vendedores.map((vendedor, index) => (
          <option key={index} value={vendedor.nome}>
            {vendedor.nome}
          </option>
        ))}
      </select>

      <div className="button-group">
        <button className="voltar" onClick={prevStep}>
          Voltar
        </button>
          <button
            className={`proximo ${dadosPlanoValidos ? "btn-ativo" : "btn-desativado"}`}
            onClick={handleNext}
            disabled={!dadosPlanoValidos}
          >
            Próximo
          </button>

      </div>
    </div>
  );
};

export default StepPlano;
