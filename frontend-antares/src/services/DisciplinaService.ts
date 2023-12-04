import useDisciplinaApi from 'src/composables/useDisciplinaApi';

export default function DiscplinaService() {
  return {
    listarDisciplinas: useDisciplinaApi().listarDisciplinas,
  }
};