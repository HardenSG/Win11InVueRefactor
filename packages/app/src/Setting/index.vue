<template>
  <div class="EdgeFullBox FullBox">
    <!-- <ToolBarVue></ToolBarVue> -->
    <main class="edge">EDGE</main>
  </div>
</template>

<script setup lang="ts">
// import ToolBarVue from '@/component/ToolBar/index.vue'
const url =
  'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0892cf3187b742d68aad4a0efc9c384d~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp?'
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
