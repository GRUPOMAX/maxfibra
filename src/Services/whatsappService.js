const API_URL = process.env.REACT_APP_NOCODB_URL;
const API_TOKEN = process.env.REACT_APP_NOCODB_TOKEN;

/**
 * Busca o número do WhatsApp do NocoDB
 */
export const fetchWhatsAppNumber = async () => {
    try {
        const response = await fetch(`${API_URL}/api/v2/tables/mffas5ywmeamxoo/records`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "xc-token": API_TOKEN,
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar o número do WhatsApp");
        }

        const data = await response.json();
        return data.list[0].Numero; // Substitua pelo nome correto da coluna
    } catch (error) {
        console.error("Erro ao buscar número do WhatsApp:", error);
        return null;
    }
};
