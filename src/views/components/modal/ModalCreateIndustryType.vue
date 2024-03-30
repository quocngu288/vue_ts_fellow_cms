<template>
  <!--FORM-->
  <VeeForm
    layout="inline"
    class="industry-form"
    tag="form"
    v-slot="{ handleSubmit }"
    :initialValues="form"
  >
    <a-space align="start">
      <!-- Agency name Field -->
      <InputField
        name="name"
        :label="$t('INDUSTRY_TYPE.FORM.INDUSTRY_TYPE')"
        v-model="form.name"
        rules="required|max:20|special_characters_regex"
        :maxlength="20"
      />

      <a-button
        type="primary"
        @click="handleSubmit($event, validateBeforeSubmit)"
        v-text="$t('BUTTON.CREATE')"
      />
    </a-space>
  </VeeForm>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { IIndustryForm } from '@/core/interfaces/Industry'
import InputField from '@/views/components/InputField.vue'
import useIndustry from '@/shared/composables/useIndustry'
import { useModalStore } from '@/stores/ModalStore'
import { useIndustryStore } from '@/stores/IndustryStore'

const form = reactive<IIndustryForm>({
  name: ''
})

const { addIndustry } = useIndustry()
const useModal = useModalStore()
const useStore = useIndustryStore()

const validateBeforeSubmit = async (values, actions) => {
  try {
    await addIndustry(values)
    useStore.setIsReload(true)
    closeModal()
  } catch (err) {
    if (err.response?.status === 422) {
      err.response.data?.errors.forEach(({ field, message }) => {
        actions.setFieldError(field, message?.[0] || '')
      })
    }
  }
}

const closeModal = () => {
  useModal.toggleModal({ isShow: false })
}
</script>
<style lang="scss" scoped></style>
