<template>
  <VeeField
    :name="$attrs.name"
    :label="label"
    :rules="rules"
    v-slot="{ value, handleChange, errorMessage }">
    <a-form-item
      :class="[{ 'hideLabel': !labelDisplay }]"
      :label="props.label"
      :help="errorMessage"
      :validate-status="errorMessage ? 'error' : undefined"
      :label-col="{ span: $attrs['label-col'] ? $attrs['label-col'] : '' }"
      :wrapper-col="{
        span: $attrs['wrapper-col'] ? $attrs['wrapper-col'] : '',
      }"
    >
      <a-upload-dragger
        :value="value"
        :multiple="false"
        :show-upload-list="false"
        v-bind="$attrs"
        :before-upload="beforeUpload"
        @change="handleChange(fileList)"
      >
        <p class="ant-upload-text">{{ $t("COMMON.UPLOAD_CONTENT") }}</p>
      </a-upload-dragger>
      <p v-if="fileName" class="title">{{ fileName }}</p>
    </a-form-item>
  </VeeField>
</template>

<script setup lang="ts">
import { ref } from 'vue'
interface Props {
  labelDisplay: boolean,
  label: string,
  rules: string | object
}

const props = defineProps<Props>()
const fileList = ref<object>({})
const fileName = ref<string>('')

const beforeUpload = (file) => {
  fileList.value = file
  fileName.value = file.name || ''
  return false
}
</script>
