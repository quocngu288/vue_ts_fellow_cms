<template>
  <a-layout class="index-view">

    <!--Sidebar-->
    <Sidebar />
    <a-layout>

      <!--Header-->
      <Header />
      <a-layout-content class="index-view__content">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>

  <!--MODAL-->
  <Modal/>
</template>

<script setup lang="ts">
import Header from '@/views/layouts/Header.vue'
import Sidebar from '@/views/layouts/Sidebar.vue'
import Modal from '@/views/components/modal/Modal.vue'
</script>

<style lang="scss" scoped>
.ant-layout-header,
.ant-layout-footer {
  background: #ffffff;
  padding-left: 24px;
  padding-right: 24px;
}

.index-view {
  height: 100%;

  &__content {
    padding: 24px;
    overflow: auto;
    height: 100vh;
  }
}
</style>
