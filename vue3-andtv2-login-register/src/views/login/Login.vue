<template>
  <div class="login-wrapper">
    <canvas id="dot">
      <p>your browser not support canvas</p>
    </canvas>
    <div class="login-box">
      <a-form :model="formData" :wrapper-col="{ span: 24 }" @submit="handleSubmit" @submit.prevent>
        <a-form-item>
          <a-input v-model:value="formData.user" placeholder="Username">
            <template #prefix>
              <UserOutlined style="color: rgba(0,0,0,.25)"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="formData.password" type="password" placeholder="Password">
            <template #prefix>
              <LockOutlined style="color: rgba(0,0,0,.25)"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            class="full-width"
            type="primary"
            html-type="submit"
            :disabled="isDisabled"
            :loading="loading"
          >
            登录
          </a-button>
        </a-form-item>
        <div class="text-r">没有账号？
          <router-link to="register">前往注册</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  computed,
  ref,
  defineComponent,
  getCurrentInstance,
  ComponentInternalInstance
} from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { Book, ResDesc } from './interface'
import { useParticleEffect } from '@/utils'
import { login } from '@/api'

export default defineComponent({
  name: 'Login',
  components: {
    UserOutlined,
    LockOutlined
  },
  setup () {
    const router = useRouter()
    console.log(getCurrentInstance(), 'getCurrentInstance')

    const formData = reactive({
      user: '',
      password: ''
    }) as Book

    const loading = ref<boolean>(false)

    const isDisabled = computed(() => !formData.user || !formData.password)

    const handleSubmit = () => {
      const {
        user,
        password
      } = formData
      const params = {
        userName: user,
        password
      }
      loading.value = true
      login(params).then((res: ResDesc) => {
        if (res.code !== 200) {
          loading.value = false
          return
        }
        sessionStorage.setItem('userName', user)
        localStorage.setItem('token', res.data.token)
        loading.value = false
        router.replace({ name: 'Home' })
      }).catch(err => {
        loading.value = false
        console.log(err, 'line 95')
      })
    }

    // 启用粒子特效
    useParticleEffect()

    return {
      formData,
      isDisabled,
      loading,
      handleSubmit
    }
  },
  mounted () {
    console.log(this, 'line 110')
  }
})
</script>

<style scoped lang="less">
.prefix-color {
  color: rgba(0, 0, 0, .25)
}

.login-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;

  > canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #91a0ff, #3d85f1);
  }

  .login-box {
    position: relative;
    z-index: 2;
    width: 600px;
    padding: 40px 60px;
    background: rgba(255, 255, 255, 0.75);
    border-radius: 6px;
    animation: Breathe 4s alternate infinite;
  }
}

@keyframes Breathe {
  from {
    box-shadow: 0 0 18px #fff;
  }
  to {
    box-shadow: 0 0 18px #717171;
  }
}
</style>
