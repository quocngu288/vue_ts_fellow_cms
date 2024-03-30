import { reactive, toRefs } from 'vue'

interface IState {
  filterParams: object,
  arrDates: string[]
}

export default function useFilterList () {
  const state = reactive<IState>({
    filterParams: {},
    arrDates: []
  })

  const processParams = (filter) => {
    const { filterParams, arrDates } = state

    Object.keys(filter).forEach((key) => {
      if (arrDates.includes(key) && filter[key].length > 0) {
        filterParams[`filter[${key}_start]`] = filter[key][0] || ''
        filterParams[`filter[${key}_end]`] = filter[key][1] || ''
      } else if (filter[key]) {
        // check is apply_date is null
        if (arrDates.includes(key) && filter[key].length === 0) {
          delete filterParams[`filter[${key}_start]`]
          delete filterParams[`filter[${key}_end]`]
        } else {
          filterParams[`filter[${key}]`] = filter[key]
        }
      } else {
        delete filterParams[`filter[${key}]`]
      }
    })
  }

  const resetParams = () => {
    state.filterParams = {}
  }

  return {
    ...toRefs(state),
    processParams,
    resetParams
  }
}
