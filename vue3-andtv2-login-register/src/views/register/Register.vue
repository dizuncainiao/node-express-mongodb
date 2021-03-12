<template>
  <div class="login-wrapper">
    <canvas id="dot">
      <p>your browser not support canvas</p>
    </canvas>
    <div class="login-box">
      <a-form :model="formData" :wrapper-col="{ span: 24 }" @submit="registerHandler" @submit.prevent>
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
          <a-input v-model:value="formData.confirmPassword" type="password" placeholder="Confirm Password">
            <template #prefix>
              <CheckCircleOutlined style="color: rgba(0,0,0,.25)"/>
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
            注册
          </a-button>
        </a-form-item>
        <div class="text-r">有账号，
          <router-link to="/">前往登录</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { useParticleEffect } from '@/utils'
import { defineComponent, reactive, ref, computed } from 'vue'
import { UserOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons-vue'
import { RegisterData } from './interface'
import { register } from '@/api'

export default defineComponent({
  name: 'Register',
  components: {
    UserOutlined,
    LockOutlined,
    CheckCircleOutlined
  },
  setup () {
    const loading = ref(false)
    const formData = reactive({
      user: '',
      password: '',
      confirmPassword: ''
    }) as RegisterData
    const isDisabled = computed(() => {
      return !(formData.user && formData.password && formData.password === formData.confirmPassword)
    })
    // 启用粒子特效
    useParticleEffect()

    function resetFormData () {
      formData.user = ''
      formData.password = ''
      formData.confirmPassword = ''
    }

    function registerHandler () {
      const {
        user,
        password
      } = formData
      const params = {
        userName: user,
        password
      }
      register(params).then(res => {
        console.log(res)
        // resetFormData()
      }).catch(err => {
        console.log(err)
      })
    }

    return {
      loading,
      formData,
      isDisabled,
      registerHandler
    }
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
