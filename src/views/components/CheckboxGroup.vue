<template>
  <VeeField
    :name="name"
    :label="label"
    :rules="rules"
    v-slot="{ value, handleChange, errorMessage }">
    <a-form-item
      :class="[{ 'hideLabel': !labelDisplay }]"
      class="checkbox-group-custom"
      :label="label"
      :help="errorMessage"
      :validate-status="errorMessage ? 'error' : undefined"
      :required="rules.includes('required')"
      :label-col="{ span: $attrs['label-col'] ? $attrs['label-col'] : '' }"
      :wrapper-col="{
        span: $attrs['wrapper-col'] ? $attrs['wrapper-col'] : '',
      }"
    >
      <a-checkbox-group
        :value="value"
        :id="name"
        v-bind="$attrs"
        @change="onHandleChange($event, handleChange)"
        style="width: 100%"
      >
        <a-row :gutter="[8,24]">
          <a-col
            :span="8"
            v-for="(item, index) in options"
            :key="index"
          >
            <a-checkbox
              :value="item[fieldNames['value']]"
            >
              {{ item[fieldNames['label']] }}
            </a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
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
  options: { type: Array, default: () => [] },
  fieldNames: { type: [String, Object], default: '' }
})

const emit = defineEmits(['update:value', 'change'])

const onHandleChange = (value: any, callback: any) => {
  emit('update:value', value)
  emit('change', value)
  callback(value)
}
</script>
<style lang="scss" scoped></style>
