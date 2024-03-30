<template>
  <a-layout class="auth">
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
            <!--Email-->
            <InputField
              name="email"
              :labelDisplay="false"
              :label="$t('LOGIN.EMAIL')"
              rules="required|max:100|email_custom"
              :maxlength="100"
              :placeholder="$t('PLACEHOLDER.EMAIL')"
            >
              <template v-slot:prefix>
                <UserOutlined />
              </template>
            </InputField>

            <!--Password-->
            <PasswordField
              name="password"
              :labelDisplay="false"
              :label="$t('LOGIN.PASSWORD')"
              rules="required|password_regex|min:8|max:32"
              :maxlength="32"
              :placeholder="$t('PLACEHOLDER.PASSWORD')"
            >
              <template v-slot:prefix>
                <LockOutlined />
              </template>
            </PasswordField>

            <!-- Submit button -->
            <a-button
              class="btn-submit"
              type="primary"
              block
              @click="handleSubmit($event, validateBeforeSubmit)"
              :loading="isLoading"
            >
              {{ $t("LOGIN.BTN_SUBMIT") }}
            </a-button>

          <!--Forgot password-->
          <router-link
            :to="{ name: 'PasswordReset' }"
            class="forgot-password"
          >
            {{ $t('LOGIN.FORGOT_PASSWORD') }}
          </router-link>
        </a-card>
      </VeeForm>
    </div>
  </a-layout>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { IUserLogin } from '@/core/interfaces/User'
import InputField from '@/views/components/InputField.vue'
import PasswordField from '@/views/components/PasswordField.vue'
import useAuth from '@/views/pages/auth/config/useAuth'

const router = useRouter()
const route = useRoute()
const { isLoading, login } = useAuth()

const form = reactive<IUserLogin>({
  email: '',
  password: ''
})

/**
 * Handle Login form
 * @param value
 */
const validateBeforeSubmit = async (value) => {
  await login(value)
  await router.push({ name: 'Admin' })
}
</script>
<style lang="scss" scoped></style>
