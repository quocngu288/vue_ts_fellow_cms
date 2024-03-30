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
    >
      <!--Field-->
      <a-range-picker
        style="width: 100%;"
        :value="value"
        :id="name"
        v-bind="$attrs"
        @input="handleChange"
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
