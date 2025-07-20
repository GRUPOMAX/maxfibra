import axios from "axios";

const API_URL = process.env.REACT_APP_NOCODB_URL + "/api/v2/tables/mk6u4y0t8bbss7y/records";
const API_TOKEN = process.env.REACT_APP_NOCODB_TOKEN;

const StreamingService = {
  async getStreamingByPlano(plano) {
    //console.log(`🔍 Buscando serviços de streaming para o plano: ${plano}`);

    try {
      const columnName = `Plano ${plano}`;
      //console.log(`📌 Coluna que será consultada: ${columnName}`);

      const response = await axios.get(API_URL, {
        headers: {
          "xc-token": API_TOKEN,
          "Content-Type": "application/json"
        },
        params: {
          fields: `Title,${columnName}`,
          limit: 100
        }
      });

      //console.log("✅ Resposta da API:", response.data);

      if (!response.data.list || response.data.list.length === 0) {
        console.warn("⚠️ Nenhum serviço de streaming encontrado para este plano.");
        return [];
      }

      // Filtrar os serviços disponíveis no plano específico e dividir corretamente
      const services = response.data.list
        .map(item => item[columnName])
        .flat()
        .filter(Boolean)
        .join(",") // Junta tudo em uma única string
        .split(",") // Separa os serviços corretamente
        .map(service => service.trim()); // Remove espaços extras

      console.log("🎯 Serviços formatados para o plano:", services);
      return services;
    } catch (error) {
      console.error("❌ Erro ao buscar os serviços de streaming:", error);
      return [];
    }
  }
};

export default StreamingService;
