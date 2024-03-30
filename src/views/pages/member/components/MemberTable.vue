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
          <!--industry_type-->
          <template v-if="column.key === 'industry_type'">
            <div v-for="item in record.industryTypes" :key="item.id">{{ item.name }}</div>
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
import { COLUMNS } from '@/views/pages/member/config/columns'
import { computed } from 'vue'
import { map, cloneDeep } from 'lodash-es'
import { useI18n } from 'vue-i18n'
import { DefaultRecordType } from 'ant-design-vue/es/vc-table/interface'
import { IMember } from '@/core/interfaces/Member'
import useTableList from '@/shared/composables/useTableList'

interface Props {
  pagination?: IPagination,
  data: IMember[],
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
