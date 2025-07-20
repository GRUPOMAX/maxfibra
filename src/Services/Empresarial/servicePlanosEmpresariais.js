import axios from 'axios';

const API_URL = process.env.REACT_APP_NOCODB_URL;
const API_TOKEN = process.env.REACT_APP_NOCODB_TOKEN;

// ID da tabela com os planos empresariais
const TABLE_ID = 'm4k1kwxh1ufq0pu';

export const buscarPlanosEmpresariais = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v2/tables/${TABLE_ID}/records`, {
      headers: {
        'xc-token': API_TOKEN,
        'Content-Type': 'application/json'
      },
      params: {
        fields: 'Plano_Startup,Plano_Medium,Plano_Big'
      }
    });

    const plano = response.data.list[0]; // assume que está na primeira linha
    return {
      startup: plano.Plano_Startup,
      medium: plano.Plano_Medium,
      big: plano.Plano_Big
    };
  } catch (error) {
    console.error('Erro ao buscar os planos empresariais:', error);
    return null;
  }
};
