<template>
  <a-drawer
    :visible="roomDetailVisible"
    title="房间详情"
    width="1000"
    @close="handelClose"
  >
    <h3 class="fw-bold">基本信息</h3>
    <a-row :span="24" class="m-t-16">
      <span>房屋地址：</span><span>{{ roomInfo.address }}</span>
    </a-row>
    <a-row :span="24" class="m-t-16">
      <span>房间号：</span><span>{{ roomInfo.roomName }}</span>
    </a-row>
    <a-row :span="24" class="m-t-16">
      <span>人数：</span><span>{{ roomInfo.residentsNumber }}</span>
    </a-row>
    <XTable
      :columns="column"
      :data-source="tableData"
      :scroll="{x:true}"
      class="m-t-24"
      :loading="loading"
      :total="total"
      @getData="getData"
      @getValues="getValues"
    >
      <template #action="{id}">
        <a @click="handelDetail(id)">查看</a>
      </template>
    </XTable>
  </a-drawer>
</template>

<script>
import { loading } from '@/decorator'
import { dateFormat } from '@/utils'
export default {
  props: {
    roomDetailVisible: {
      type: Boolean,
      default: false
    },
    roomInfo: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      column: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '申报地址',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: '申报房间',
          dataIndex: 'roomName',
          key: 'roomName'
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile'
        },
        {
          title: '身份证号',
          dataIndex: 'idCard',
          key: 'idCard'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime'
        },
        {
          key: 'action',
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }
      ],
      tableData: [],
      total: 0,
      loading: false,
      confirmLoading: false,
      params: { pageNum: 1, pageSize: 10 }
    }
  },
  watch: {
    roomInfo () {
      this.getData()
    }
  },
  methods: {
    @loading('loading')
    async getData () {
      const { pageNum, pageSize } = this.params
      const res = await this.$apis.selPeople({
        roomId: this.roomInfo.id,
        pageNo: pageNum,
        pageSize
      })
      console.log(res)
      this.total = res.total
      const list = res.rows.map(item => {
        return {
          ...item.postdocs,
          address: item.residentRegistration ? (item.residentRegistration.xz ? item.residentRegistration.xz : '暂无') : '暂无',
          roomName: item.residentRegistration ? (item.residentRegistration.roomNumber ? item.residentRegistration.roomNumber : '暂无') : '暂无',
          createTime: dateFormat(item.postdocs.createTime)
        }
      })
      this.tableData = list
    },
    getValues (params) {
      this.params = params
    },
    handelDetail (text) {
      console.log(text)
    },
    handelClose () {
      this.$emit('update:roomDetailVisible', false)
    }

  }
}
</script>

<style scoped lang="less">

</style>
