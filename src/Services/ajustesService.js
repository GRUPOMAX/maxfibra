import axios from 'axios';

const API_URL = process.env.REACT_APP_NOCODB_URL;
const API_TOKEN = process.env.REACT_APP_NOCODB_TOKEN;

// Função para buscar a frase e a cor animada
const getDynamicPhrase = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v2/tables/msn8avbbru0z3er/records`,
      {
        headers: {
          'xc-token': API_TOKEN,
          'Content-Type': 'application/json',
        },
        params: {
          fields: 'Part_Frase_Sem_Efeito,Part_Frase_Com_Efeito,Efeito,colorTextAnimado',
          limit: 1, // Pegamos apenas a primeira linha da tabela
        },
      }
    );

    return response.data.list[0]; // Retorna apenas a primeira frase encontrada
  } catch (error) {
    console.error('Erro ao buscar a frase dinâmica:', error);
    return null;
  }
};

export default getDynamicPhrase;
