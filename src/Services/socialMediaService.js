const API_URL = process.env.REACT_APP_NOCODB_URL;
const API_TOKEN = process.env.REACT_APP_NOCODB_TOKEN;
const TABLE_ID = "mj60jnmo50y5djq";

export const fetchSocialLinks = async () => {
  try {
    const url = `${API_URL}/api/v2/tables/${TABLE_ID}/records`;

    //console.log("📡 Fazendo requisição para:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "xc-token": API_TOKEN, // Token de autenticação
      },
    });

    //console.log("🔄 Status da resposta:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao buscar os links das redes sociais: ${errorText}`);
    }

    const data = await response.json();
    //console.log("✅ Dados recebidos:", data);

    if (data.list.length === 0) return [];

    const socialLinks = [];
    const record = data.list[0]; // Pegamos o primeiro item da lista, pois só há um registro

    if (record.Instagram) {
      socialLinks.push({ platform: "instagram", url: record.Instagram });
    }
    if (record.Youtube) {
      socialLinks.push({ platform: "youtube", url: record.Youtube });
    }
    if (record.Facebook) {
      socialLinks.push({ platform: "facebook", url: record.Facebook });
    }

    return socialLinks;
  } catch (error) {
    console.error("❌ Erro na requisição:", error.message);
    return [];
  }
};

