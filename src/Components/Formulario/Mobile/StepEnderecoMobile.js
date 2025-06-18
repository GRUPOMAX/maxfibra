import React, { useState, useEffect } from "react";
import "../../../Styles/Formulario/Mobile/StepEnderecoMobile.css";
import SolicitarLocalizacaoModal from "../../Formulario/SolicitarLocalizacaoModal";
import GooglePlacesService from "../../../Services/GooglePlacesService";
import ViaCEPService from "../../../Services/ViaCEPService";
import Localizacao from "../Localizacao";

const StepEnderecoMobile = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [showModal, setShowModal] = useState(false);
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

  // Função para atualizar o CEP e o bairro quando o usuário escolhe um CEP do dropdown
  const handleCepChange = (e) => {
    const cepSelecionado = e.target.value;

    const cepData = cepsDisponiveis.find((cep) => cep.cep === cepSelecionado);
    if (cepData) {
      updateFormData({
        cep: cepData.cep,
        bairro: cepData.bairro, // 🔥 Atualiza o bairro automaticamente
      });
    }
  };

  useEffect(() => {
    const autocompleteInstance = GooglePlacesService.carregarGoogleAutocomplete(
      "autocomplete",
      (instance) => {
        GooglePlacesService.preencherEndereco(
          instance,
          (novoEndereco) => {
            updateFormData(novoEndereco); // 🔥 Atualiza todos os campos
            setCepsDisponiveis([]); // 🔥 Limpa a lista de CEPs antes de buscar novos
          },
          (uf, cidade, rua) => {
            return ViaCEPService.buscarCepPorEndereco(uf, cidade, rua)
              .then((ceps) => {
                //console.log("CEPs encontrados:", ceps);
                setCepsDisponiveis(ceps);

                // 🔥 Se houver apenas um CEP, atualiza automaticamente
                if (ceps.length === 1) {
                  updateFormData({ cep: ceps[0].cep, bairro: ceps[0].bairro });
                }
              })
              .catch((error) => console.error("Erro ao definir CEPs:", error));
          }
        );
      }
    );
  }, []);

  // 🔥 Sempre que a lista de CEPs mudar, verifica se só há um e preenche automaticamente
  useEffect(() => {
    if (cepsDisponiveis.length === 1) {
      updateFormData({ cep: cepsDisponiveis[0].cep, bairro: cepsDisponiveis[0].bairro });
    }
  }, [cepsDisponiveis]);

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

  const handleConfirmLocation = () => {
    setShowModal(false);
    localStorage.setItem("localizacaoAceita", "true");

    setTimeout(() => {
      solicitarLocalizacao();
    }, 500);
  };

  const handleCancelLocation = () => {
    setShowModal(false);
    localStorage.setItem("localizacaoAceita", "false");
  };

  return (
    <div className="step-container-mobile">
      {showModal && <SolicitarLocalizacaoModal onConfirm={handleConfirmLocation} onCancel={handleCancelLocation} />}

      <h2>Endereço</h2>

      <div>
        <label>Digite Seu Endereço</label>
        <input
          type="text"
          id="autocomplete"
          value={formData.rua || ""}
          onChange={(e) => updateFormData({ rua: e.target.value })}
          required
        />
      </div>

      {/* 🔥 Dropdown só aparece se houver mais de um CEP disponível */}
      {cepsDisponiveis.length > 1 && (
        <div className="cep-sugestoes">
          <label>Selecione um CEP disponível:</label>
          <select 
            value={formData.cep || ""}
            onChange={handleCepChange} // 🔥 Atualiza bairro junto com o CEP
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

<div className="input-duplo">
      <div>
      <label>Bairro *</label>
      <input
        type="text"
        value={formData.bairro || ""}
        onChange={(e) => updateFormData({ bairro: e.target.value })}
        required
      />
      </div>

        <div>
          <label>CEP *</label>
          <input
            type="text"
            value={formData.cep || ""}
            onChange={(e) => updateFormData({ cep: e.target.value })}
            required
          />
        </div>

</div>

      <div className="input-duplo">
        <div>
        <label>Número *</label>
          <input
            type="text"
            value={formData.numero || ""}
            onChange={(e) => updateFormData({ numero: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Cidade *</label>
          <input
            type="text"
            value={formData.cidade || ""}
            onChange={(e) => updateFormData({ cidade: e.target.value })}
            required
          />
        </div>


      </div>
          <label>Ponto de Referencia</label>
          <input
            type="text"
            value={formData.complemento || ""}
            onChange={(e) => updateFormData({ complemento: e.target.value })}
          />

        <div>
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


      {/* 🔥 Campos ocultos para armazenar Latitude e Longitude */}
      <input type="hidden" value={formData.latitude || ""} />
      <input type="hidden" value={formData.longitude || ""} />

      <div className="button-group-mobile">
        <button className="voltar-mobile" onClick={prevStep}>Voltar</button>
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

export default StepEnderecoMobile;
