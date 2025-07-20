import axios from "axios";

const API_URL = "https://nocodb.nexusnerds.com.br";
const API_TOKEN = process.env.REACT_APP_NOCODB_TOKEN;

const getDownloadLinks = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v2/tables/mc1a7c2dt0u4f6r/records`,
      {
        headers: {
          "xc-token": API_TOKEN,
          "Content-Type": "application/json",
        },
        params: {
          fields: "Android,IOS",
          limit: 1, // Pegamos apenas o primeiro registro com os links
        },
      }
    );

    if (response.data.list.length > 0) {
      return response.data.list[0]; // Retorna os links de Android e iOS
    }
    return { Android: "", IOS: "" }; // Caso não tenha links, retorna vazio
  } catch (error) {
    console.error("Erro ao buscar os links de download:", error);
    return { Android: "", IOS: "" };
  }
};

export default getDownloadLinks;
