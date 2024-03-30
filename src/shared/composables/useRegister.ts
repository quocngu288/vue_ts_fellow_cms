import { reactive, ref, toRefs } from 'vue'
import { IPagination } from '@/core/interfaces/Pagination'
import { useRouter } from 'vue-router'
import useNotifications from '@/shared/composables/useNotifications'
import { IRegister } from '@/core/interfaces/Register'
import { useRegisterStore } from '@/stores/RegisterStore'

interface IState {
  isLoading: boolean,
  pagination: IPagination,
  registers: IRegister[]
}

export default function useRegister () {
  const router = useRouter()
  const { openNotification } = useNotifications()
  const useStoreRegister = useRegisterStore()

  const include = ref(null)

  const state = reactive<IState>({
    isLoading: false,
    pagination: {} as IPagination,
    registers: []
  })

  const fetchRegisters = async (params?: object, action?) => {
    state.isLoading = true
    try {
      const { data, pagination } = await useStoreRegister.getList({ include: include.value, ...params })
      state.registers = data
      state.pagination = pagination
    } catch (err) {
      if (action && err.response.status === 400) {
        action.setFieldError('regist_number_first', err.response.data.error.message)
        action.setFieldError('regist_number_last', err.response.data.error.message)
      }
    } finally {
      state.isLoading = false
    }
  }

  return {
    ...toRefs(state),
    fetchRegisters
  }
}
