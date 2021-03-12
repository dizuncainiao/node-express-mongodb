<template>
  <h1>人员管理</h1>
  <a-button
    :class="['animated', 'tada', (isLoop ? 'infinite' : '')]"
    @mouseenter="setLoop(false)"
    @click="getUserList"
  >点击查看人员
  </a-button>
  <br>
  <br>
  <a-table
    rowKey="id"
    :dataSource="dataSource"
    :columns="columns"
    :pagination="false"
    :scroll="{ y: 400 }"
    :loading="tableLoading"
  >
    <template #title>
      <a-input-search
        v-model:value="searchText"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
    </template>
    <template #action="{ record }">
      <a-button
        type="danger"
        shape="circle"
        @click="deleteRow(record.id)"
      >
        <template #icon>
          <DeleteOutlined/>
        </template>
      </a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { userList, deleteUser } from '@/api'
import { DeleteOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'TableTool',
  components: {
    DeleteOutlined
  },
  setup () {
    // 动画循环播放
    const isLoop = ref(true)
    const tableLoading = ref(false)
    const searchText = ref('')
    const dataSource: any = ref([])
    const columns = [
      {
        dataIndex: 'userName',
        title: '用户名'
      },
      {
        dataIndex: 'password',
        title: '密码'
      },
      {
        title: '操作',
        slots: { customRender: 'action' }
      }
    ]

    function onSearch () {
      const params = {
        userName: searchText.value
      }
      tableLoading.value = true
      userList(params).then(res => {
        dataSource.value = res.data
        tableLoading.value = false
      })
    }

    function getUserList () {
      tableLoading.value = true
      userList({}).then(res => {
        dataSource.value = res.data
        tableLoading.value = false
      })
    }

    function setLoop (val: boolean) {
      isLoop.value = val
    }

    function deleteRow (id: string) {
      deleteUser({ id }).then(res => {
        console.log(res)
        getUserList()
      })
    }

    return {
      isLoop,
      dataSource,
      columns,
      tableLoading,
      searchText,
      getUserList,
      setLoop,
      deleteRow,
      onSearch
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
