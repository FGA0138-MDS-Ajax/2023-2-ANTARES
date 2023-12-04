import useCardapioApi from 'src/composables/UseCardapioApi';

export default function CardapioService(params: any) {
  return {
    getAll: useCardapioApi(params).getAll,
    create: useCardapioApi(params).create,
    // Adicione outras funções conforme necessário para interagir com a API do cardápio
  };
}
