import { Form, Field, FieldArray, ErrorMessage, configure, defineRule } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import dictionary from '@/locales/directory'
import './validator'

configure({
  validateOnInput: true,
  validateOnBlur: true,
  generateMessage: localize({
    en: {
      messages: {
        ...en.messages,
        ...dictionary.en
      }
    },
    ja: {
      messages: {
        ...ja.messages,
        ...dictionary.ja
      }
    }
  })
})

export function setupVeeValidate (app) {
  app.component('VeeForm', Form)
  app.component('VeeField', Field)
  app.component('VeeFieldArray', FieldArray)
  app.component('VeeErrorMessage', ErrorMessage)
}
