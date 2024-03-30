<template>
  <a-layout-sider
    class="menu-sidebar"
    v-model:collapsed="useStoreCollapse.sidebarCollapsed"
    :trigger="null"
    collapsible
    width="256"
  >
    <!-- LOGO -->
    <div class="sidebar-logo">
      <router-link :to="{ path: '/' }">
        <h1>fellow CMS</h1>
      </router-link>
    </div>

    <!-- Navigation -->
    <a-menu
      theme="dark"
      :selected-keys="[$route.name || '']"
      mode="inline"
    >
      <template v-for="item in NAVIGATIONS">
        <a-sub-menu
          :key="item.routeName"
          v-if="!!item['children']"
        >
          <template #title>
            <component :is="item.icon"></component>
            <span v-text="$t(`NAVIGATION.${item.title}`)" />
          </template>
          <a-menu-item v-for="child in item.children" :key="child.routeName">
            <router-link :to="{ name: child.routeName }" class="nav-custom">
              <span v-text="$t(`NAVIGATION.${child.title}`)" />
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item
          :key="item.routeName"
          v-if="!!!item['children']"
        >
          <router-link :to="{ name: item.routeName }" class="nav-custom">
            <component :is="item.icon"></component>
            <span v-text="$t(`NAVIGATION.${item.title}`)" />
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang='ts'>
import { NAVIGATIONS } from '@/core/enums/navigations'
import { useCollapseStore } from '@/stores/CollapseStore'

const useStoreCollapse = useCollapseStore()
</script>
<style lang="scss">
.menu-sidebar {
  height: 100%;
}

.sidebar-logo {
  position: relative;
  height: 64px;
  overflow: hidden;
  line-height: 64px;
  background: #001529;
  transition: all .3s;

  a{
    font-size: 18px;
    text-align: center;
    margin: 0 24px 0 0;
  }

  h1 {
    color: #fff;
    font-weight: 600;
    line-height: 64px;
    vertical-align: middle;
  }
}
</style>
