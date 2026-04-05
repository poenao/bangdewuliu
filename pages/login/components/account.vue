<template>
  <uni-forms
    class="login-form"
    ref="form"
    :model="formData"
    :rules="accountRules"
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
  import { loginAPI } from '../../../apis/user'
  import { useUserStore } from '../../../stores/user'

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
  const onSubmit = async () => {
    try {
      await form.value.validate()
      // 校验通过，执行登录逻辑
      const res = await loginAPI(formData)
      console.log(res.data.code)
      // 检测接口是否调用成功
      if (res.data.code !== 200) return uni.utils.toast('登录失败，请重试！')
      const store = useUserStore()
      store.token = res.data.data
    } catch (error) {
      // 校验失败，错误信息会在表单项下方显示
      console.error('登录失败', error)
    }
  }
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
