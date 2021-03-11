<template>
  <div class="d-input" :class="rootClass">
    <div class="d-input-placeholder">{{ placeholder }}</div>
    <input
      ref="root"
      autocomplete="new-password"
      :type="type"
      :readonly="readonly"
      :disabled="disabled"
      :value="modelValue"
      @focus="focusHandler"
      @blur="blurHandler"
      @input="inputHandler"
    >
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, watchEffect } from 'vue'
import { useInputStatus } from './useInput'

export default {
  name: 'DInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入内容...'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 仅支持文本框和密码框
    type: {
      type: String,
      default: 'text',
      validator: (value: string) => ['text', 'password'].includes(value)
    }
  },
  emits: ['update:modelValue', 'focus', 'blur'],
  setup (props: any, { emit }: any) {
    const root = ref(null)
    const status = reactive({
      active: false, // 聚焦 || 有值，placeholder上移，边框变红
      filled: true // 失焦，边框变灰（会同时placeholder上移，边框变灰）
    })
    const isFocus = ref(false)

    const rootClass = computed(() => ({
      active: status.active,
      filled: status.filled
    }))

    watchEffect(() => {
      status.active = isFocus.value || !!props.modelValue
    })

    function focusHandler (e: Event) {
      isFocus.value = true
      useInputStatus(status, props.modelValue, 'focus')
      emit('focus', e)
    }

    function blurHandler (e: Event) {
      isFocus.value = false
      useInputStatus(status, props.modelValue, 'blur')
      emit('blur', e)
    }

    function inputHandler (event: { target: { value: any } }) {
      const { value } = event.target

      emit('update:modelValue', value)
    }

    return {
      root,
      status,
      rootClass,
      focusHandler,
      blurHandler,
      inputHandler
    }
  }
}
</script>

<style scoped lang="less">
@import "./d-input";
</style>
