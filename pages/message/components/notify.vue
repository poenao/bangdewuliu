<script setup>
  import { ref, onMounted } from 'vue'
  import { messageListAPI } from '../../../apis/message'

  // 任务列表数据
  const notifyList = ref([])
  // 请求页码
  const page = ref(1)
  // 请求每页条数
  const pageSize = ref(10)

  const getNotifyList = async () => {
    const res = await messageListAPI(201, page.value, pageSize.value)
    notifyList.value = res.data.items
  }
  onMounted(() => {
    getNotifyList()
  })
</script>
<template>
  <scroll-view class="scroll-view" refresher-enabled scroll-y>
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
