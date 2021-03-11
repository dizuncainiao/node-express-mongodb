<template>
  <a-layout id="components-layout-demo-fixed">
    <home-header/>
    <home-content/>
    <a-layout-footer :style="{ textAlign: 'center' }">
      ©2021 Created by <a href="https://blog.csdn.net/dizuncainiao">帝尊菜鸟</a>
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeHeader from '@/views/home/HomeHeader.vue'
import HomeContent from '@/views/home/HomeContent.vue'

export default defineComponent({
  name: 'Home',
  components: {
    HomeContent,
    HomeHeader
  }
})
</script>

<style scoped>
</style>
