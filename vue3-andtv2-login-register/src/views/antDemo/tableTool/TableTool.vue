<template>
  <h1>人员管理</h1>
  <a-button
    :class="['animated', 'tada', (isLoop ? 'infinite' : '')]"
    @mouseenter="setLoop(false)"
    @click="initTableData"
  >点击查看全部人员
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
        shape="circle"
        @click="updateRow(record)"
      >
        <template #icon>
          <FormOutlined/>
        </template>
      </a-button>
      <a-button
        type="danger"
        shape="circle"
        class="ml10"
        @click="deleteRow(record.id)"
      >
        <template #icon>
          <DeleteOutlined/>
        </template>
      </a-button>
    </template>
  </a-table>

  <a-modal v-model:visible="visible" title="更新" @ok="handleOk">
    <a-form layout="horizontal" v-bind="{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }">
      <a-form-item label="用户名">
        <a-input v-model:value="formData.userName" placeholder="请输入用户名"/>
      </a-form-item>
      <a-form-item label="密码">
        <a-input v-model:value="formData.password" placeholder="请输入密码"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { ComponentInternalInstance, defineComponent, getCurrentInstance, createVNode, reactive, ref, onMounted } from 'vue'
import { userListPage, deleteUser, updateUser } from '@/api'
import { DeleteOutlined, FormOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'TableTool',
  components: {
    DeleteOutlined,
    FormOutlined
  },
  setup () {
    const { globalProperties } = (getCurrentInstance() as ComponentInternalInstance).appContext.config
    // 动画循环播放
    const isLoop = ref(true)
    const tableLoading = ref(false)
    const searchText = ref('')
    const visible = ref(false)
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
    const formData = reactive({
      userName: '',
      password: '',
      id: ''
    })

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
      searchText.value = ''
      const params = {
        userName: '',
        page: pagination.current,
        pageSize: pagination.pageSize
      }
      getUserList(params)
    }

    onMounted(() => {
      initTableData()
    })

    function setLoop (val: boolean) {
      isLoop.value = val
    }

    function deleteRow (id: string) {
      globalProperties.$confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '你确定要删除这条记录吗？',
        onOk () {
          deleteUser({ id }).then(res => {
            console.log(res)
            initTableData()
          })
        }
      })
    }

    function tableChange (info: any) {
      console.log(pagination)
      pagination.current = info.current
      onSearch()
    }

    function handleOk () {
      console.log(formData)
      const params = { ...formData }
      updateUser(params).then(res => {
        visible.value = false
        initTableData()
      })
    }

    function updateRow (row: any) {
      formData.userName = row.userName
      formData.password = row.password
      formData.id = row.id
      visible.value = true
      console.log(6)
    }

    return {
      isLoop,
      dataSource,
      columns,
      tableLoading,
      searchText,
      pagination,
      visible,
      formData,
      setLoop,
      deleteRow,
      onSearch,
      tableChange,
      initTableData,
      handleOk,
      updateRow
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
