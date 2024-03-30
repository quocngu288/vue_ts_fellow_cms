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
            <!-- Search By -->
            <a-col :span="6">
              <InputField
                name="full_name"
                class="form-group form-group--col"
                :label="$t('ADMIN.SEARCH.FULL_NAME')"
                v-model="filter.full_name"
              />
            </a-col>

            <!-- Search By -->
            <a-col :span="6">
              <InputField
                name="furigana_name"
                class="form-group form-group--col"
                :label="$t('ADMIN.SEARCH.FURIGANA')"
                v-model="filter.furigana_name"
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
import { IAdminSearch } from '@/core/interfaces/Admin'
import { useRouter } from 'vue-router'

interface Props {
  data?: any
}
const props = defineProps<Props>()
const router = useRouter()
const emit = defineEmits(['filter-changed'])
const filter = reactive<IAdminSearch>({
  full_name: '',
  furigana_name: ''
})

/**
 * Redirect to create page
 */
const redirectToCreatePage = async (): Promise<void> => {
  await router.push({ name: 'AdminCreate' })
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
  emit('filter-changed', { type: 'search', value: values })
}
</script>
<style lang="scss"></style>
