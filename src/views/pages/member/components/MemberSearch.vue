<template>
  <div class="search">
    <a-card :title="$t($route.meta['title']) || false">
      <template #extra>
        <a-button type="primary" @click="redirectToCreatePage()">{{ $t('BUTTON.CREATE') }}</a-button>
      </template>

      <!--Form Search-->
      <VeeForm
        tag="div"
        :initial-values="filter"
        v-slot="{ resetForm, handleSubmit }"
      >
        <a-form layout="vertical" role="search">
          <a-row :gutter="16">
            <!-- Regist number field -->
            <a-col :span="6">
              <div class="regist-number">

                <!-- Regist number first field -->
                <InputField
                  class="regist-number__first"
                  name="regist_number_first"
                  :label="$t('MEMBER.SEARCH.REGIST_NUMBER')"
                  v-model="filter.regist_number_first"
                />

                <span
                  class="ant-form-text"
                  v-text="$t('MEMBER.SEARCH.REGIST_NUMBER_TAG')"
                />

                <!-- Regist number first field -->
                <InputField
                  class="regist-number__last"
                  :label-display="false"
                  name="regist_number_last"
                  :label="$t('MEMBER.SEARCH.REGIST_NUMBER')"
                  v-model="filter.regist_number_last"
                />
              </div>
            </a-col>

            <!-- Agency name field -->
            <a-col :span="6">
              <InputField
                name="agency_name"
                :label="$t('MEMBER.SEARCH.AGENCY_NAME')"
                v-model="filter.agency_name"
              />
            </a-col>

            <!-- Phone field -->
            <a-col :span="6">
              <InputField
                name="phone"
                :label="$t('MEMBER.SEARCH.PHONE')"
                v-model="filter.phone"
              />
            </a-col>

            <!-- Mail field -->
            <a-col :span="6">
              <InputField
                name="mail"
                :label="$t('MEMBER.SEARCH.MAIL')"
                v-model="filter.mail"
              />
            </a-col>

            <!-- Industry type field -->
            <a-col :span="6">
              <SelectField
                name="industry_type"
                :label="$t('MEMBER.SEARCH.INDUSTRY_TYPE')"
                :field-names="{ label: 'name', value: 'id' }"
                :options="data.industries"
                v-model="filter.industry_type"
              />
            </a-col>

            <!-- Many human resources/many corporations field -->
            <a-col :span="6">
              <SelectField
                name="company_information_exp"
                :label="$t('MEMBER.SEARCH.EXPERIENCE_IN_INTERN_TRAINING')"
                :field-names="{ label: 'label', value: 'value' }"
                :options="OPTION_COMPANY_INFORMATION_EXP.map(({ label, value }) => ({ label: $t(label) , value: value}))"
                v-model="filter.company_information_exp"
              />
            </a-col>

            <!-- Experience in intern training field -->
            <a-col :span="6">
              <SelectField
                name="company_information"
                :label="$t('MEMBER.SEARCH.MANY_HUMAN_RESOURCES_OR_MANY_CORPORATIONS')"
                :field-names="{ label: 'label', value: 'value' }"
                :options="OPTION_COMPANY_INFORMATION.map(({ label, value }) => ({ label: $t(label) , value: value}))"
                v-model="filter.company_information"
              />
            </a-col>
          </a-row>

          <div class="group-action">
            <div class="group-action__right">
              <!--Submit form-->
              <a-button
                type="primary"
                @click="handleSubmit($event, onSubmit)"
                v-text="$t('BUTTON.SEARCH')"
              />
              <!--Reset form-->
              <a-button
                @click="onReset($event, resetForm)"
                v-text="$t('BUTTON.RESET')"
              />
            </div>
          </div>
        </a-form>
      </VeeForm>
    </a-card>
  </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import InputField from '@/views/components/InputField.vue'
import SelectField from '@/views/components/SelectField.vue'
import { useRouter } from 'vue-router'
import { IMemberSearch } from '@/core/interfaces/Member'
import {
  OPTION_COMPANY_INFORMATION_EXP,
  OPTION_COMPANY_INFORMATION
} from '@/core/enums/options'
import * as _ from 'lodash-es'

interface Props {
  data?: any
}
const props = defineProps<Props>()
const router = useRouter()
const emit = defineEmits(['filter-changed'])
const filter = reactive<IMemberSearch>({
  regist_number: '',
  regist_number_first: '',
  regist_number_last: '',
  agency_name: '',
  phone: '',
  mail: '',
  industry_type: '',
  company_information_exp: '',
  company_information: ''
})

/**
 * Redirect to create page
 */
const redirectToCreatePage = async (): Promise<void> => {
  await router.push({ name: 'MemberCreate' })
}

/**
 * Handle reset form
 * @param $event
 * @param resetForm
 */
const onReset = ($event: Event, resetForm) => {
  resetForm()

  for (const key in filter) {
    filter[key] = ''
  }
  emit('filter-changed', { type: 'reset', value: filter })
}

/**
 * Handle submit form
 * @param values
 */
const onSubmit = (values) => {
  const { regist_number_first, regist_number_last } = values
  values.regist_number = [regist_number_first, regist_number_last].join('登-')
  values = _.omit(values, 'regist_number_first', 'regist_number_last')

  emit('filter-changed', { type: 'search', value: values })
}
</script>
<style lang="scss"></style>
