<template>
  <a-card :title="$t('INDUSTRY_TYPE.TITLE')">
    <template #extra>
      <a-button type="primary" @click="showModalCreateIndustryType">
        <PlusOutlined />
        {{ $t('BUTTON.ADD_INDUSTRY_TYPE') }}
      </a-button>
    </template>

    <!--Table custom -->
    <div class="ant-table ant-table-bordered">
      <div class="ant-table-container">
        <div class="ant-table-content">
          <table style="table-layout: auto;">
            <colgroup>
              <col style="width: 100px;">
              <col>
              <col style="width: 50px;">
            </colgroup>
            <thead class="ant-table-thead">
            <tr>
              <th
                class="ant-table-cell"
                v-for="(column, index) in columns"
                :key="index"
                :colstart="index"
                :colend="index"
              >
                {{ column.title }}
              </th>
            </tr>
            </thead>
            <VueDraggableNext
              style="cursor: move"
              ghostClass="ghost"
              tag="tbody"
              class="ant-table-tbody"
              :list="props.data"
              @change="handleChange"
            >
              <transition-group>
                <tr
                  v-for="element in props.data"
                  :key="element.id"
                  class="ant-table-row ant-table-row-level-0"
                >
                  <td class="ant-table-cell">{{ element.index_number }}</td>
                  <td class="ant-table-cell">{{ element.name }}</td>
                  <td class="ant-table-cell">
                    <a-tooltip>
                      <template #title>{{ $t('TOOLTIP.DELETE') }}</template>
                      <a-button type="danger" @click="showDeleteConfirm(element.id)">
                        <DeleteOutlined />
                      </a-button>
                    </a-tooltip>
                  </td>
                </tr>
              </transition-group>
            </VueDraggableNext>
          </table>
        </div>
      </div>
    </div>
  </a-card>
</template>
<script setup lang='ts'>
import { reactive, provide, computed } from 'vue'
import VueDraggable from '@/views/components/VueDraggable.vue'
import useTableList from '@/shared/composables/useTableList'
import { COLUMNS } from '@/views/pages/data-setting/config/columns'
import { IPagination } from '@/core/interfaces/Pagination'
import { IIndustry } from '@/core/interfaces/Industry'
import { useModalStore } from '@/stores/ModalStore'
import { useI18n } from 'vue-i18n'
import { cloneDeep, map } from 'lodash-es'
import { DefaultRecordType } from 'ant-design-vue/es/vc-table/interface'
import { VueDraggableNext } from 'vue-draggable-next'

interface Props {
  pagination?: IPagination,
  data: IIndustry[],
}

// Emits
const emit = defineEmits(['onHandleDelete', 'onHandleEdit'])
const props = defineProps<Props>()
const { showDeleteConfirm, handleEditRecord } = useTableList({ emit })
const useModal = useModalStore()
const { t } = useI18n()

const showModalCreateIndustryType = (): void => {
  useModal.toggleModal({
    isShow: true,
    width: '500px',
    title: t('MODAL.TITLE_INDUSTRY_TYPE'),
    content: 'ModalCreateIndustryType'
  })
}

const handleChange = (e) => {
  handleEditRecord(e.moved)
}

/**
 * translate i18n for title
 */
const columns = computed(() => {
  return map(cloneDeep(COLUMNS), (item: DefaultRecordType) => {
    if (item.title) item.title = t(item.title)
    return item
  })
})
</script>
<style lang="scss" scoped></style>
