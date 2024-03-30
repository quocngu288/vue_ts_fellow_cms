<template>
  <a-card :title="$t($route?.meta?.title) || false">
   <VeeForm
     tag="form"
     v-slot:="{handleSubmit}"
     :initialValues="form"
   >
     <InputField
       name="mail"
       :label="$t('CONTACT_MAIL_SETTING.FORM.MAIL')"
       :label-col="6"
       :wrapper-col="12"
       rules="required|email_custom|max:100"
       :maxlength="100"
     />
     <a-form-item :wrapper-col="{ offset:6 }">
       <a-button
         type="primary"
         @click="handleSubmit($event, validateBeforeSubmit)"
         v-text="$t('CONTACT_MAIL_SETTING.FORM.SUBMIT')"
       />
     </a-form-item>
   </VeeForm>
  </a-card>
</template>
<script setup lang="ts">
import InputField from '@/views/components/InputField.vue'
import { onBeforeMount, reactive } from 'vue'
import useMailSetting from '@/shared/composables/useMailSetting'

const form = reactive<{ mail }>({
  mail: ''
})

const { postMailReceived, fetchMailReceived, mailReceived } = useMailSetting()

onBeforeMount(async () => {
  // get mail received
  await fetchMailReceived()
  mailReceived && (form.mail = mailReceived.value)
})

const validateBeforeSubmit = async (values) => {
  await postMailReceived(values)
}
</script>
