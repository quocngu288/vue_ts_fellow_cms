<template>
  <a-modal
    centered
    :visible="useModal.globalModal.isShow"
    :title="useModal.globalModal.title"
    :width="useModal.globalModal.width"
    :footer="null"
    @cancel="closeModal">
    <component :is="nameComponent" />
  </a-modal>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore'
import { computed, defineAsyncComponent } from 'vue'

const ModalExample = defineAsyncComponent(() => import('./ModalExample.vue'))
const ModalCreateIndustryType = defineAsyncComponent(() => import('./ModalCreateIndustryType.vue'))
const ModalResultImportCSV = defineAsyncComponent(() => import('./ModalResultImportCSV.vue'))

const modalContents = {
  ModalExample: ModalExample,
  ModalCreateIndustryType: ModalCreateIndustryType,
  ModalResultImportCSV: ModalResultImportCSV
}

const useModal = useModalStore()
const nameComponent = computed(() => {
  return useModal.globalModal.isShow ? modalContents[useModal.globalModal.content || 0] : null
})

const closeModal = () => {
  useModal.toggleModal({ isShow: false })
}
</script>

<style lang="scss" scoped></style>
