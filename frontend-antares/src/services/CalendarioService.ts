import useCalendarioApi from 'src/composables/UseCalendarioApi'

export default function CalendarioService(params: any) {
    const { publicarEvento } = useCalendarioApi(params);
    const { getEventos } = useCalendarioApi(params);
    return {
      publicar: publicarEvento,
      getEventos: getEventos,
    };
}
