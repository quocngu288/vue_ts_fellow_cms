<template>
  <div>
    <div class="success-counter">
      <span class="success-counter__title">{{ $t('DATA_SETTING.LINE_SUCCESS') }}</span>
      <span class="success-counter__number">{{ useStore.success }}</span>
    </div>
    <div class="fail-counter" v-if="useStore.fail > 0">
      <span class="fail-counter__title">{{ $t('DATA_SETTING.LINE_FAIL') }}</span>
      <span class="fail-counter__number">{{ useStore.fail }}</span>
    </div>
    <div class="list-error">
      <div class="list-error__item" v-for="(item, index) in useStore.errors" :key="index">
        <p>・ {{ $t('ERROR_CSV.LINE', {line :item.line }) }}</p>
        <p>{{ $t('ERROR_CSV.MESSAGE') }}： {{ item.message }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useImportStore } from '@/stores/ImportStore'

const useStore = useImportStore()
</script>

<style lang="scss" scoped>
.list-error {
  &__item {
    p {
      margin-bottom: 0;

      &:last-child {
        margin-bottom: 10px;
      }
    }
  }
}
.success-counter__number,.fail-counter__number {
  margin-left: 5px;
}
.fail-counter {
  margin-top: 10px;
}
</style>
