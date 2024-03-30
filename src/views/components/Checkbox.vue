<template>
  <VeeField
    :name="name"
    :label="label"
    :rules="rules"
    v-slot="{ value, handleChange, errorMessage }">
    <a-form-item
      :class="[{ 'hideLabel': !labelDisplay }]"
      :label="label"
      :help="errorMessage"
      :validate-status="errorMessage ? 'error' : undefined"
      :required="rules.includes('required')"
      :label-col="{ span: attrs['label-col'] ? attrs['label-col'] : '' }"
      :wrapper-col="{
        span: attrs['wrapper-col'] ? attrs['wrapper-col'] : '',
      }"
    >
      <a-checkbox
        :value="value"
        :checked="value"
        autocomplete="new-password"
        :id="name"
        v-bind="attrs"
        @change="onHandleChange($event, handleChange)"
        style="width: 100%"
      >
        {{ labelName }}
      </a-checkbox>
    </a-form-item>
  </VeeField>
</template>

<script lang="ts" setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: '' },
  labelDisplay: { type: Boolean, default: true },
  rules: { type: [String, Object], default: '' },
  labelName: { type: String, default: '' }
})

const emit = defineEmits(['update:value', 'change'])

const onHandleChange = (event: any, callback: any) => {
  const value = event.target.value
  emit('update:value', !value)
  emit('change', value)
  callback(value)
}
</script>
