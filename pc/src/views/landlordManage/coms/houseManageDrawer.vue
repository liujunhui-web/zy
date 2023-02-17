<template>
  <a-drawer
    :visible="houseVisible"
    title="房屋合并"
    width="1200"
    @close="handelClose"
  >
    <h3 class="fw-bold">房东基本信息</h3>
    <a-row :span="24" :gutter="24" class="m-t-24">
      <a-col :span="6">
        <span>房东姓名：</span><span>{{ landlordInfo.name }}</span>
      </a-col>
      <a-col :span="6">
        <span>房东手机号：</span><span>{{ landlordInfo.mobile }}</span>
      </a-col>
    </a-row>
    <div class="display-flex align-items-center justify-content-space-between m-t-24">
      <div>
        <a-button class="bg-0089FF c-fff" @click="handelMerge">合并房屋</a-button>
        <a-button
          class="m-l-16"
          type="danger"
          :disabled="houseIds!==''?false:true"
          @click="handelDeleteAll"
        >
          批量删除
        </a-button>
      </div>
      <div>
        <!-- <a-button type="danger" @click="handelMergeOver">房屋合并完成</a-button> -->
        <a-button type="danger" @click="handelDel">
          处理完成
        </a-button>
      </div>
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
        <a @click="handelDeclare(text)">申报</a>
        <a-divider type="vertical" />
        <a @click="handelDetail(text)">查看</a>
        <a-divider type="vertical" />
        <a @click="handelEdit(text)">编辑</a>
        <a-divider type="vertical" />
        <a :disabled="text.fileNumber!='暂无'?true:false" @click="handelDelete(text)">删除</a>
      </template>
    </XTable>
    <a-modal
      title="确认房屋地址"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-select
        v-model="address"
        class="w-100p"
        placeholder="请选择合并后的房屋地址"
        @change="handelAddress"
      >
        <a-select-option v-for="(item,index) in addressArr" :key="index" :value="index">
          {{ item }}
        </a-select-option>
      </a-select>
    </a-modal>
    <roomDrawer :room-visible.sync="roomVisible" :house-info.sync="houseInfo" />
    <a-modal
      :visible="editVisible"
      title="编辑房屋地址"
      @ok="handleEditOk"
      @cancel="handleEditCancel"
    >
      <a-input v-model="editAddress" placeholder="请输入房屋地址" />
    </a-modal>
  </a-drawer>
</template>

