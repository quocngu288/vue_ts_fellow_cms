import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import ja from '@/locales/ja.json'
// import dictionary from '@/locales/directory'

const messages = {
  ja: {
    ...ja
  },
  en: {
    ...en
  }
}

export const i18n = createI18n({
  legacy: false,
  allowComposition: true,
  locale: process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages
})

// setup i18n instance with glob
export async function setupI18n (app) {
  app.use(i18n)
}
