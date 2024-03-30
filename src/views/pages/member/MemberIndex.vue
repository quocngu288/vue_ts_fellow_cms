<template>
  <section class="member">
    <!--SEARCH-->
    <MemberSearch :data="{ industries: industries }" @filter-changed="onFilterChange($event)" />

    <!--TABLE-->
    <MemberTable
      :pagination="pagination"
      :data="members"
      @onPageChange="onPageChange"
      @onHandleEdit="onHandleEdit"
      @onHandleDelete="onHandleDelete"
    />
  </section>
</template>

<script setup lang='ts'>
import MemberSearch from '@/views/pages/member/components/MemberSearch.vue'
import MemberTable from '@/views/pages/member/components/MemberTable.vue'
import useMember from '@/views/pages/member/config/useMember'
import useFilterList from '@/shared/composables/useFilterList'
import { onMounted, ref } from 'vue'
import { PAGINATION_ENUM } from '@/core/enums/pagination.enum'
import { useRouter } from 'vue-router'
import useIndustry from '@/shared/composables/useIndustry'

const {
  members,
  pagination,
  fetchMembers,
  deleteMember
} = useMember()
const { filterParams, processParams, resetParams } = useFilterList()
const params = ref({ ...PAGINATION_ENUM })
const router = useRouter()
const {
  industries,
  fetchIndustries
} = useIndustry()

onMounted(async () => {
  await fetchIndustries()
  await fetchMembers({ ...params.value })
})

/**
 * On page change
 * @param pagination
 */
const onPageChange = async (pagination) => {
  if (pagination.current !== params.value.page) {
    params.value.page = pagination.current
    await loadList()
  }

  if (pagination.pageSize !== params.value.per_page) {
    params.value.page = 1
    params.value.per_page = pagination.pageSize
    await loadList()
  }
}

/**
 * Handle load list
 */
const loadList = async () => {
  const filter = { ...params.value, ...filterParams.value }
  await fetchMembers(filter)
}

/**
 * On handle edit
 * @param id
 */
const onHandleEdit = async (id) => {
  await router.push({
    name: 'MemberEdit',
    params: {
      id: id
    }
  })
}

/**
 * On handle delete
 * @param id
 */
const onHandleDelete = async (id) => {
  await deleteMember(id)
  await loadList()
}

/**
 * Handle Reset/Submit Filter
 * @param $event
 */
const onFilterChange = async ($event) => {
  const { type, value } = $event
  params.value.page = 1
  if (type === 'reset') resetParams()
  if (type === 'search') processParams(value)
  await loadList()
}
</script>
<style lang="scss" scoped></style>
