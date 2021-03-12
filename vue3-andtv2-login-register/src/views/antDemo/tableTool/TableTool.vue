<template>
  <h1>人员管理</h1>
  <a-button
    :class="['animated', 'tada', (isLoop ? 'infinite' : '')]"
    @mouseenter="setLoop(false)"
    @click="initTableData"
  >点击查看人员
  </a-button>
  <br>
  <br>
  <a-table
    rowKey="id"
    :dataSource="dataSource"
    :columns="columns"
    :scroll="{ y: 400 }"
    :loading="tableLoading"
    :pagination="pagination"
    @change="tableChange"
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
import { defineComponent, reactive, ref } from 'vue'
import { userListPage, deleteUser } from '@/api'
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
    const pagination = reactive({
      current: 1,
      pageSize: 5,
      total: 0
    })
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

    function getUserList (params = {}) {
      tableLoading.value = true
      userListPage(params).then(res => {
        dataSource.value = res.data.records
        pagination.total = res.data.total
        tableLoading.value = false
      })
    }

    function onSearch () {
      const params = {
        userName: searchText.value,
        page: pagination.current,
        pageSize: pagination.pageSize
      }
      getUserList(params)
    }

    function initTableData () {
      const params = {
        userName: '',
        page: pagination.current,
        pageSize: pagination.pageSize
      }
      getUserList(params)
    }

    function setLoop (val: boolean) {
      isLoop.value = val
    }

    function deleteRow (id: string) {
      deleteUser({ id }).then(res => {
        console.log(res)
        initTableData()
      })
    }

    function tableChange (info: any) {
      console.log(pagination)
      pagination.current = info.current
      onSearch()
    }

    return {
      isLoop,
      dataSource,
      columns,
      tableLoading,
      searchText,
      pagination,
      setLoop,
      deleteRow,
      onSearch,
      tableChange,
      initTableData
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
