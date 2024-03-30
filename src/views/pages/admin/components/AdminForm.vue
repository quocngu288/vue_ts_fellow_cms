<template>
  <a-card
    :title="isCreate ? $t('ADMIN.TITLE_CREATE') : $t('ADMIN.TITLE_EDIT')"
    :bordered="false"
  >
    <!--FORM-->
    <VeeForm
      tag="form"
      v-slot="{ handleSubmit }"
      :initialValues="form"
    >
      <!-- Fullname Field -->
      <InputField
        name="full_name"
        :label="$t('ADMIN.FORM.FULL_NAME')"
        v-model:value="form.full_name"
        :label-col="6"
        :wrapper-col="14"
        rules="required|max:100|special_characters_regex"
        :maxlength="100"
      />

      <!-- Furigana Field -->
      <InputField
        name="furigana_name"
        :label="$t('ADMIN.FORM.FURIGANA')"
        v-model:value="form.furigana_name"
        :label-col="6"
        :wrapper-col="14"
        rules="required_custom|hiragana_regex|max:100"
        :maxlength="100"
      />

      <!-- Password Field -->
      <PasswordField
        name="password"
        :label="$t('ADMIN.FORM.PASSWORD')"
        v-model:value="form.password"
        :label-col="6"
        :wrapper-col="14"
        :rules="`${isCreate ? 'required_custom|' : ''}password_regex`"
      />

      <!-- Password Confirm Field -->
      <PasswordField
        name="password_confirmation"
        :label="$t('ADMIN.FORM.PASSWORD_CONFIRM')"
        v-model:value="form.password_confirmation"
        :label-col="6"
        :wrapper-col="14"
        :rules="`${isCreate ? 'required_custom|' : ''}password_confirmed:@password`"
      />

      <!-- Mail Field -->
      <InputField
        name="email"
        :label="$t('ADMIN.FORM.MAIL')"
        v-model:value="form.email"
        :label-col="6"
        :wrapper-col="14"
        rules="required_custom|email_custom|max:100"
        :maxlength="100"
      />

      <!-- Gender Field -->
      <SelectField
        name="gender"
        :label="$t('ADMIN.FORM.GENDER')"
        :field-names="{ label: 'label', value: 'value' }"
        :options="OPTION_GENDER.map(({ label, value }) => ({ label: $t(label) , value: value}))"
        :label-col="6"
        :wrapper-col="14"
        v-model:value="form.gender"
      />

      <!-- Telephone Field -->
      <InputField
        name="phone"
        :label="$t('ADMIN.FORM.TELEPHONE')"
        v-model:value="form.phone"
        :label-col="6"
        :wrapper-col="14"
        rules="phone_regex"
        :maxlength="11"
      />

      <InputDatePickerField
        name="birthday"
        :label="$t('ADMIN.FORM.BIRTHDAY')"
        v-model:value="form.birthday"
        :placeholder="''"
        :label-col="6"
        :wrapper-col="14"
      />

      <!-- Permission Role Field -->
      <SelectField
        name="role"
        :label="$t('ADMIN.FORM.PERMISSION_ROLE')"
        :field-names="{ label: 'label', value: 'value' }"
        :options="OPTION_ROLE.map(({ label, value }) => ({ label: $t(label) , value: value}))"
        :label-col="6"
        :wrapper-col="14"
        v-model:value="form.role"
        rules="required_custom"
      />

      <a-form-item :wrapper-col="{ span: 14, offset: 6 }">

        <!--Button submit-->
        <a-button
          type="primary"
          @click="handleSubmit($event, validateBeforeSubmit)"
          v-text="isCreate ? $t('BUTTON.CREATE') :$t('BUTTON.EDIT') "
        />

        <!--Button cancel-->
        <a-button
          style="margin-left: 16px"
          @click="redirectToList"
          v-text="$t('BUTTON.CANCEL')"
        />
      </a-form-item>
    </VeeForm>
  </a-card>
</template>

<script setup lang='ts'>
import { onBeforeMount, reactive, ref, Ref } from 'vue'
import InputField from '@/views/components/InputField.vue'
import PasswordField from '@/views/components/PasswordField.vue'
import SelectField from '@/views/components/SelectField.vue'
import InputDatePickerField from '@/views/components/InputDatePickerField.vue'
import { IAdminForm } from '@/core/interfaces/Admin'
import useAdmin from '@/views/pages/admin/config/useAdmin'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { OPTION_ROLE, OPTION_GENDER } from '@/core/enums/options'
import * as _ from 'lodash-es'
import { isEmpty } from 'lodash-es'
import useFilterList from '@/shared/composables/useFilterList'

const { admin, fetchAdmin, updateAdmin, addAdmin } = useAdmin()
const route = useRoute()
const router = useRouter()

const form = reactive<IAdminForm>({
  id: '',
  full_name: '',
  furigana_name: '',
  password: '',
  password_confirmation: '',
  email: '',
  gender: '',
  phone: '',
  birthday: '',
  role: '',
  roles: []
})
const isCreate: Ref<boolean> = ref(false)

onBeforeMount(async () => {
  isCreate.value = route?.name === 'AdminCreate'
  if (!isCreate.value) {
    await fetchAdmin(route.params.id as string, {})
    Object.assign(form, admin.value)
    form.gender = admin.value.gender?.key
    form.birthday = admin.value.birthday ? dayjs(admin.value.birthday) : ''
    form.role = admin.value?.roles?.[0]?.name
  }
})

const validateBeforeSubmit = async (values, action) => {
  const id = route.params.id as string
  const _values = _.cloneDeep(values)

  if (!_.isEmpty(_values.birthday)) {
    _values.birthday = dayjs(_values.birthday).format('YYYY-MM-DD')
  }

  if (_.isEmpty(_values.birthday)) {
    delete _values.birthday
  }

  if (_.isEmpty(_values.password)) {
    delete _values.password
    delete _values.password_confirmation
  }

  if (isCreate.value) {
    await addAdmin(_values, action)
  } else {
    await updateAdmin(id, _values, action)
  }
}

const redirectToList = async () => {
  await router.push({ name: 'Admin' })
}
</script>

<style lang="scss" scoped></style>
