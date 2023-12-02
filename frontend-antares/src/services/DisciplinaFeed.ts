import useDisciplinaApi from 'src/composables/useDisciplinaApi';

export default function DisciplinaService() {
  console.log('DisciplinaService')
  return {
    listarDisciplinas: useDisciplinaApi().listarDisciplinas
  };
}
