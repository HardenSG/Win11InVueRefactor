<script setup lang="ts">
import { RouterView } from 'vue-router'
import Loading from '@Com/Loading/index.vue'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <!-- custom transition mode -->
      <Transition mode="out-in">
        <!-- component keepAlive -->
        <!-- exclude and include property are control all component's alive -->
        <!-- both of them's type is MatchPattern, it about string | RegExp | (string | RegExp)[]-->
        <keep-alive :max="10" :exclude="[]">
          <Suspense>
            <!-- Suspense: This is a experiment API, the aim to pending async component by #fallback Loading -->
            <component :is="Component"></component>
            <template #fallback>
              <!-- custom loading component -->
              <Loading />
            </template>
          </Suspense>
        </keep-alive>
      </Transition>
    </template>
  </RouterView>
</template>

<style lang="scss">
body {
  overflow: hidden;
}
#app {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100%;
  background-attachment: fixed;
  overflow: hidden;
  transition: 0.8s;
}
</style>
