<template>
  <section class="data-setting">
    <!--Data Setting-->
    <DataSetting/>

    <!--Industry Type-->
    <IndustryType
      :data="industries"
      @onHandleDelete="onHandleDelete"
      @onHandleEdit="onHandleEdit"
    />
  </section>
</template>

<script setup lang='ts'>
import IndustryType from '@/views/pages/data-setting/components/IndustryType.vue'
import DataSetting from '@/views/pages/data-setting/components/DataSetting.vue'
import { onBeforeMount, watch, ref } from 'vue'
import useIndustry from '@/shared/composables/useIndustry'
import { useIndustryStore } from '@/stores/IndustryStore'

const {
  industries,
  updateIndustry,
  fetchIndustries,
  deleteIndustry
} = useIndustry()
const useStore = useIndustryStore()

watch(
  () => useStore.isReload,
  () => {
    if (useStore.isReload) {
      useStore.isReload = false
      loadList()
    }
  }
)

onBeforeMount(async () => {
  await fetchIndustries()
})

/**
 * On handle delete
 * @param id
 */
const onHandleDelete = async (id) => {
  await deleteIndustry(id)
  await loadList()
}

/**
 * On handle edit
 * @param item
 */
const onHandleEdit = async (item) => {
  const { element, oldIndex, newIndex } = item
  const id = element.id
  const body = {
    old_index: parseInt(oldIndex) + 1,
    new_index: parseInt(newIndex) + 1
  }

  await updateIndustry(id, body)
  await loadList()
}

/**
 * Handle load list
 */
const loadList = async () => {
  await fetchIndustries()
}
</script>
<style lang="scss" scoped></style>
