import { api } from 'src/boot/axios';

export default function useFeedApi() {

  const listarDisciplinas = async () => {
    try {
      const response = await api.get('/disciplinas');
      return response;
    } catch (error) {
      throw error;
    }
  };

  // const listarDisciplinaEspecifica = async (params: number) => {
  //   try {
  //     console.log("CHEGOU AQUI: ", params);
  //     const response = await api.get(`/disciplinas/${params}`);
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // const listarAvaliacoesMediaDisciplina = async (params: number) => {
  //   try {
  //     const response = await api.get(`/disciplina/${params}/avaliacoes-media`);
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // const listarAvaliacoesPorUsuarioEDisciplina = async (params: number) => {
  //   try {
  //     const response = await api.get(`/avaliacoes/usuario/${params}/disciplina/${params}`);
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  return {
    listarDisciplinas, 
    // listarDisciplinaEspecifica,
    // listarAvaliacoesMediaDisciplina,
    // listarAvaliacoesPorUsuarioEDisciplina
  }
}