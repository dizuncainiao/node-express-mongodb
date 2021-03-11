<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
    <div class="logo"/>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      :style="{ lineHeight: '64px' }"
      theme="dark"
      mode="horizontal"
      @click="clickMenu"
    >
      <template v-for="item of list" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <PieChartOutlined/>
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key"/>
        </template>
      </template>
    </a-menu>
    <a-dropdown>
      <div class="r-box">
        <a-avatar>
          <template #icon>
            <UserOutlined/>
          </template>
        </a-avatar>
        <span>{{userName}}</span>
      </div>
      <template #overlay>
        <a-menu @click="dropDownHandler">
          <a-menu-item key="logout">退出登录
            <a-spin v-if="showSpin" size="small"/>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { PieChartOutlined, UserOutlined } from '@ant-design/icons-vue'
import { SelectedMenuInfo } from './interface'
import getMenuList from '@/utils/getMenuList'
import SubMenu from '@/components/SubMenu.vue'

export default defineComponent({
  name: 'HomeHeader',
  components: {
    SubMenu,
    PieChartOutlined,
    UserOutlined
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const key = [sessionStorage.getItem('selectedKeys') || '']
    // menu 数据
    const list = reactive(getMenuList(router.options.routes))
    // 选中的key
    const selectedKeys: string[] = reactive(key)
    const showSpin = ref(false)
    const userName = sessionStorage.getItem('userName')

    watch(selectedKeys, keys => {
      typeof keys[0] === 'string' && router.push({ name: keys[0] })
    })

    function clickMenu (info: SelectedMenuInfo) {
      const keyPath = info.keyPath.reverse()
      selectedKeys[0] = info.key
      store.commit('setKeyPath', keyPath)
      sessionStorage.setItem('keyPath', JSON.stringify(keyPath))
    }

    function dropDownHandler (info: SelectedMenuInfo) {
      if (info.key === 'logout') {
        showSpin.value = true
        setTimeout(() => {
          router.replace({ name: 'Login' })
        }, 600)
      }
    }

    return {
      selectedKeys,
      list,
      showSpin,
      userName,
      clickMenu,
      dropDownHandler
    }
  }
})
</script>

<style scoped lang="less">
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.r-box {
  position: absolute;
  height: 100%;
  top: 0;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, .1);
  }

  > span {
    margin: 0 10px;
    color: #fff;
  }
}
</style>
