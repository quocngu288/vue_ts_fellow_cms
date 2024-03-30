<template>
  <section class="admin">
    <!--SEARCH-->
    <AdminSearch @filter-changed="onFilterChange($event)" />

    <!--TABLE-->
    <AdminTable
      :pagination="pagination"
      :data="admins"
      @onPageChange="onPageChange"
      @onHandleEdit="onHandleEdit"
      @onHandleDelete="onHandleDelete"
    />
  </section>
</template>

<script setup lang='ts'>
import AdminSearch from '@/views/pages/admin/components/AdminSearch.vue'
import AdminTable from '@/views/pages/admin/components/AdminTable.vue'
import useAdmin from '@/views/pages/admin/config/useAdmin'
import useFilterList from '@/shared/composables/useFilterList'
import { onMounted, ref } from 'vue'
import { PAGINATION_ENUM } from '@/core/enums/pagination.enum'
import { useRouter } from 'vue-router'

const {
  admins,
  pagination,
  fetchAdmins,
  deleteAdmin
} = useAdmin()
const { filterParams, processParams, resetParams } = useFilterList()
const params = ref({ ...PAGINATION_ENUM })
const router = useRouter()

onMounted(async () => {
  await fetchAdmins({ ...params.value })
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
  await fetchAdmins(filter)
}

/**
 * On handle edit
 * @param id
 */
const onHandleEdit = async (id) => {
  await router.push({
    name: 'AdminEdit',
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
  await deleteAdmin(id)
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
