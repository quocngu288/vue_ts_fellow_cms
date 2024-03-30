import { reactive, toRefs } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { flatten, map, uniqBy } from 'lodash-es'

interface IState {
  profileTmp: any
}

export default function useAllowPermission () {
  const useAuth = useAuthStore()
  const state = reactive<IState>({
    profileTmp: {}
  })

  const checkAllowPermission = (permissions?: any) => {
    state.profileTmp = useAuth.profile
    const permissionsOfUser = uniqBy(flatten(map(state.profileTmp?.roles, 'permissions')), 'id')
    const hasExistPermission = permissionsOfUser.filter(item => permissions.includes(item.name))
    return !!hasExistPermission.length
  }

  return {
    ...toRefs(state),
    checkAllowPermission
  }
}
