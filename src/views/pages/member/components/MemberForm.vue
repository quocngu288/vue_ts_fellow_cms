<template>
  <a-card
    :title="isCreate ? $t('MEMBER.TITLE_CREATE') : $t('MEMBER.TITLE_EDIT')"
    :bordered="false"
  >
    <!--FORM-->
    <VeeForm
      tag="form"
      v-slot="{ values, errors, handleSubmit, setFieldValue, setFieldError, validateField }"
      :initialValues="form"
    >

      <!--Regist member field-->
      <a-form>
        <a-form-item
          :label="$t('MEMBER.FORM.REGIST_NUMBER')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
          required
        >
          <div class="regist-number regist-number--form">
            <InputField
              class="regist-number__first"
              name="regist_number_first"
              :label="$t('MEMBER.FORM.REGIST_NUMBER')"
              :label-display="false"
              rules="required_custom"
              v-model:value="form.regist_number_first"
              :has-error="false"
              :disabled="!isCreate"
            />

            <span
              class="ant-form-text"
              v-text="$t('MEMBER.FORM.REGIST_NUMBER_TAG')"
            />

            <!-- Regist number first field -->
            <InputField
              class="regist-number__last"
              :label-display="false"
              name="regist_number_last"
              :label="$t('MEMBER.FORM.REGIST_NUMBER')"
              rules="required_custom"
              v-model:value="form.regist_number_last"
              :has-error="false"
              :disabled="!isCreate"
            />

            <a-button
              type="primary"
              class="btn-auto-fill"
              v-text="$t('BUTTON.AUTO_INPUT')"
              @click="handleAutoInput(values, { setFieldValue, setFieldError, validateField })"
              :disabled="!isCreate"
            />
          </div>
          <span v-if="errors.regist_number_first || errors.regist_number_last" class="errors">
            {{ errors.regist_number_first || errors.regist_number_last }}
          </span>
        </a-form-item>

        <!-- Agency name Field -->
        <InputField
          name="agency_name"
          :label="$t('MEMBER.FORM.AGENCY_NAME')"
          v-model:value="form.agency_name"
          :label-col="6"
          :wrapper-col="14"
          rules="required_custom|max:100|special_characters_regex"
          :maxlength="100"
        />

        <!-- Location Field -->
        <InputField
          name="location"
          :label="$t('MEMBER.FORM.LOCATION')"
          v-model:value="form.location"
          :label-col="6"
          :wrapper-col="14"
          rules="required_custom|max:100|special_characters_regex"
          :maxlength="100"
        />

        <!-- Representative name Field -->
        <InputField
          name="representatives_name"
          :label="$t('MEMBER.FORM.REPRESENTATIVE_NAME')"
          v-model:value="form.representatives_name"
          :label-col="6"
          :wrapper-col="14"
          rules="required_custom|max:100|special_characters_regex"
          :maxlength="100"
        />

        <!-- Pic name Field -->
        <InputField
          name="pic_name"
          :label="$t('MEMBER.FORM.PIC_NAME')"
          v-model:value="form.pic_name"
          :label-col="6"
          :wrapper-col="14"
          rules="max:100|special_characters_regex"
          :maxlength="100"
        />

        <!-- Phone Field -->
        <InputField
          name="phone"
          :label="$t('MEMBER.FORM.PHONE')"
          v-model:value="form.phone"
          :label-col="6"
          :wrapper-col="14"
          rules="required_custom|max:20|special_characters_regex"
          :maxlength="15"
        />

        <!-- Mail Field -->
        <InputField
          name="mail"
          :label="$t('MEMBER.FORM.MAIL')"
          v-model:value="form.mail"
          :label-col="6"
          :wrapper-col="14"
          rules="required_custom|email_custom"
        />

        <!-- Url company Field -->
        <InputField
          name="url_company"
          :label="$t('MEMBER.FORM.URL_COMPANY')"
          v-model:value="form.url_company"
          :label-col="6"
          :wrapper-col="14"
          rules="url_custom"
        />

        <!-- Number of employees Field -->
        <InputField
          name="number_of_employees"
          :label="$t('MEMBER.FORM.NUMBER_OF_EMPLOYEES')"
          v-model:value="form.number_of_employees"
          :label-col="6"
          :wrapper-col="14"
          rules="max:10|special_characters_regex"
        />

        <!-- Industry type Field -->
        <CheckboxGroup
          name="industry_type"
          v-model:value="form.industry_type"
          :label="$t('MEMBER.FORM.INDUSTRY_TYPE')"
          :label-col="6"
          :wrapper-col="14"
          :field-names="{ label: 'name', value: 'id' }"
          :options="industries"
          class="industry"
        />

        <!-- Company information field -->
        <RadioGroupField
          name="company_information"
          v-model:value="form.company_information"
          :label="$t('MEMBER.FORM.COMPANY_INFORMATION')"
          :label-col="6"
          :wrapper-col="14"
          :field-names="{ label: 'label', value: 'value' }"
          :options="OPTION_COMPANY_INFORMATION.map(({ label, value }) => ({ label: $t(label) , value: value}))"
          helper="＊どちらかを選択"
          rules="radio_required_custom"
          class="company-information"
        />

        <!-- Company information exp Field -->
        <RadioGroupField
          name="company_information_exp"
          v-model:value="form.company_information_exp"
          :label="$t('MEMBER.FORM.COMPANY_INFORMATION')"
          :label-display="false"
          :label-col="6"
          :wrapper-col="14"
          :field-names="{ label: 'label', value: 'value' }"
          :options="OPTION_COMPANY_INFORMATION_EXP.map(({ label, value }) => ({ label: $t(label) , value: value}))"
          helper="＊どちらかを選択"
          rules="radio_required_custom"
        />

        <a-form-item
          :label="$t('MEMBER.FORM.REGIST_NUMBER')"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
          class="other-input hideLabel"
        >
          <!-- Industry type Field -->
          <Checkbox
            name="other"
            v-model:value="form.other"
            :label="$t('MEMBER.FORM.INDUSTRY_TYPE')"
            :labelName="$t('MEMBER.FORM.OTHER')"
            :label-display="false"
          />

          <template v-if="form.other">
            <!-- Company information other Field -->
            <InputField
              name="company_information_other"
              :label="$t('MEMBER.FORM.COMPANY_INFORMATION_OTHER')"
              v-model:value="form.company_information_other"
              :label-display="false"
              :maxlength="100"
              :rules="`${form.other ? 'required_other|' : ''}special_characters_regex|max:100`"
            />
          </template>
        </a-form-item>

        <!-- Company information other Field -->
        <SelectField
          name="consultation_counters_id"
          :label="$t('MEMBER.FORM.PUBLIC_TO_CONSULTATION_COUNTER')"
          :options="prefectures"
          v-model:value="form.consultation_counters_id"
          rules="required_custom"
          :label-col="6"
          :wrapper-col="14"
          :field-names="{ label: 'name', value: 'id' }"
        />

        <!-- note Field -->
        <TextAreaField
          name="note"
          :label="$t('MEMBER.FORM.NOTE')"
          v-model:value="form.note"
          :label-col="6"
          rules="max:250"
          :maxlength="250"
          :wrapper-col="14"
          :rows="4"
        />

        <a-form-item :wrapper-col="{ span: 14, offset: 6 }">
          <a-button
            type="primary"
            @click="handleSubmit($event, validateBeforeSubmit)"
            v-text="$t('BUTTON.CREATE')"
          />
          <a-button
            style="margin-left: 16px"
            v-text="$t('BUTTON.CANCEL')"
            @click="redirectMemberList()"
          />
        </a-form-item>
      </a-form>
    </VeeForm>
  </a-card>
