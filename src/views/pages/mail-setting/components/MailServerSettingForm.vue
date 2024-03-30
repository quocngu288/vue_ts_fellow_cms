<template>
  <a-card>
    <!-- title -->
    <template #title>
      {{$t($route.meta['title']) || false}}
    </template>

    <!-- setting form-->
    <div class="mail-setting-form">
      <VeeForm tag="form" v-slot="{ handleSubmit }" :initialValues="form">

        <!-- Type Field -->
        <RadioGroupField
          name="type"
          v-model:value="form.type"
          :label="$t('MAIL_SERVER_SETTING.FORM.TYPE')"
          :label-col="6"
          :wrapper-col="14"
          :field-names="{ label: 'label', value: 'value' }"
          :options="MAIL_SETTING_OPTIONS.map(({ label, value }) => ({ label: $t(label) , value: value}))"
          @change="handleChangeType()"
          :colChild="12"
        />

        <!--Mail Sent Field-->
        <InputField
          name="mail_sent"
          v-model:value="form.mail_sent"
          :label="$t('MAIL_SERVER_SETTING.FORM.MAIL_FOR_SENT')"
          :label-col="6"
          :wrapper-col="14"
          rules="required|special_characters_regex|email_custom|max:100"
          :maxlength="100"
        />

        <!--Password Mail Field-->
        <PasswordField
          name="password_mail"
          v-model:value="form.password_mail"
          :label="$t('MAIL_SERVER_SETTING.FORM.PASSWORD')"
          :label-col="6"
          :wrapper-col="14"
          :hasLabel="true"
          rules="required|special_characters_regex|max:16"
          :maxlength="16"
        />

        <!-- Port Field -->
        <InputField
          name="port"
          v-model:value="form.port"
          v-if="isOtherType"
          :label="$t('MAIL_SERVER_SETTING.FORM.PORT')"
          :label-col="6"
          :wrapper-col="14"
          rules="required|special_characters_regex|max:5"
          :maxlength="5"
        />

        <!-- Host Field -->
        <InputField
          name="host"
          v-model:value="form.host"
          v-if="isOtherType"
          :label="$t('MAIL_SERVER_SETTING.FORM.HOST')"
          :label-col="6"
          :wrapper-col="14"
          rules="required|special_characters_regex|max:200"
          :maxlength="200"
        />

        <!--Encryption Field-->
        <SelectField
          name="encryption"
          v-model:value="form.encryption"
          v-if="isOtherType"
          :label="$t('MAIL_SERVER_SETTING.FORM.ENCRYPTION')"
          :label-col="6"
          :wrapper-col="14"
          :options="ENCRIPTION_OPTIONS.map(({ label, value }) => ({ label: $t(label) , value: value}))"
          rules="required"
        />
          <!--  submit button  -->
        <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
          <a-button
            type="primary"
            @click="handleSubmit($event, validateBeforeSubmit)"
            v-text="$t('BUTTON.OK')"
          />
        </a-form-item>
      </VeeForm>

    </div>
  </a-card>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, reactive } from 'vue'
import InputField from '@/views/components/InputField.vue'
import PasswordField from '@/views/components/PasswordField.vue'
import RadioGroupField from '@/views/components/RadioGroupField.vue'
import SelectField from '@/views/components/SelectField.vue'
import { MAIL_SETTING_OPTIONS, ENCRIPTION_OPTIONS } from '@/core/enums/options'
import { ISettingMailForm } from '@/core/interfaces/SettingMail'
import useMailSetting from '@/shared/composables/useMailSetting'
import * as _ from 'lodash-es'

const {
  settingMails,
  fetchSettingMailDefault,
  fetchSettingMail,
  postSettingMailServer
} = useMailSetting()
const isOtherType = computed(() => form.type === 'other')

// Init form
const form = reactive<ISettingMailForm>({
  type: 'gmail',
  mail_sent: '',
  password_mail: '',
  host: '',
  port: '',
  encryption: ''
})

onBeforeMount(async () => {
  await fetchSettingMailDefault()
  Object.assign(form, settingMails.value)
})

/**
 * Handle validate before submit
 * @param values
 */
const validateBeforeSubmit = async (values) => {
  const { type } = form

  if (type === 'gmail') {
    values = _.omit(values, ['host', 'port', 'encryption'])
  }

  await postSettingMailServer(values)
}

const handleChangeType = async () => {
  const { type } = form
  await fetchSettingMail(type, form)
}

</script>
