<template>
  <div class="d-input" :class="{active: active, filled: filled}">
    <div class="d-input-placeholder">{{ placeholder }}</div>
    <input
      ref="input"
      :value="value"
      :type="type"
      :readonly="readonly"
      :disabled="disabled"
      autocomplete="new-password"
      @focus="focusHandler"
      @blur="blurHandler"
      @input="inputHandler($event.target.value)"
      @keyup.enter="$emit('pressEnter')"
    >
  </div>
</template>

<script>
export default {
  name: 'DInput',
  props: {
    // 值
    value: String,
    // 占位符
    placeholder: String,
    // input 类型
    type: {
      type: String,
      default: 'text',
      validator: value => {
        return ['text', 'password'].includes(value)
      }
    },
    // 只读
    readonly: {
      type: Boolean,
      default: false
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 激活的（placeholder上移）
      active: false,
      // 有值 & 失去焦点
      filled: true
    }
  },
  watch: {
    value: {
      handler () {
        // 根据有无值判断input是否激活状态
        this.active = !!this.value
      },
      immediate: true
    }
  },
  methods: {
    inputHandler ($event, value) {
      const _value = value || $event
      this.$emit('input', _value)
    },
    // 失焦
    blurHandler ($event) {
      // input无值，在失焦后，取消激活
      if (!this.value) {
        this.active = false
        this.filled = false
      } else {
        this.filled = true
      }

      this.$emit('blur', $event.target.value)
    },
    // 聚焦
    focusHandler ($event) {
      this.active = true
      this.filled = false

      this.$emit('focus', $event.target.value)
    }
  }
}
</script>

<style scoped lang="less">
@import "./d-input";
</style>
