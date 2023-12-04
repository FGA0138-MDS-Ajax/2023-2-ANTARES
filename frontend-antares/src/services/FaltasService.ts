import useFaltasApi from 'src/composables/UseFaltasApi'

export default function FaltasService(params: any) {
    return {
        publicar: useFaltasApi(params).postarMateria,
        listar: useFaltasApi(params).listarFaltas,
        atualizar: useFaltasApi(params).atualizarFaltas
    };
  }