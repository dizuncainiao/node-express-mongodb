<template>
  <table class="d-table">
    <tr>
      <th v-for="th of columns" :key="th.key">{{ th.title }}</th>
    </tr>
    <tr
      v-for="(row, index) of dataSource"
      :key="row[rowKey]"
      :row-key="row[rowKey]"
    >
      <template v-for="prop of Object.keys(row)" :key="prop">
        <td v-if="prop !== 'key'">
          <template v-if="columnsSlots.some(item => (item.dataIndex === prop && !!item.slotName))">
            <slot
              :name="columnsSlots.find(item => item.dataIndex === prop).slotName"
              :text="row[prop]"
              :record="row"
              :index="index"
            >
              {{ row[prop] }}
            </slot>
          </template>
          <template v-else>{{ row[prop] }}</template>
        </td>
      </template>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'DTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: String,
      default: 'key'
    }
  },
  setup (props) {
    const columnsSlots = computed(() => {
      return props.columns.map((item: any) => {
        if (item.slots) {
          return {
            dataIndex: item.dataIndex,
            slotName: item.slots.customRender
          }
        }
        return {
          dataIndex: item.dataIndex
        }
      })
    })

    console.log(columnsSlots.value)

    return {
      columnsSlots
    }
  }
})
</script>

<style scoped lang="less">
@import "./d-table";
</style>
