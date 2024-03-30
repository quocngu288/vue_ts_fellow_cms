<template>
  <VeeField
    :name="name"
    :label="label"
    :rules="rules"
    v-slot="{ value, handleChange, errorMessage }">
    <a-form-item
      :label="label"
      :help="errorMessage"
      :validate-status="errorMessage ? 'error' : undefined"
      :required="rules.includes('required')"
      :label-col="{ span: $attrs['label-col'] ? $attrs['label-col'] : '' }"
      :wrapper-col="{
        span: $attrs['wrapper-col'] ? $attrs['wrapper-col'] : '',
      }"
    >
      <!--Field-->
      <a-date-picker
        style="width: 100%;"
        :value="value"
        :id="name"
        v-bind="$attrs"
        @change="handleChange"
      />
    </a-form-item>
  </VeeField>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,

  props: {
    name: { type: String, required: true },
    label: { type: String, default: '' },
    labelDisplay: { type: Boolean, default: true },
    rules: { type: [String, Object], default: '' }
  }
}
</script>
