<template>
  <router-view/>

  <Loading v-if="useLoader.loading"/>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale, localize } from '@vee-validate/i18n'
import { useLoaderStore } from '@/stores/LoaderStore'
import Loading from '@/views/components/Loading.vue'

// Set init locale
const i18n = useI18n()
const setInitLocale = () => {
  const locale = localStorage.getItem('locale')
  if (locale) {
    i18n.locale.value = locale
    setLocale(locale)
    localize(locale)
  }
}
setInitLocale()

// Set loading
const useLoader = useLoaderStore()
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
