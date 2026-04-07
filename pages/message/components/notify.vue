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
  // 数据总条数
  const counts = ref(0)
  const getNotifyList = async () => {
    const res = await messageListAPI(201, page.value, pageSize.value)
    console.log(res)

    // 更新任务列表数据
    // 如果后端返回 null，就用 [] 代替，避免 ... 展开报错
    const items = res.data.items || []
    notifyList.value.push(...items)
    // 是否为空列表
    isEmpty.value = notifyList.value.length === 0
    // 更新数据总条数
    counts.value = res.data.counts
  }
  // 监听用户是否滚动到页码底部
  const onScrollToLower = () => {
    // 1. 如果已经标记为加载完毕，直接拦截
    if (isEmpty.value) return

    // 2. 正确逻辑：当前长度 小于 总数，才请求下一页
    if (notifyList.value.length < counts.value) {
      page.value++
      getNotifyList()
    } else {
      // 3. 否则说明拿够了，标记为已完成
      uni.utils.toast('没有更多了')
    }
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
      <view v-if="isEmpty" class="message-blank">暂无消息</view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
