const AREA_ESTUDO_URL = process.env.REACT_APP_LISTA_AREA_ESTUDO;

export async function buscarAreasDeEstudo() {
  try {
    const response = await fetch(AREA_ESTUDO_URL);
    if (!response.ok) throw new Error('Erro ao buscar áreas');
    const data = await response.json();
    console.log('🔎 Dados brutos recebidos:', data);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Erro ao carregar áreas de estudo:', error);
    return [];
  }
}
