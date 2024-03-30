<template>
  <VeeField
    :name="name"
    :label="label"
    :rules="rules"
    v-slot="{ value, handleChange, errorMessage }">
    <a-form-item
      :label="label"
      :help="errorMessage"
      :class="[{ 'hideLabel': !labelDisplay }]"
      :validate-status="errorMessage ? 'error' : undefined"
      :required="rules.includes('required')"
      :label-col="{ span: $attrs['label-col'] ? $attrs['label-col'] : '' }"
      :wrapper-col="{
        span: $attrs['wrapper-col'] ? $attrs['wrapper-col'] : '',
      }"
    >
      <!--Field-->
      <a-input-password
        autocomplete="new-password"
        :value="value"
        :id="name"
        v-bind="$attrs"
        @change="onHandleChange($event, handleChange)"
      >
        <!--Icon prefix-->
        <template #prefix>
          <slot name="prefix" />
        </template>

        <!--Icon suffix-->
        <template #suffix>
          <slot name="suffix" />
        </template>
      </a-input-password>
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
  rules: { type: [String, Object], default: '' }
})

const emit = defineEmits(['update:value', 'change'])

const onHandleChange = (event: any, callback: any) => {
  const value = event.target.value
  emit('update:value', value)
  emit('change', value)
  callback(value)
}
</script>
