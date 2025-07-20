import axios from "axios";

const API_URL = "https://nocodb.nexusnerds.com.br"; // URL base da API
const API_TOKEN = process.env.REACT_APP_NOCODB_TOKEN; // Token do .env

const getDuvidasFrequentes = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v2/tables/mwqhz56q4lrymb6/records`, // Endpoint da tabela "Duvidas Frequentes"
      {
        headers: {
          "xc-token": API_TOKEN,
          "Content-Type": "application/json",
        },
        params: {
          fields: "DuvidasJson", // Pegando apenas a coluna DuvidasJson
          limit: 10, // Ajuste conforme necessário
        },
      }
    );

    // 🔥 Agora pegamos TODAS as perguntas corretamente!
    return response.data.list.flatMap((item) =>
      item.DuvidasJson.flatMap((duvida) =>
        duvida.Perguntas.map((perguntaItem) => ({
          pergunta: perguntaItem.Pergunta,
          resposta: perguntaItem.Resposta.map((res) => res.Resposta_Pergunta).join("\n\n") // Junta todas as respostas corretamente
        }))
      )
    );
  } catch (error) {
    console.error("Erro ao buscar as dúvidas frequentes:", error);
    return [];
  }
};

export default getDuvidasFrequentes;
