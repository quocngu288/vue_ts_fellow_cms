<template>
  <a-pagination
    v-bind="$attrs"
    class="position"
    :total="total"
    :show-total="showTotal ? (_ => `${$t('PAGINATION.TOTAL')} ${total} ${$t('PAGINATION.ITEMS')}`) : ''"
    :show-size-changer="showSizeChanger"
    :current="current"
    :page-size="pageSize"
    @change="num => $emit('changePage', num)"
    @showSizeChange="(_, size) => $emit('changePageSize', size)">
    <template #buildOptionText="props">
      {{props.value + ' / ' + $t('PAGINATION.PAGE')}}
    </template>
  </a-pagination>
</template>

<script lang="ts">

export default {
  inheritAttrs: false,

  props: {
    showTotal: { type: Boolean, default: true },
    showSizeChanger: { type: Boolean, default: true },
    current: { type: Number, default: undefined },
    pageSize: { type: Number, default: 20 },
    total: { type: Number, default: 100 },
    position: { type: String, default: 'right' }
  }
}
</script>

<style lang="scss" scoped>
.position {
  text-align: v-bind(position);
}
</style>
