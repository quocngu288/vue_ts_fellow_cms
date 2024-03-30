<template>
  <a-select
    v-model:value="$i18n.locale"
    :options="OPTION_LOCALE"
    @change="switchLocale"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { OPTION_LOCALE } from '@/core/enums/options'
import { setLocale } from '@vee-validate/i18n'

const i18n = useI18n()
const switchLocale = (locale) => {
  i18n.locale.value = locale
  localStorage.setItem('locale', locale)
  setLocale(locale)
}
</script>