</template>

<script setup lang='ts'>
import { onBeforeMount, reactive, ref, Ref } from 'vue'
import InputField from '@/views/components/InputField.vue'
import CheckboxGroup from '@/views/components/CheckboxGroup.vue'
import SelectField from '@/views/components/SelectField.vue'
import TextAreaField from '@/views/components/TextAreaField.vue'
import RadioGroupField from '@/views/components/RadioGroupField.vue'
import Checkbox from '@/views/components/Checkbox.vue'
import { IMemberForm } from '@/core/interfaces/Member'
import {
  OPTION_COMPANY_INFORMATION,
  OPTION_COMPANY_INFORMATION_EXP
} from '@/core/enums/options'
import { useRoute, useRouter } from 'vue-router'
import useMember from '@/views/pages/member/config/useMember'
import useIndustry from '@/shared/composables/useIndustry'
import usePrefecture from '@/shared/composables/usePrefecture'
import useRegister from '@/shared/composables/useRegister'

const form = reactive<IMemberForm>({
  id: '',
  regist_number: '',
  regist_number_first: '',
  regist_number_last: '',
  agency_name: '',
  location: '',
  representatives_name: '',
  pic_name: '',
  phone: '',
  mail: '',
  url_company: '',
  number_of_employees: '',
  industry_type: [],
  company_information: '',
  company_information_exp: '',
  company_information_other: '',
  consultation_counters_id: null,
  note: '',
  other: false
})
const isCreate: Ref<boolean> = ref(false)
const route = useRoute()
const router = useRouter()
const { member, fetchMember } = useMember()
const { prefectures, fetchPrefectures } = usePrefecture()
const {
  industries,
  fetchIndustries
} = useIndustry()
const {
  members,
  addMember,
  updateMember
} = useMember()
const { registers, fetchRegisters } = useRegister()