<script>
import { loading, confirm } from '@/decorator'
import { dateFormat } from '@/utils'
import roomDrawer from './roomManageDrawer'
export default {
  components: { roomDrawer },
  props: {
    houseVisible: {
      type: Boolean,
      default: false
    },
    landlordInfo: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      column: [
        {
          title: '审核结果房屋档案号',
          dataIndex: 'fileNumber',
          key: 'fileNumber'
        },
        {
          title: '申报房屋档案号',
          dataIndex: 'fwdah',
          key: 'fwdah'
        },
        {
          title: '街镇',
          dataIndex: 'townStreetName',
          key: 'townStreetName'
        },
        {
          title: '村社',
          dataIndex: 'villageName',
          key: 'villageName'
        },
        {
          title: '房屋地址',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: '审核状态',
          dataIndex: 'statusName',
          key: 'statusName'
        },
        {
          title: '房间数',
          dataIndex: 'roomsNumber',
          key: 'roomsNumber'
        },
        {
          title: '人数',
          dataIndex: 'residentsNumber',
          key: 'residentsNumber'
        },
        {
          title: '申报时间',
          dataIndex: 'declareTime',
          key: 'declareTime'
        },
        {
          title: '申报处理时间',
          dataIndex: 'dealTime',
          key: 'dealTime'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime'
        },
        {
          key: 'action',
          title: '操作',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          width: 200
        }
      ],
      tableData: [],
      total: 0,
      loading: false,
      selectedRowKeys: [],
      visible: false,
      confirmLoading: false,
      params: { pageNum: 1, pageSize: 10 },
      houseIds: '',
      addressArr: [],
      address: '',
      roomVisible: false,
      houseInfo: {},
      editId: '',
      editVisible: false,
      editAddress: ''
    }
  },
  watch: {
    landlordInfo () {
      this.houseIds = ''
      this.addressArr = []
      this.selectedRowKeys = []
      this.getData()
    }
  },
  methods: {
    @loading('loading')
    async getData () {
      const { pageNum, pageSize } = this.params
      const res = await this.$apis.selHouse({
        mobile: this.landlordInfo.mobile,
        pageNo: pageNum,
        pageSize
      })
      this.total = res.total
      const list = res.rows.map(item => {
        return {
          ...item.RentalHouse,
          fileNumber: item.RentalHouse.fileNumber || '暂无',
          fwdah: item.HouseRegister ? (item.HouseRegister.fwdah ? item.HouseRegister.fwdah : '暂无') : '暂无',
          createTime: dateFormat(item.RentalHouse.createTime),
          houseStatus: item.HouseRegister ? item.HouseRegister.status : '',
          declareTime: item.HouseRegister ? dateFormat(item.HouseRegister.sbsj) : '',
          dealTime: item.HouseRegister ? dateFormat(item.HouseRegister.dealTime) : ''
        }
      })
      list.forEach(item => {
        switch (item.houseStatus) {
          case 0:
            item.statusName = '审核中'
            break
          case 1:
            item.statusName = '审核中'
            break
          case 2:
            item.statusName = '审核成功'
            break
          case 3:
            item.statusName = '审核失败'
            break
          default:
            item.statusName = ''
        }
      })
      this.tableData = list
    },
    getValues (params) {
      this.params = params
    },
    handelDetail ({ id, address }) {
      this.houseInfo = { id, address }
      this.roomVisible = true
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
      const list = selectedRowKeys.map(item => {
        return {
          id: this.tableData[item].id,
          address: this.tableData[item].address
        }
      })
      const houseIds = list.map(item => item.id).join(',')
      const address = list.map(item => item.address)
      this.houseIds = houseIds
      this.addressArr = address
      this.address = ''
    },
    handelMerge () {
      if (this.addressArr.length >= 2) {
        this.visible = true
      } else {
        this.$message.error('请选择两个或两个以上房屋进行合并!')
      }
    },
    handleOk () {
      this.$apis.mergeHouse({
        houseIds: this.houseIds,
        address: this.address
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.visible = false
          this.addressArr = []
          this.houseIds = ''
          this.getData()
          this.selectedRowKeys = []
          this.address = ''
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    handelAddress (index) {
      this.address = this.addressArr[index]
    },
    // @confirm({
    //   title: '确认房屋合并完成',
    //   content: '请确认该房屋是否已合并完成,完成后请点击确定按钮确定'
    // })
    handelMergeOver () {
      this.$apis.delOwner({
        mobile: this.landlordInfo.mobile
      }).then(res => {
        if (res.code === 0) {
          // this.$message.success(res.msg)
          this.$emit('update:houseVisible', false)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
     @confirm({
       title: '确认完成',
       content: '请确认是否处理完成,完成后请点击确定按钮确定'
     })
    handelDel () {
      const { mobile } = this.landlordInfo
      this.$apis.delUserLogin({
        mobile
      }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.handelMergeOver()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handelClose () {
      this.$emit('update:houseVisible', false)
    },
    handelEdit ({ id, address }) {
      this.editId = id
      this.editAddress = address
      this.editVisible = true
    },
     @confirm({
       title: '确认删除',
       content: '请确认是否删除该房屋,删除后将无法查看该信息'
     })
    handelDelete ({ id }) {
      this.$apis.delHouse({ houseIds: id }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    @confirm({
      title: '确认删除',
      content: '请确认是否删除选中所有房屋,删除后将无法查看信息'
    })
    handelDeleteAll () {
      this.$apis.delHouse({ houseIds: this.houseIds }).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.addressArr = []
          this.houseIds = ''
          this.selectedRowKeys = []
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleEditOk () {
      if (this.editAddress === '') {
        this.$message.error('请输入房屋地址')
      } else {
        this.$apis.updAddress({
          houseId: this.editId,
          address: this.editAddress
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
          } else {
            this.$message.error(res.msg)
          }
          this.editVisible = false
        })
      }
    },
    handleEditCancel () {
      this.editVisible = false
    },
    @confirm({
      title: '确认申报',
      content: '请确认该房屋是否需要申报,确认后请点击确定按钮申报'
    })
    handelDeclare ({ id }) {
      this.$apis.addHouserRsident({
        houseId: id
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
.ant-form-item {
  display: flex;
}

/deep/.ant-form-item-control-wrapper {
  flex: 1 !important;
}
</style>
