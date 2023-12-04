import useCardapioApi from 'src/composables/UseCardapioApi';

export default function CardapioService(params: any) {
  return {
    getAll: useCardapioApi(params).getAll,
    // Adicione outras funções conforme necessário para interagir com a API do cardápio
  };
}
