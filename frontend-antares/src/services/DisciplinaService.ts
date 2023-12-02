import useDisciplinaApi from 'src/composables/useDisciplinaApi';

export default function DiscplinaService() {
  return {
    listarDisciplinas: useDisciplinaApi().listarDisciplinas,
    // listarDisciplinaEspecifica: useDisciplinaApi(params).listarDisciplinaEspecifica,
    // listarAvaliacoesMediaDisciplina: useDisciplinaApi(params).listarAvaliacoesMediaDisciplina,
    // listarAvaliacoesPorUsuarioEDisciplina: useDisciplinaApi(params).listarAvaliacoesPorUsuarioEDisciplina
  }
};