import { defineRule } from 'vee-validate'
import { email, max, min, required, confirmed } from '@vee-validate/rules'

defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('required', required)
defineRule('required_custom', required)
defineRule('password_confirmed', confirmed)
defineRule('radio_required_custom', required)
defineRule('required_other', required)

defineRule('password_regex', (value) => {
  return value ? /^[a-zA-Z0-9!@#$%^&*+_-]{8,}$/.test(value) : true
})

defineRule('email_custom', (value) => {
  return /^[a-zA-Z0-9]{1}[a-zA-Z0-9_.-]*@{1}[a-zA-Z0-9_-]{1,}(?:\.[a-zA-Z0-9_-]+)+$/.test(value)
})

defineRule('url_custom', (value) => {
  return value ? /^(http|https)?:\/\//.test(value) : true
})

defineRule('phone_regex', (value) => {
  return value ? /^[0-9]{10,11}$/.test(value) : true
})

defineRule('hiragana_regex', (value) => {
  return /^[ぁ-ゖー・]+$/.test(value)
})

defineRule('special_characters_regex', (value) => {
  return value ? /^[^;<=>/[\]{|}\\￥]+$/.test(value) : true // ;<=>/[\]{|}￥
})

defineRule('select_up_to_3', (value) => {
  return typeof Array && value.length <= 3
})

defineRule('xlsx_regex', (value) => {
  const type = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  return type.includes(value.type)
})
