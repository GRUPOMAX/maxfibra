import axios from "axios";

const API_URL = process.env.REACT_APP_NOCODB_URL;
const API_TOKEN = process.env.REACT_APP_NOCODB_TOKEN;

const VendedorService = {
  getVendedores: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v2/tables/mo4wnahtbw2mog2/records`, {
        headers: {
          "xc-token": API_TOKEN,
          "Content-Type": "application/json",
        },
        params: {
          fields: "Vendedor",
          limit: 100,
        },
      });

      //console.log("🔍 Resposta completa da API:", response.data);

      if (!response.data.list || response.data.list.length === 0) {
        console.warn("⚠️ Nenhum vendedor encontrado!");
        return [];
      }

      const primeiroRegistro = response.data.list[0];

      if (!primeiroRegistro.Vendedor || typeof primeiroRegistro.Vendedor !== "object") {
        console.warn("⚠️ O campo 'Vendedor' não é um objeto válido!");
        return [];
      }

      // ✅ Converte para array de objetos [{ nome: "Joao", email: "joao@email.com" }, ...]
      const vendedores = Object.values(primeiroRegistro.Vendedor);

      //console.log("✅ Vendedores encontrados:", vendedores);
      return vendedores;
    } catch (error) {
      console.error("❌ Erro ao buscar vendedores:", error);
      return [];
    }
  },
};

export default VendedorService;
