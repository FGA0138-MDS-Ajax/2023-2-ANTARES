import useAdminApi from '../composables/UseAdminApi'

export default function AdminService(params: any) {
  return {
    getLogs: useAdminApi(params).carregarLogs
  };
}