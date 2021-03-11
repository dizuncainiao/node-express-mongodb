<template>
  <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
    <a-breadcrumb :style="{ margin: '16px 0' }">
      <a-breadcrumb-item v-for="item of breadCrumbs" :key="item">{{ item }}</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content">
      <router-view/>
    </div>
  </a-layout-content>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'HomeContent',
  setup () {
    const store = useStore()
    console.log(store.state.keyPath)
    return {
      breadCrumbs: computed(() => store.state.keyPath)
    }
  }
})
</script>

<style scoped>
.content {
  padding: 24px;
  min-height: calc(100vh - 188px);
  background: #fff;
}
</style>
