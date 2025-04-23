import axios from 'axios';

const API = process.env.REACT_APP_NOCODB_URL;      // https://nocodb.nexusnerds.com.br :contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}
const TOKEN = process.env.REACT_APP_NOCODB_TOKEN;  // t1agRg8TzKX_D1kr9HEiB8A1dY3pAHLUD5XEP7Ib :contentReference[oaicite:2]{index=2}&#8203;:contentReference[oaicite:3]{index=3}

export default {
  getCupons: async () => {
    const res = await axios.get(
      `${API}/api/v2/tables/mskrcs3wzgsp5sr/records`,
      {
        headers: { 'xc-token': TOKEN },
        params: {
          fields: ['Id','CUPPOM','DESCONTO','VALIDADE']  // conforme API “CUPOM – DESCONTO FICHA” 
        }
      }
    );
    return res.data.list;
  }
};
