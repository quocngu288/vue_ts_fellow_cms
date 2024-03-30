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
            <p>{{ $t("PASSWORD_RESET.NOTE") }}</p>
            <!--Email-->
            <InputField
              name="email"
              rules="required|email_custom|max:100"
              :label="$t('PASSWORD_RESET.MAIL_ADDRESS')"
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
                {{ $t("BUTTON.SEND") }}
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </VeeForm>
    </div>
  </a-layout>
</template>
<script setup lang="ts">
import InputField from '@/views/components/InputField.vue'
import { reactive } from 'vue'
import { IUserPasswordReset } from '@/core/interfaces/User'
import { useRoute, useRouter } from 'vue-router'
import useAuth from '@/views/pages/auth/config/useAuth'

const router = useRouter()
const route = useRoute()
const { isLoading, resetByEmail } = useAuth()
const form = reactive<IUserPasswordReset>({
  email: ''
})

/**
 * Handle Confirm Email
 * @param value
 * @param action
 */
const validateBeforeSubmit = async (value, action) => {
  await resetByEmail(value, action)
  await router.push({ name: 'Login' })
}
</script>
