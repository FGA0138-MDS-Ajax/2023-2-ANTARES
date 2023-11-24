import usePublicarVagasApi from 'src/composables/UseVagasApi'

export default function PublicarVagasService(params: any) {
    return {
      publicar: usePublicarVagasApi(params).publicarVaga
    };
  }