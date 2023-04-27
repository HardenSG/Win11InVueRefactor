<template>
  <div class="EdgeFullBox FullBox">
    <!-- <ToolBarVue></ToolBarVue> -->
    <main class="edge">Setting</main>
  </div>
</template>

<script setup lang="ts"></script>

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
