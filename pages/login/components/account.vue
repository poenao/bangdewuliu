<template>
  <uni-forms
    class="login-form"
    ref="form"
    :model="formData"
    :rules="accountRules"
    validateTrigger="bind"
  >
    <uni-forms-item name="account">
      <uni-easyinput
        type="text"
        placeholder="请输入账号"
        class="uni-input-input"
        placeholder-style="color: #818181"
        v-model="formData.account"
      />
    </uni-forms-item>
    <uni-forms-item name="password">
      <uni-easyinput
        type="password"
        placeholder="请输入密码"
        class="uni-input-input"
        placeholder-style="color: #818181"
        v-model="formData.password"
      />
    </uni-forms-item>
    <button class="submit-button" @click="onSubmit">登录</button>
  </uni-forms>
</template>

<script setup>
  import { ref, reactive } from 'vue'

  const form = ref(null)

  // 表单数据
  const formData = reactive({
    account: '',
    password: '',
  })
  // 定义表单数据验证规则
  const accountRules = reactive({
    account: {
      rules: [
        { required: true, errorMessage: '请输入登录账号' },
        { pattern: '^[a-zA-Z0-9]{6,8}$', errorMessage: '登录账号格式不正确' },
      ],
    },
    password: {
      rules: [
        { required: true, errorMessage: '请输入登录密码' },
        { pattern: '^\\d{6}$', errorMessage: '登录密码格式不正确' },
      ],
    },
  })

  // 提交校验
  const onSubmit = () => {
    form.value
      .validate()
      .then((res) => {
        console.log('校验通过：', res)
      })
      .catch((err) => {
        console.log('校验失败：', err)
      })
  }
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
