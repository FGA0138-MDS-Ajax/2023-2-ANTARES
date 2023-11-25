import useLoginApi from 'src/composables/UseLoginApi'

export default function LoginService(params: any) {
  return {
    registrar: useLoginApi(params).registrarUsuario,
    login: useLoginApi(params).logarUsuario,
    editar: useLoginApi(params).editarUsuario,
  };
}
