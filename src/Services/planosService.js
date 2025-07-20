import axios from 'axios';

const API_URL = process.env.REACT_APP_NOCODB_URL;
const API_TOKEN = process.env.REACT_APP_NOCODB_TOKEN;

const getServicosAdicionais = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v2/tables/mv8txmhvciv3mhr/records`, {
      headers: {
        'xc-token': API_TOKEN,
        'Content-Type': 'application/json',
      },
      params: {
        fields: 'Plano - Turbo - Serviço Adicional,Plano - Gold - Serviço Adicional,Plano - Infinity - Serviço Adicional,Tag-MaisVendido',
        limit: 1,
      },
    });

    const data = response.data.list[0];

    return {
      turbo: {
        servicos: data["Plano - Turbo - Serviço Adicional"]?.[0]?.Serviços || [],
        maisVendido: data["Tag-MaisVendido"] === "Turbo",
      },
      gold: {
        servicos: data["Plano - Gold - Serviço Adicional"]?.[0]?.Serviços || [],
        maisVendido: data["Tag-MaisVendido"] === "Gold",
      },
      infinity: {
        servicos: data["Plano - Infinity - Serviço Adicional"]?.[0]?.Serviços || [],
        maisVendido: data["Tag-MaisVendido"] === "Infinity",
      }
    };
  } catch (error) {
    console.error('Erro ao buscar os serviços adicionais:', error);
    return { turbo: { servicos: [], maisVendido: false }, gold: { servicos: [], maisVendido: false }, infinity: { servicos: [], maisVendido: false } };
  }
};

export default getServicosAdicionais;