onBeforeMount(async () => {
  await fetchIndustries()
  await fetchPrefectures()
  isCreate.value = route?.name === 'MemberCreate'
  if (!isCreate.value) {
    await fetchMember(route.params.id as string, {})
    await transformData()
  }
})

const transformData = () => {
  Object.assign(form, member.value)
  const _regist_number = member.value.regist_number.split('登-')

  form.regist_number_first = _regist_number?.[0] || ''
  form.regist_number_last = _regist_number?.[1] || ''

  form.industry_type = member.value.industryTypes?.map((item) => item.id)

  form.consultation_counters_id = member.value?.consultation_counters_id?.id || 1
  form.company_information = member.value?.company_information.key
  form.company_information_exp = member.value?.company_information_exp.key

  if (member.value?.company_information_other) form.other = true

  form.company_information_other = member.value?.company_information_other
}

const validateBeforeSubmit = async (values, action) => {
  const id = route.params.id as string
  values.regist_number = transformRegistNumber(values)

  if (!values.other) {
    delete values.other
    values.company_information_other = null
  }

  if (isCreate.value) {
    await addMember(values, action)
  } else {
    await updateMember(id, values, action)
  }
}

const handleAutoInput = async (values, action) => {
  action.setFieldError('regist_number_first', '')
  action.setFieldError('regist_number_last', '')

  values.regist_number = transformRegistNumber(values)

  if ((values.regist_number_first && values.regist_number_last) === '') {
    return false
  }

  const params = { 'filter[regist_number]': values.regist_number }
  await fetchRegisters(params, action)

  if (registers.value.length > 0) {
    Object.keys(registers.value[0]).forEach((key) => {
      // set value for form
      form[key] = registers.value[0][key]
      // set form value
      action.setFieldValue(key, registers.value[0][key])
      //  validate fields
      action.validateField(key)
    })
  }
}

const transformRegistNumber = (values): string => {
  const { regist_number_first, regist_number_last } = values
  return [regist_number_first, regist_number_last].join('登-')
}

const redirectMemberList = async () => {
  await router.push({ name: 'Member' })
}
</script>

<style lang="scss" scoped>
.errors {
  color: #ff4d4f;
}
</style>
