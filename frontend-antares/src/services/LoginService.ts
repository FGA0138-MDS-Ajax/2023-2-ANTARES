import useLoginApi from 'src/composables/UseLoginApi'

export default function LoginService(params: any) {
  return {
    registrar: useLoginApi(params).registrarUsuario,
  };
}