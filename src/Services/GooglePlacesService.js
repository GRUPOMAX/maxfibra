const GooglePlacesService = {
  carregarGoogleAutocomplete: (inputId, preencherEndereco) => {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;

    const input = document.getElementById(inputId);
    if (!input) return;

    const options = { types: ["geocode"], componentRestrictions: { country: "BR" } };
    const autocomplete = new window.google.maps.places.Autocomplete(input, options);

    autocomplete.addListener("place_changed", () => preencherEndereco(autocomplete));

    input.style.pointerEvents = "auto";
    input.style.cursor = "text";

    return autocomplete;
  },

  preencherEndereco: (autocompleteInstance, updateFormData, buscarCepAlternativo, setCepsDisponiveis) => {
    const place = autocompleteInstance.getPlace();
    if (!place.address_components) return;
  
    let endereco = {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    };

    place.address_components.forEach((component) => {
      const types = component.types;

      if (types.includes("route")) endereco.rua = component.long_name;
      if (types.includes("street_number")) endereco.numero = component.long_name;
      
      // SEMPRE Prioriza "sublocality_level_1" para bairro 
      if (types.includes("sublocality_level_1")) endereco.bairro = component.long_name;
      else if (types.includes("sublocality") || types.includes("neighborhood")) endereco.bairro = component.long_name;

      if (types.includes("administrative_area_level_2")) endereco.cidade = component.long_name;
      if (types.includes("administrative_area_level_1")) endereco.estado = component.short_name;
      if (types.includes("postal_code")) endereco.cep = component.long_name;
    });

    //console.log("Endereço extraído do Google Places:", endereco);

    // Atualiza os campos antes de buscar os CEPs
    updateFormData({
      rua: endereco.rua,
      numero: endereco.numero,
      bairro: endereco.bairro, // Agora o bairro está correto!
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep,
    });

    // 🔥 Se não encontrou um CEP, tenta buscar pelo ViaCEP
    if (!endereco.cep && endereco.estado && endereco.cidade && endereco.rua) {
      if (typeof buscarCepAlternativo === "function") {
        buscarCepAlternativo(endereco.estado, endereco.cidade, endereco.rua)
          .then((ceps) => {
            //console.log("CEPs encontrados pelo ViaCEP:", ceps);
            if (ceps && ceps.length > 0) {
              updateFormData({ cep: ceps[0].cep }); // Define o primeiro CEP encontrado
              setCepsDisponiveis(ceps); // Atualiza a lista de CEPs disponíveis no dropdown
            }
          })
          .catch((error) => console.error("Erro ao buscar CEPs alternativos:", error));
      } else {
        console.error("Erro: buscarCepAlternativo não é uma função válida.");
      }
    }
  
    return endereco;
  }
};

export default GooglePlacesService;
