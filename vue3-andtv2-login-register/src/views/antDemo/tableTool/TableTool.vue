<template>
  <h1>人员管理</h1>
  <a-button
    :class="['animated', 'tada', (isLoop ? 'infinite' : '')]"
    @mouseenter="setLoop(false)"
    @click="getWeiBoHot"
  >点击查看今天的微博热搜</a-button>
  <br>
  <br>
  <a-table
    rowKey="hotwordnum"
    :dataSource="dataSource"
    :columns="columns"
    :pagination="false"
    :scroll="{ y: 400 }"
  >
    <template #hotword="{text, index}">
      <span v-if="index < 3" :class="`color-${index + 1}`">{{ index + 1 }}</span>
      <span v-else class="mr11">{{ index + 1 }}</span>
      <span>{{ text }}</span>
    </template>
    <template #hotWordTitle>
      <FileTextTwoTone/>
      热搜词
    </template>
    <template #hotWordNum>
      <FireFilled style="color: red;"/>
      热度值
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { weiBoHot } from '@/api'
import { ResDesc } from './interface'
import { FireFilled, FileTextTwoTone } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'TableTool',
  components: {
    FireFilled,
    FileTextTwoTone
  },
  setup () {
    const isLoop = ref(true)
    const dataSource: any = ref([])
    const columns = [
      {
        dataIndex: 'hotword',
        slots: {
          title: 'hotWordTitle',
          customRender: 'hotword'
        }
      },
      {
        dataIndex: 'hotwordnum',
        slots: { title: 'hotWordNum' }
      }
    ]

    function getWeiBoHot () {
      weiBoHot({ key: '6aad779655697c8e92d66812a8c10412' }).then(res => {
        const {
          code,
          newslist
        } = res as ResDesc
        if (code === 200) {
          dataSource.value = newslist
        }
      })
    }

    function setLoop (val: boolean) {
      isLoop.value = val
    }

    return {
      isLoop,
      dataSource,
      columns,
      getWeiBoHot,
      setLoop
    }
  }
})
</script>

<style scoped lang="less">
.color-1 {
  margin-right: 10px;
  font-size: 20px;
  color: red;
}

.color-2 {
  margin-right: 10px;
  font-size: 20px;
  color: #c800ff;
}

.color-3 {
  margin-right: 10px;
  font-size: 20px;
  color: #0099ff;
}

.mr11 {
  margin-right: 11px;
}
</style>
