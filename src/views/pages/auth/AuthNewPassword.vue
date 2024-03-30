<template>
  <a-layout class="auth password-reset">
    <div class="auth__wrap">
      <VeeForm
        :initial-values="form"
        ref="observer"
        v-slot="{ handleSubmit }"
      >
        <!-- Login Title -->
        <div class="auth__header">
          <h2 class="auth-title">{{ $t(route.meta.title) }}</h2>
          <h3 class="auth-subtitle">{{ $t("LOGIN.SUBTITLE") }}</h3>
        </div>

        <a-card :bordered="false" class="auth__form">
          <a-form
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
          >
            <p>{{ $t("NEW_PASSWORD.NOTE") }}</p>
            <!--New password-->
            <PasswordField
              name="new_password"
              rules="required|password_regex|max:100"
              :label="$t('NEW_PASSWORD.NEW_PASSWORD')"
              :maxlength="100"
              :label-col="6"
              :wrapper-col="18"
            />

            <!--New password confirm-->
            <PasswordField
              name="new_password_confirmation"
              rules="required|password_confirmed:@new_password"
              :label="$t('NEW_PASSWORD.NEW_PASSWORD_CONFIRM')"
              :maxlength="100"
              :label-col="6"
              :wrapper-col="18"
            />

            <a-form-item :wrapper-col="{ offset: 6, span: 18 }" class="form-item-last">
              <!-- Submit button -->
              <a-button
                class="btn-submit"
                type="primary"
                block
                @click="handleSubmit($event, validateBeforeSubmit)"
                :loading="isLoading"
              >
                {{ $t("BUTTON.RESET_PASSWORD") }}
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </VeeForm>
    </div>
  </a-layout>
</template>
<script setup lang="ts">
import PasswordField from '@/views/components/PasswordField.vue'
import { reactive } from 'vue'
import { IUserNewPassword } from '@/core/interfaces/User'
import { useRoute } from 'vue-router'
import useAuth from '@/views/pages/auth/config/useAuth'

const route = useRoute()
const { isLoading, newPassword } = useAuth()
const form = reactive<IUserNewPassword>({
  new_password: '',
  new_password_confirmation: ''
})

/**
 * Handle Login form
 * @param value
 */
const validateBeforeSubmit = async (value) => {
  const token = (route.params.token || '') as string
  await newPassword(token, value)
}
</script>
