import React, { useState, useEffect } from "react";
import "../../Styles/Formulario/StepEndereco.css";
import SolicitarLocalizacaoModal from "./SolicitarLocalizacaoModal";
import GooglePlacesService from "../../Services/GooglePlacesService";
import ViaCEPService from "../../Services/ViaCEPService";
import Localizacao from "./Localizacao";

const StepEndereco = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [showModal, setShowModal] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [cepsDisponiveis, setCepsDisponiveis] = useState([]);
  const [enderecoValido, setEnderecoValido] = useState(false);

useEffect(() => {
  const camposPreenchidos =
    formData.cidade?.trim() &&
    formData.bairro?.trim() &&
    formData.cep?.trim() &&
    formData.rua?.trim() &&
    formData.numero?.trim() &&
    formData.tipoResidencia?.trim(); 

  setEnderecoValido(Boolean(camposPreenchidos));
}, [formData]);

  useEffect(() => {
    const localizacaoAceita = localStorage.getItem("localizacaoAceita");
    if (localizacaoAceita === "true") {
      solicitarLocalizacao();
    } else {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    const autocompleteInstance = GooglePlacesService.carregarGoogleAutocomplete(
      "autocomplete",
      (instance) => {
        GooglePlacesService.preencherEndereco(
          instance,
          updateFormData,
          (uf, cidade, rua) => {
            return ViaCEPService.buscarCepPorEndereco(uf, cidade, rua)
              .then((ceps) => {
                //console.log("CEPs encontrados:", ceps);
                setCepsDisponiveis(ceps);
              })
              .catch((error) => console.error("Erro ao definir CEPs:", error));
          },
          setCepsDisponiveis // Passa a função para atualizar a lista de CEPs
        );
      }
    );
  
    setAutocomplete(autocompleteInstance);
  }, []);
  
  

  useEffect(() => {
    if (formData.estado && formData.cidade && formData.rua) {
      //console.log("Buscando CEPs para:", formData.estado, formData.cidade, formData.rua);
      
      ViaCEPService.buscarCepPorEndereco(formData.estado, formData.cidade, formData.rua)
        .then((ceps) => {
          //console.log("CEPs encontrados:", ceps);
          setCepsDisponiveis(ceps); // Atualiza os CEPs disponíveis no dropdown
        })
        .catch((error) => console.error("Erro ao definir CEPs:", error));
    }
  }, [formData.estado, formData.cidade, formData.rua]); // 🔥 Agora observa mudanças no endereço!
  

  const handleCepChange = (e) => {
    const cepSelecionado = e.target.value;
  
    // 🔥 Encontra o objeto do CEP selecionado na lista de CEPs disponíveis
    const cepData = cepsDisponiveis.find((cep) => cep.cep === cepSelecionado);
  
    if (cepData) {
      updateFormData({
        cep: cepData.cep,
        bairro: cepData.bairro, // 🔥 Atualiza o bairro automaticamente
      });
    }
  };
  
  
  

  const solicitarLocalizacao = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateFormData({ latitude, longitude });
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          updateFormData({ latitude: "Não informada", longitude: "Não informada" });
        }
      );
    } else {
      updateFormData({ latitude: "Não disponível", longitude: "Não disponível" });
    }
  };


  return (
    <div className="step-container">
      {showModal && <SolicitarLocalizacaoModal onConfirm={() => setShowModal(false)} onCancel={() => setShowModal(false)} />}

      <h2 className="titulo-confirmacao">Endereço</h2>

      <label>Digite Seu Endereço</label>
      <input type="text" id="autocomplete" placeholder="Digite um endereço..." />

      {cepsDisponiveis.length > 1 && (
        <div className="cep-sugestoes">
          <label>Selecione um CEP disponível:</label>
          <select 
              value={formData.cep || ""}
              onChange={handleCepChange} // 🔥 Agora o bairro será atualizado junto com o CEP
            >
              <option value="">Escolha um CEP</option>
              {cepsDisponiveis.map((cepData, index) => (
                <option key={index} value={cepData.cep}>
                  {cepData.cep} - {cepData.logradouro}, {cepData.bairro}
                </option>
              ))}
            </select>

        </div>
      )}


      <label>Cidade *</label>
      <input type="text" value={formData.cidade} onChange={(e) => updateFormData({ cidade: e.target.value })} required />

      <div className="linha">
        <div className="campo">
          <label>Bairro *</label>
          <input type="text" value={formData.bairro} onChange={(e) => updateFormData({ bairro: e.target.value })} required />
        </div>

        <div className="campo">
          <label>CEP *</label>
          <input type="text" value={formData.cep} onChange={(e) => updateFormData({ cep: e.target.value })} required />
        </div>
      </div>

      <label>Rua *</label>
      <input type="text" value={formData.rua} onChange={(e) => updateFormData({ rua: e.target.value })} required />

        <div className="linha">
          <div className="campo">
            <label>Tipo de Residência *</label>
            <select
              value={formData.tipoResidencia || ""}
              onChange={(e) => updateFormData({ tipoResidencia: e.target.value })}
              required
            >
              <option value="">Selecione</option>
              <option value="própria">Própria</option>
              <option value="alugada">Alugada</option>
            </select>
          </div>
        </div>


      <div className="linha">
        <div className="campo">
          <label>Número *</label>
          <input type="text" value={formData.numero} onChange={(e) => updateFormData({ numero: e.target.value })} required />
        </div>

        <div className="campo">
          <label>Ponto de Referência: </label>
          <input type="text" value={formData.complemento} onChange={(e) => updateFormData({ complemento: e.target.value })} />
        </div>
      </div>
      <div className="button-group">
        <button className="voltar" onClick={prevStep}>Voltar</button>
        <button
            className={`proximo ${enderecoValido ? "btn-ativo" : "btn-desativado"}`}
            onClick={nextStep}
            disabled={!enderecoValido}
          >
            Próximo
          </button>

      </div>
    </div>
  );
};

export default StepEndereco;
