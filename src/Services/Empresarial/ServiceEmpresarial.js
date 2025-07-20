import axios from 'axios';

const API_URL = process.env.REACT_APP_NOCODB_URL;
const API_TOKEN = process.env.REACT_APP_NOCODB_TOKEN;

// ID da tabela: m55ck3esd1unqqd
export const buscarBannersEmpresariais = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v2/tables/m55ck3esd1unqqd/records`,
      {
        headers: {
          'xc-token': API_TOKEN,
          'Content-Type': 'application/json',
        },
        params: {
          fields: 'Banners-2K,Banners-4K,Banners-1080P,Banners-Mobile',
        },
      }
    );

    return response.data.list; // Retorna a lista completa de banners
  } catch (error) {
    console.error('Erro ao buscar os banners:', error);
    return [];
  }
};
