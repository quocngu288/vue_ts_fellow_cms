<template>
  <div class="container">
    <a-card :title="false">
      <a-table
        size="middle"
        class="ant-table-custom"
        :rowKey="(item) => item.id"
        :columns="columns"
        :data-source="data"
        :pagination="{ ...convertPagination(pagination) }"
        :scroll="{ x: '100%'}"
        :locale="{ emptyText: $t('COMMON.DATA_EMPTY') }"
        @change="handleChangePagination"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <!--created_at-->
          <template v-if="column.key === 'created_at'">
            {{ $filters.momentJa(record?.created_at) }}
          </template>

          <!--updated_at-->
          <template v-if="column.key === 'updated_at'">
            {{ $filters.momentJa(record?.updated_at) }}
          </template>

          <!--action-->
          <template v-if="column.key === 'action'">
            <a-space>
              <a-tooltip>
                <template #title>{{ $t('TOOLTIP.EDIT') }}</template>
                <a-button type="primary" @click="handleEditRecord(record?.id)">
                  <EditOutlined />
                </a-button>
              </a-tooltip>
              <a-tooltip>
                <template #title>{{ $t('TOOLTIP.DELETE') }}</template>
                <a-button type="danger" @click="showDeleteConfirm(record?.id)">
                  <DeleteOutlined />
                </a-button>
              </a-tooltip>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { convertPagination } from '@/shared/utils/helper'
import { IPagination } from '@/core/interfaces/Pagination'
import { COLUMNS } from '@/views/pages/admin/config/columns'
import { computed } from 'vue'
import { map, cloneDeep } from 'lodash-es'
import { useI18n } from 'vue-i18n'
import { DefaultRecordType } from 'ant-design-vue/es/vc-table/interface'
import { IAdmin } from '@/core/interfaces/Admin'
import useTableList from '@/shared/composables/useTableList'

interface Props {
  pagination?: IPagination,
  data: IAdmin[],
}

// Emits
const emit = defineEmits(['onPageChange', 'onHandleDelete', 'onHandleEdit'])
const props = defineProps<Props>()
const { t } = useI18n()
const {
  handleChangePagination,
  handleEditRecord,
  showDeleteConfirm
} = useTableList({ emit })

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
