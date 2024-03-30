<template>
  <div class="data-setting">
    <a-card :title="$t('DATA_SETTING.TITLE')">
      <!--FORM-->
      <VeeForm
        tag="form"
        layout="vertical"
        v-slot="{ handleSubmit }"
        :initialValues="form"
      >
        <a-form layout="vertical" role="search">
          <UploadDragger
            v-model="form.file_import"
            name="file_import"
            :label="$t('DATA_SETTING.LIST_OF_AGENCY')"
            label-display
            rules="required_custom|xlsx_regex"
          />

          <div class="group-action">
            <!--Button submit-->
            <a-button
              class="btn-submit"
              type="primary"
              @click="handleSubmit($event, validateBeforeSubmit)"
              v-text="$t('BUTTON.SUBMIT') "
            />
          </div>
        </a-form>
      </VeeForm>
    </a-card>
  </div>
</template>
<script setup lang='ts'>
import UploadDragger from '@/views/components/UploadDragger.vue'
import { reactive } from 'vue'
import useImport from '@/shared/composables/useImport'

// interface Props {
// pagination?: IPagination,
// data: IIndustry[],
// }

const { importCSV } = useImport()

const form = reactive({
  file_import: []
})

const validateBeforeSubmit = async (values) => {
  const form_data = new FormData()

  for (const key in values) {
    form_data.append(key, values[key])
  }

  await importCSV(form_data)
}

</script>
<style lang="scss" scoped>
.data-setting {
  margin-bottom: 24px;

  .group-action {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
