<template>
  <a-drawer
    :visible="roomVisible"
    title="房间合并"
    width="1000"
    @close="handelClose"
  >
    <h3 class="fw-bold">房屋基本信息</h3>
    <a-row :span="24" :gutter="24" class="m-t-24">
      <a-col :span="24">
        <span>房屋地址：</span><span>{{ houseInfo.address }}</span>
      </a-col>
    </a-row>
    <div class="m-t-24">
      <a-button class="bg-0089FF c-fff " @click="handelMerge">合并房间</a-button>
      <a-button type="danger" class="m-l-16" @click="handelMergeAll">房间去重</a-button>
    </div>

    <XTable
      :columns="column"
      :data-source="tableData"
      :scroll="{x:true}"
      class="m-t-24"
      :loading="loading"
      :total="total"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      @getData="getData"
      @getValues="getValues"
    >
      <template #action="text">
        <a @click="handelDetail(text)">详情</a>
      </template>
    </XTable>
    <a-modal
      title="确认房间号"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-select
        v-model="roomName"
        class="w-100p"
        placeholder="请选择合并后的房间号"
        @change="handelRoom"
      >
        <a-select-option v-for="(item,index) in roomArr" :key="index" :value="index">
          {{ item }}
        </a-select-option>
      </a-select>
    </a-modal>
    <roomDetailDrawer :room-detail-visible.sync="roomDetailVisible" :room-info.sync="roomInfo" />
  </a-drawer>
</template>

<script>
import { loading, confirm } from '@/decorator'
import { dateFormat } from '@/utils'
import roomDetailDrawer from './roomDetailDrawer'
export default {
  components: { roomDetailDrawer },
  props: {
    roomVisible: {
      type: Boolean,
      default: false
    },
    houseInfo: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      column: [
        {
          title: '房间号',
          dataIndex: 'roomName',
          key: 'roomName'
        },
        {
          title: '人数',
          dataIndex: 'residentsNumber',
          key: 'residentsNumber'
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
      selectedRowKeys: [],
      visible: false,
      confirmLoading: false,
      params: { pageNum: 1, pageSize: 10 },
      roomArr: [],
      roomName: '',
      roomIds: '',
      roomDetailVisible: false,
      roomInfo: {}
    }
  },
  watch: {
    houseInfo () {
      this.roomArr = []
      this.selectedRowKeys = []
      this.roomName = ''
      this.getData()
    }
  },
  methods: {
    @loading('loading')
    async getData () {
      const { pageNum, pageSize } = this.params
      const res = await this.$apis.selHouseRoom({
        houseId: this.houseInfo.id,
        pageNo: pageNum,
        pageSize
      })
      this.total = res.total
      const list = res.rows.map(item => {
        return {
          ...item,
          createTime: dateFormat(item.createTime)
        }
      })
      this.tableData = list
    },
    getValues (params) {
      this.params = params
    },
    handelDetail ({ id, roomName, residentsNumber }) {
      this.roomDetailVisible = true
      this.roomInfo = { id, roomName, residentsNumber, address: this.houseInfo.address }
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
      const list = selectedRowKeys.map(item => {
        return {
          id: this.tableData[item].id,
          roomName: this.tableData[item].roomName
        }
      })
      const roomIds = list.map(item => item.id).join(',')
      const roomArr = list.map(item => item.roomName)
      console.log(roomIds, roomArr)
      this.roomIds = roomIds
      this.roomArr = roomArr
      this.roomName = ''
    },
    handelMerge () {
      if (this.roomArr.length >= 2) {
        this.visible = true
      } else {
        this.$message.error('请选择两个或两个以上房间进行合并!')
      }
    },
    handleOk () {
      if (this.roomName === '') {
        this.$message.error('请选择合并后的房间名!')
        return
      }
      this.$apis.mergeHouseRoom({
        roomIds: this.roomIds,
        roomName: this.roomName ? this.roomName : this.roomArr[0]
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.visible = false
          this.roomArr = []
          this.selectedRowKeys = []
          this.roomName = ''
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    handelRoom (index) {
      this.roomName = this.roomArr[index]
    },
    handelClose () {
      this.$emit('update:roomVisible', false)
    },
    @confirm({
      title: '房间去重',
      content: '请确认去重当前房屋内所有房间,确认后点击确定按钮确认'
    })
    handelMergeAll () {
      this.$apis.mergeAllHouseRoom({
        houseId: this.houseInfo.id
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
