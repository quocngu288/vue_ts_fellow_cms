<template>
  <div class="loading-mode">
    <a-spin size="large" />
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.loading-mode {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1020;
  background-color: rgba(255,255,255,.3);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
