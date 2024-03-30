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
      :label-col="{ span: $attrs['label-col'] ? $attrs['label-col'] : '' }"
      :wrapper-col="{
        span: $attrs['wrapper-col'] ? $attrs['wrapper-col'] : '',
      }"
    >
      <a-radio-group
        autocomplete="new-password"
        :value="value"
        :id="name"
        v-bind="$attrs"
        @change="(e) => handleChange(e.target.value)"
        style="width: 100%"
      >
        <a-row :gutter="[8,24]">
          <a-col
            :span="colChild"
            v-for="(item, index) in options"
            :key="index"
          >
            <a-radio
              :value="item[fieldNames['value']]"
            >
              {{ item[fieldNames['label']] }}
            </a-radio>
          </a-col>
          <a-col v-if="helper" :span="colChild" style="font-size: 14px;color:#ff4d4f">
            {{ helper }}
          </a-col>
        </a-row>

      </a-radio-group>

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
    rules: { type: [String, Object], default: '' },
    options: { type: Array, default: () => [] },
    fieldNames: { type: [String, Object], default: '' },
    helper: { type: String },
    colChild: { type: Number, default: 8 }
  }
}
</script>
