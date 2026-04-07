<script setup>
  import { ref, onMounted } from 'vue'
  import { messageListAPI } from '../../../apis/message'

  // 任务列表数据
  const notifyList = ref([])
  // 请求页码
  const page = ref(1)
  // 请求每页条数
  const pageSize = ref(10)
  // 是否为空列表
  const isEmpty = ref(false)
  // 记录每次滚动页码
  const scrollPage = ref(1)
  const getNotifyList = async (page = 1, pageSize = 10) => {
    const res = await messageListAPI(201, page, pageSize)
    console.log(res)
    if (res.code !== 200) return uni.utils.toast('获取消息列表失败')
    // 更新任务列表数据
    notifyList.value.push(...res.data.items)
    // 是否为空列表
    isEmpty.value = notifyList.value.length === 0
    // 记录每次滚动到底部的页码
    scrollPage.value = page.value
  }
  // 监听用户是否滚动到页码底部
  const onScrollToLower = () => {
    // 如果是空列表则不请求下一页数据
    if (isEmpty.value) return
    // 请求下一页数据
    getNotifyList(scrollPage.value, pageSize.value)
  }
  onMounted(() => {
    getNotifyList()
  })
</script>
<template>
  <scroll-view
    class="scroll-view"
    refresher-enabled
    scroll-y
    @scrolltolower="onScrollToLower"
  >
    <view class="scroll-view-wrapper">
      <view class="message-action">
        <text class="iconfont icon-clear"></text>
        全部已读
      </view>
      <uni-card v-for="notify in notifyList" :border="false" :is-shadow="false">
        <view class="brief">{{ notify.content }}</view>
        <view class="extra">
          <text class="time">{{ notify.created }}</text>
          <navigator
            hover-class="none"
            class="link"
            :url="`/subpkg_message/content/index?id=${notify.id}`"
            >查看详情</navigator
          >
        </view>
        <template v-slot:title>
          <view class="title unread">您有新的运输任务</view>
        </template>
      </uni-card>
      <view v-if="false" class="message-blank">暂无消息</view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
