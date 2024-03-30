<template>
  <a-layout-header class="layout-header">
    <component
      class="trigger"
      :is="useStoreCollapse.sidebarCollapsed ? 'MenuFoldOutlined' : 'MenuUnfoldOutlined'"
      @click="toggleSidebar"
    />

    <div class="layout-header__right">
      <LocaleSwitcher />
      <a-dropdown>
        <a-button class="profile">
          <UserOutlined />
          {{ profile.full_name }}
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item class="btn-logout">
              <a @click.prevent="handleLogout">
                <LogoutOutlined />
                {{ $t("BUTTON.LOGOUT") }}
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>
<script setup lang='ts'>
import { onBeforeMount } from 'vue'
import LocaleSwitcher from '@/views/components/LocaleSwitcher.vue'
import { useRouter } from 'vue-router'
import useAuth from '@/views/pages/auth/config/useAuth'
import { useCollapseStore } from '@/stores/CollapseStore'

const router = useRouter()
const { logout, profile, getProfiles } = useAuth()
const useStoreCollapse = useCollapseStore()

onBeforeMount(async () => {
  await getProfiles()
})

const toggleSidebar = () => {
  useStoreCollapse.setToggleSidebar(!useStoreCollapse.sidebarCollapsed)
}

const handleLogout = async () => {
  await logout()
  await router.push({ name: 'Login' })
}
</script>
<style lang="scss" scoped>
.layout-header {
  position: unset;
  box-shadow: rgb(0 0 0 / 4%) 0 3px 5px;

  .profile {
    margin-left: 15px;
    border: none;
    width: auto;
  }

  .btn-logout {
    margin-left: 10px;
    vertical-align: middle;
    line-height: 1;
    text-align: center;
  }
}
</style>
