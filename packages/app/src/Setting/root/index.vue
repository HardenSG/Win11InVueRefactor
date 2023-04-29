<template>
  <div class="EdgeFullBox FullBox">
    <ToolBarVue>Setting ToolBar</ToolBarVue>
    <main class="edge">Setting</main>
  </div>
</template>

<script setup lang="ts">
import ToolBarVue from 'public_comp/src/ToolBar/index.vue'
</script>

<style lang="scss" scoped>
.EdgeFullBox {
  main {
    width: 100%;
    height: calc(100% - 30px);

    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
