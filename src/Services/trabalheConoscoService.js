// src/services/trabalheConoscoService.js
const API_URL = 'https://max.api.email.nexusnerds.com.br/trabalhe-conosco';

export async function enviarFormularioTrabalheConosco(dados) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: dados // NÃO adicionar Content-Type manualmente com FormData!
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar o formulário.');
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Erro no envio do formulário Trabalhe Conosco:', error);
    throw error;
  }
}
